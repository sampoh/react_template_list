import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';

import {isMobile} from "react-device-detect";
import windowDimensions from '../system/WindowDimensions';
import {SessionContext,sessionIO} from '../system/Session';
import {SearchInput,typeSearchForm,defaultSearchForm} from './Search';
import {MyDrawer} from './Drawer';

import {columns,dataConverter,AppBar,drawerWidth,typeDetailIO,Data,emptyDetailData,typeDetailData} from '../system/Cast';
import {FullScreenDialog} from './FullScreenDialog';

//ヘッダ&フッタの色指定
const styleTableHeader = {
 color:'#000',backgroundColor:'#eaeaea'
};

//フォーム値の一時保管用
let savedForm = defaultSearchForm;

let recsAll:number = 0;

const InnerList = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

//paddingをモバイルと非モバイルで振り分け
let myPadding = (isMobile)?
{
  paddingTop:10,
  paddingBottom:0,
  paddingLeft:10,
  paddingRight:10,
}:
{
  paddingTop:24,
  paddingBottom:24,
  paddingLeft:24,
  paddingRight:24,
};

export default function MyList(){

  //App.tsxの<SessionContext.Provider>のvaue値で指定したもののうち利用するものを取得
  const {setTriggerCheck,setTriggerLogout} = React.useContext(SessionContext);

  const [open,setOpen] = React.useState<boolean>(false);
  const handleDrawerOpen = () => { setOpen(true) };
  const handleDrawerClose = () => { setOpen(false) };

  return (
      <React.Fragment>
          <Box sx={{display:'flex-row',flex:1}}>
              <MyDrawer open={open} setTriggerLogout={setTriggerLogout} handleDrawerClose={handleDrawerClose} />
              <Box sx={{height:'100%',padding:0}} onClick={(() => {if(open){handleDrawerClose()}})}>
                  <AppBar position="fixed" open={open}>
                      <Toolbar>
                          <IconButton color="inherit" aria-label="open drawer" edge="start"
                              sx={{ mr: 2, ...(open && { display: 'none' }) }}
                              onClick={handleDrawerOpen} >
                              <MenuIcon />
                          </IconButton>
                          <Typography variant="h6" noWrap component="div">
                              食品成分表 ( 野菜 )
                          </Typography>
                      </Toolbar>
                  </AppBar>
                  <InnerList open={open} style={{marginLeft:0,marginTop:60,marginRight:0,
                    paddingTop:myPadding.paddingTop,
                    paddingBottom:myPadding.paddingBottom,
                    paddingLeft:myPadding.paddingLeft,
                    paddingRight:myPadding.paddingLeft}}>
                      <StickyHeadTable />
                  </InnerList>
              </Box>
          </Box>
      </React.Fragment>
  );

}

