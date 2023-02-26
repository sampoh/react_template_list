import {Fragment,useState,useEffect,useLayoutEffect,useRef,Suspense,lazy} from 'react';

// import logo from './logo.svg';

// import './css/fullscreen.css';
import {SessionContext,sessionIO,typeSession} from './system/Session';

//lazyは遅延ロード機能。
//必要になったときにロードすることで初期段階の読み込みサイズを減らし
//ページごとにURLが違う場合は他の各ページから他ページのソースが見えなくなるためセキュリティも向上する。
const Login = lazy(() => import('./ui/Login'));
const Main = lazy(() => import('./ui/Main'));
const Loading = lazy(() => import('./ui/Loading'));

export default function App() {

  //< useState について >
  //useStateはReactによるDOM操作を使用するうえで基本的な機能で
  //getter(第1要素)とsetter(第2要素)を定義して値の変動に応じてDOMを書き換えるための変数(定数)。
  //booleanやstringといったTypescript初期定義にあるもの以外は定義必須。
  const [sessionInfo,setSessionInfo] = useState<typeSession>({loaded:false,hasSession:false,device:'pc'});
  const [triggerCheck,setTriggerCheck] = useState<boolean>(false);
  const [triggerLogout,setTriggerLogout] = useState<boolean>(false);
  const [virtualUrl,setVirtualUrl] = useState<string>("/");
  //例えばここの例では triggerCheck の値を書き換えるには setTriggerCheck(true) を実行する。
  
  const isFirstLoad = useRef(false);
  const isSecondLoad = useRef(false);

  //セッションチェックトリガー
  useEffect(() => {
    if(isSecondLoad.current){
      checkSession(setSessionInfo);
    }
  },[triggerCheck]);

  //ログアウトトリガー
  useEffect(() => {
    if(isSecondLoad.current){
      logoutSession(setSessionInfo);
    }
  },[triggerLogout]);

  //初回セッションチェック
  useEffect(() => {
    if(!isFirstLoad.current){
      isFirstLoad.current = true;
    }else{
      isSecondLoad.current = true;
      checkSession(setSessionInfo);
    }
  },[]);
  
  //<SessionContext.Provider>のvalue値で指定したものは中継せずに下層のどこでも取得可能
  return (
    <SessionContext.Provider value={{
      sessionInfo,setSessionInfo,
      triggerCheck,setTriggerCheck,
      triggerLogout,setTriggerLogout,
      virtualUrl,setVirtualUrl}}>
      <Suspense fallback={<Loading />}>
        <MyRender sessionInfo={sessionInfo}/>
      </Suspense>
    </SessionContext.Provider>
  );

}

function MyRender({sessionInfo}:{sessionInfo:typeSession}){
  if(sessionInfo.loaded){
    if(sessionInfo.hasSession){
      return <Main />
    }else{
      return <Login />
    }
  }else{
    return <Loading />
  }
}

//セッションチェック
function checkSession(setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>){
  let mySession = new sessionIO();
  if(mySession.load() !== ''){
    mySession.check({
      onThen:((content)=>{
          if(content.hasSession){
            console.log('CHECK : SESSION FOUND');
          }else{
            console.log('CHECK : SESSION NOT FOUND');
          }
          setSessionInfo((prev)=>({...prev,...{loaded:true,hasSession:content.hasSession}}));
      }),
      onCatch:((err)=>{
          // console.log('"catch" in checkSession');
      }),
      onFinally:(()=>{
          // console.log('"finally" in checkSession');
      }),
    })
  }else{
    setSessionInfo((prev)=>({...prev,...{loaded:true,hasSession:false}}));
  }
}

//汎用ログアウト
function logoutSession(setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>){
  let mySession = new sessionIO();
  if(mySession.load() !== ''){
    mySession.logout({
      onThen:((content)=>{
          console.log('LOGOUT');
          setSessionInfo((prev)=>({...prev,...{hasSession:false}}));
      }),
      onCatch:((err)=>{
          // console.log('"catch" in logoutSession');
      }),
      onFinally:(()=>{
          // console.log('"finally" in logoutSession');
      }),
    })
  }else{
    setSessionInfo((prev)=>({...prev,...{hasSession:false}}));
  }
}
