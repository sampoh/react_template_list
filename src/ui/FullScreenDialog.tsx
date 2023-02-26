import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import {columns,Data,typeDetailIO,typeDetailData} from '../system/Cast';
import {SessionContext,sessionIO} from '../system/Session';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
});

type typeFullScreenDialog = {
  detailData:typeDetailData,
  setDetailData:React.Dispatch<React.SetStateAction<typeDetailData>>,
  setDetailIO:React.Dispatch<React.SetStateAction<typeDetailIO>>,
  setBackdrop:React.Dispatch<React.SetStateAction<boolean>>
};

type typeAlertOpen = {
  open:boolean,
  title:string,
  msg:string
}

export function FullScreenDialog({detailData,setDetailData,setDetailIO,setBackdrop}:typeFullScreenDialog) {

  const handleClose = () => {
    setDetailData((prev) => ({...prev,...{open:false}}));
  };

  const [alertOpen, setAlertOpen] = React.useState<typeAlertOpen>({open:false,title:'',msg:''});

  return (
    <div>
      <Dialog fullScreen open={detailData.open} TransitionComponent={Transition} onClose={handleClose}>
        <AppBar sx={{ position: 'fixed' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              編集
            </Typography>
            <Button autoFocus color="inherit" onClick={() => {
              saveDetail(detailData,handleClose,setDetailIO,setAlertOpen,setBackdrop);
            }}>
              SAVE
            </Button>
          </Toolbar>
        </AppBar>
        <FormElements detailData={detailData} setDetailData={setDetailData} />
        <AlertDialog alertOpen={alertOpen} setAlertOpen={setAlertOpen} />
      </Dialog>
    </div>
  );
}

type typeFormElements = {
  detailData:typeDetailData,
  setDetailData:React.Dispatch<React.SetStateAction<typeDetailData>>,
}


function FormElements({detailData,setDetailData}:typeFormElements){

  const styleTextField:React.CSSProperties = {display:'flex',marginBottom:3}

  return (
    <React.Fragment>
      <Box component="form" sx={{padding:3,marginTop:8}}>
        <TextField sx={styleTextField} type='text' label="食品名" value={detailData.data.食品名} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{食品名:ev.target.value}}}})) }}/>
        <TextField sx={styleTextField} type='number' label="廃棄率" value={detailData.data.廃棄率} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{廃棄率:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="エネルギー_kcal" value={detailData.data.エネルギー_kcal} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{エネルギー_kcal:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="エネルギー_kj" value={detailData.data.エネルギー_kj} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{エネルギー_kj:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="水分" value={detailData.data.水分} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{水分:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="タンパク質" value={detailData.data.タンパク質} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{タンパク質:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="アミノ酸組成によるたんぱく質" value={detailData.data.アミノ酸組成によるたんぱく質} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{アミノ酸組成によるたんぱく質:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="脂質" value={detailData.data.脂質} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{脂質:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="トリアシルグリセロール当量" value={detailData.data.トリアシルグリセロール当量} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{トリアシルグリセロール当量:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="飽和脂肪酸" value={detailData.data.飽和脂肪酸} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{飽和脂肪酸:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="一価不飽和脂肪酸" value={detailData.data.一価不飽和脂肪酸} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{一価不飽和脂肪酸:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="多価不飽和脂肪酸" value={detailData.data.多価不飽和脂肪酸} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{多価不飽和脂肪酸:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="コレステロール" value={detailData.data.コレステロール} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{コレステロール:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="炭水化物" value={detailData.data.炭水化物} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{炭水化物:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="利用可能炭水化物_単糖当量" value={detailData.data.利用可能炭水化物_単糖当量} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{利用可能炭水化物_単糖当量:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="水溶性食物繊維" value={detailData.data.水溶性食物繊維} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{水溶性食物繊維:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="不溶性食物繊維" value={detailData.data.不溶性食物繊維} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{不溶性食物繊維:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="食物繊維総量" value={detailData.data.食物繊維総量} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{食物繊維総量:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="灰分" value={detailData.data.灰分} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{灰分:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ナトリウム" value={detailData.data.ナトリウム} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ナトリウム:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="カリウム" value={detailData.data.カリウム} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{カリウム:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="カルシウム" value={detailData.data.カルシウム} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{カルシウム:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="マグネシウム" value={detailData.data.マグネシウム} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{マグネシウム:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="リン" value={detailData.data.リン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{リン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="鉄" value={detailData.data.鉄} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{鉄:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="亜鉛" value={detailData.data.亜鉛} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{亜鉛:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="銅" value={detailData.data.銅} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{銅:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="マンガン" value={detailData.data.マンガン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{マンガン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ヨウ素" value={detailData.data.ヨウ素} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ヨウ素:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="セレン" value={detailData.data.セレン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{セレン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="クロム" value={detailData.data.クロム} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{クロム:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="モリブデン" value={detailData.data.モリブデン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{モリブデン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="レチノール" value={detailData.data.レチノール} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{レチノール:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="αカロテン" value={detailData.data.αカロテン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{αカロテン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="βカロテン" value={detailData.data.βカロテン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{βカロテン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="βクリプトキサンチン" value={detailData.data.βクリプトキサンチン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{βクリプトキサンチン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="βカロテン当量" value={detailData.data.βカロテン当量} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{βカロテン当量:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="レチノール活性当量" value={detailData.data.レチノール活性当量} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{レチノール活性当量:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビタミンD" value={detailData.data.ビタミンD} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビタミンD:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="αトコフェロール" value={detailData.data.αトコフェロール} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{αトコフェロール:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="βトコフェロール" value={detailData.data.βトコフェロール} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{βトコフェロール:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="γトコフェロール" value={detailData.data.γトコフェロール} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{γトコフェロール:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="δトコフェロール" value={detailData.data.δトコフェロール} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{δトコフェロール:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビタミンK" value={detailData.data.ビタミンK} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビタミンK:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビタミンB1" value={detailData.data.ビタミンB1} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビタミンB1:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビタミンB2" value={detailData.data.ビタミンB2} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビタミンB2:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ナイアシン" value={detailData.data.ナイアシン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ナイアシン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビタミンB6" value={detailData.data.ビタミンB6} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビタミンB6:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビタミンB12" value={detailData.data.ビタミンB12} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビタミンB12:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="葉酸" value={detailData.data.葉酸} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{葉酸:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="パントテン酸" value={detailData.data.パントテン酸} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{パントテン酸:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビオチン" value={detailData.data.ビオチン} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビオチン:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="ビタミンC" value={detailData.data.ビタミンC} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{ビタミンC:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='number' label="食塩相当量" value={detailData.data.食塩相当量} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{食塩相当量:Number(ev.target.value)}}}})) }} />
        <TextField sx={styleTextField} type='text' label="備考" value={detailData.data.備考} onChange={(ev:any) => {
          setDetailData((prev) => ({...prev,...{data:{...detailData.data,...{備考:ev.target.value}}}})) }}
          multiline maxRows={5}/>
      </Box>
    </React.Fragment>
  );
}

let lockComm = false; //通信一時ロック(進捗画面を出さないで2重送信を防ぐパターン)

function saveDetail(
  detailData:typeDetailData,
  handleClose:() => void,
  setDetailIO:React.Dispatch<React.SetStateAction<typeDetailIO>>,
  setAlertOpen:React.Dispatch<React.SetStateAction<typeAlertOpen>>,
  setBackdrop:React.Dispatch<React.SetStateAction<boolean>>){
  console.log('detail data is ',detailData.data);
  if(detailData.data.食品名 === ''){
    setAlertOpen((prev) =>({...prev,...{open:true,title:'',msg:'食品名を入力してください。'}}))
  }else if(!lockComm){

    lockComm = true;//2重送信対策

    let listUri = 'https://local.rna.co.jp/test/react_detail_save.php';
    let mySession = new sessionIO();
    mySession.getHeader();
    fetch(
      listUri,{mode:'cors',headers:mySession.getHeader(),method:'POST',body:JSON.stringify(detailData.data)}
    ).then(res => {
      console.log('HTTP CODE : ' + res.status);
      return res.json();
    }).then(content => {
      console.log('detail content',content);
      handleClose();
      setBackdrop(true);
    }).catch(err => {
    }).finally(() => {
      lockComm = false;
    });
  
    
  }
}

type propAlertDialog = {
  alertOpen:typeAlertOpen
  setAlertOpen:React.Dispatch<React.SetStateAction<typeAlertOpen>>
}

function AlertDialog({alertOpen,setAlertOpen}:propAlertDialog){
  const handleAlertOpen = () => { setAlertOpen((prev) =>({...prev,...{open:true}})) };
  const handleAlertClose = () => { setAlertOpen((prev) =>({...prev,...{open:false}})) };
  return (
    <React.Fragment>
      <Dialog
        open={alertOpen.open}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {(alertOpen.title !== '') &&
          <DialogTitle id="alert-dialog-title">{alertOpen.title}</DialogTitle>
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{alertOpen.msg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}