import * as React from 'react';

//DOM同期用セッションデータの型
export type typeSession = {
  loaded:boolean;
  hasSession:boolean;
device:string;
};

export type typeContextSession = {
  sessionInfo:typeSession
  setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>
  triggerCheck:boolean
  setTriggerCheck:React.Dispatch<React.SetStateAction<boolean>>
  triggerLogout:boolean
  setTriggerLogout:React.Dispatch<React.SetStateAction<boolean>>
  virtualUrl:string
  setVirtualUrl:React.Dispatch<React.SetStateAction<string>>
};

//createContextとuseContextはプロパティや引数として各種値を子コンポーネントに引き継いでいかなくても
//任意の子コンポーネントから大元の親コンポーネントの値を参照および更新できるようにするしくみ。
export const SessionContext = React.createContext<typeContextSession>(undefined as any);
export const useSessionContext = () => React.useContext(SessionContext);

type typeLogin = {
  account?:string,
  password?:string,
  onThen?:(content?:any) => void,
  onCatch?:(err?:any) => void,
  onFinally?:() => void,
};

type typeCheck = {
  onThen?:(content?:any) => void,
  onCatch?:(err?:any) => void,
  onFinally?:() => void,
};

//セッション管理クラス
export class sessionIO {

  public name:{inLocal:string,onHttp:string};

  private loginUri:string = 'https://local.rna.co.jp/test/react_login.php'; //ログインURI
  private checkUri:string = 'https://local.rna.co.jp/test/react_check_session.php'; //セッションチェックURI
  private logoutUri:string = 'https://local.rna.co.jp/test/react_logout.php'; //ログアウトURI
  
  constructor(){
    this.name = {
      inLocal:'sampoh-id', //localStorage内のセッションIDの名称
      onHttp:'sampoh-id' //HTTPヘッダ内のセッションIDの名称  
    }
    //※ 実際の実装ではCookieを使用すればここのカスタムヘッダは不要
    //　 このプログラムではどこからでもアクセスできるよう意図的にCookie不使用
  }

  //ローカルストレージIO
  load():string{
    let onLocal = window.localStorage.getItem(this.name.inLocal);
    return onLocal?onLocal:'';
  }
  save(newValue?:string):void{
    if(typeof newValue !=='undefined'){
      window.localStorage.setItem(this.name.inLocal,newValue);
    }
  }
  remove():void{
    window.localStorage.removeItem(this.name.inLocal);
  }

  //fetchコマンド用ヘッダ取得
  getHeader():any{
    let currentId = this.load();
    return JSON.parse('{"' + this.name.onHttp + '":"' + currentId + '"}');
  }

  //ログイン
  login({account='',password='',onThen=()=>{},onCatch=()=>{},onFinally=()=>{}}:typeLogin){

    let req = this.loginUri + '?account=' + encodeURIComponent(account) + '&password=' + encodeURIComponent(password);
    fetch(
      req,{mode:'cors'}
    ).then(res => {
      console.log('HTTP CODE : ' + res.status);
      return res.json();
    }).then(content => {
      if(typeof content.testid === 'string'){
        this.save(content.testid);
      }
      onThen(content)
    }).catch(err => {
      onCatch(err)
    }).finally(() => {
      onFinally()
    });
  }
  
  //セッションチェック
  check({onThen=()=>{},onCatch=()=>{},onFinally=()=>{}}:typeCheck){

    fetch(
      this.checkUri,{mode:'cors',headers:this.getHeader()}
    ).then(res => {
      console.log('HTTP CODE : ' + res.status);
      return res.json();
    }).then(content => {
      onThen(content)
    }).catch(err => {
      onCatch(err)
    }).finally(() => {
      onFinally()
    });
  }
  
  //ログアウト
  logout({onThen=()=>{},onCatch=()=>{},onFinally=()=>{}}:typeCheck){

    fetch(
      this.logoutUri,{mode:'cors',headers:this.getHeader()}
    ).then(res => {
      console.log('HTTP CODE : ' + res.status);
      return res.json();
    }).then(content => {
      onThen(content);
      this.remove();
    }).catch(err => {
      onCatch(err)
    }).finally(() => {
      onFinally()
    });
  }
  
}