function StickyHeadTable() {

  const [listData,setListData] = React.useState<Array<any>>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [isPagerEvent,setIsPagerEvent] = React.useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setIsPagerEvent(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPagerEvent(true);
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [backdrop,setBackdrop] = React.useState<boolean>(false);
  const [detailIO,setDetailIO] = React.useState<typeDetailIO>({backdrop:false,id:0});
  const [detailData,setDetailData] = React.useState<typeDetailData>(emptyDetailData);

  const {height,width} = windowDimensions();

  let tableContainerHeight = isMobile?height - 189:height - 225;

  const [searchForm, setSearchForm] = React.useState<typeSearchForm>(defaultSearchForm);

  //ページャからのリクエスト
  React.useEffect(() => {
    if(isPagerEvent){
      setBackdrop(true);
    }
  },[page,rowsPerPage]);

  //フォームからのリクエスト
  React.useEffect(() => {
    setIsPagerEvent(false);
    setPage(0);
    savedForm = searchForm;
    setBackdrop(true);
  },[searchForm.trigger]);

  //一覧ロード
  React.useEffect(() => {
    fetchListData(savedForm.name,page,rowsPerPage,setBackdrop,setListData);
  },[backdrop])

  //詳細ロード
  React.useEffect(() => {
    if(detailIO.backdrop){
      showDetail(detailIO,setDetailIO,setDetailData);
    }
  },[detailIO]);

  return (
    <React.Fragment>

      <Box sx={{marginBottom:isMobile?1:2}}>
      <SearchInput searchForm={searchForm} setSearchForm={setSearchForm}/>
      </Box>
    <Paper sx={{ width: '100%', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: tableContainerHeight }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{
              "& th":{
                color:styleTableHeader.color,
                backgroundColor:styleTableHeader.backgroundColor
              }
            }}>
              <TableCell
                key="editHeader"
                style={{minWidth:50,
                  borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderStyle:'solid',
                  borderTopColor:'#cdcdcd',borderLeftColor:'#cdcdcd',borderRightColor:'#cdcdcd',borderBottomColor:'#a3a3a3'}}
              >&nbsp;</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{minWidth: column.minWidth,
                    borderTopWidth:1,borderLeftWidth:1,borderRightWidth:1,borderBottomWidth:1,borderStyle:'solid',
                    borderTopColor:'#cdcdcd',borderLeftColor:'#cdcdcd',borderRightColor:'#cdcdcd',borderBottomColor:'#a3a3a3'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {listData
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    <TableCell key={row.id + 'Edit'} align='center'
                      style={{borderWidth:1,borderColor:'#cdcdcd',borderStyle:'solid'}}>
                      <Button key={row.id} variant="contained" color="warning" onClick={() => {
                        setDetailIO((prev) => ({...prev,...{id:row.id,backdrop:true}}))
                      }}>編集</Button>
                    </TableCell>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}
                          style={{borderWidth:1,borderColor:'#cdcdcd',borderStyle:'solid'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        labelRowsPerPage="表示件数"
        labelDisplayedRows={({from,to,count}) => { return `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}` }}
        rowsPerPageOptions={[10,25,50,100]}
        component="div"
        count={recsAll}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{color:styleTableHeader.color,backgroundColor:styleTableHeader.backgroundColor}}
      />
    </Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={(backdrop||detailIO.backdrop)}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <FullScreenDialog detailData={detailData} setDetailData={setDetailData} setDetailIO={setDetailIO} setBackdrop={setBackdrop} />
    </React.Fragment>
  );
}

function fetchListData(
  searchTxt:string,
  page:number,
  rowsPerPage:number,
  setBackdrop:React.Dispatch<React.SetStateAction<boolean>>,
  setListData:React.Dispatch<React.SetStateAction<any[]>>){

  let query_params = encodeURIComponent(searchTxt);
  let listUri = 'https://local.rna.co.jp/test/react_list_data.php?searchname=' + query_params;
  listUri += '&page=' + (page + 1) + '&recsperpage=' + rowsPerPage;

  let mySession = new sessionIO();
  mySession.getHeader();
  fetch(
    listUri,{mode:'cors',headers:mySession.getHeader()}
  ).then(res => {
    console.log('HTTP CODE : ' + res.status);
    return res.json();
  }).then(content => {
    recsAll = content.pager.recsAll;
    let data = dataConverter(content.list);
    setListData(data);
  }).catch(err => {
  }).finally(() => {
    setBackdrop(false)
  });

}

function showDetail(
  detailIO:typeDetailIO,
  setDetailIO:React.Dispatch<React.SetStateAction<typeDetailIO>>,
  setDetailData:React.Dispatch<React.SetStateAction<typeDetailData>>
  ){

  let listUri = 'https://local.rna.co.jp/test/react_detail_data.php?id=' + detailIO.id;

  let mySession = new sessionIO();
  mySession.getHeader();
  fetch(
    listUri,{mode:'cors',headers:mySession.getHeader()}
  ).then(res => {
    console.log('HTTP CODE : ' + res.status);
    return res.json();
  }).then(content => {
    console.log('detail content',content);
    setDetailData((prev) => ({...prev,...{open:true,data:content.detail}}))
    setDetailIO((prev) => ({...prev,...{backdrop:false}}))
  }).catch(err => {
    setDetailIO((prev) => ({...prev,...{backdrop:false,id:0}}))
  }).finally(() => {
  });

}