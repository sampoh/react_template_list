// import React,{Fragment} from 'react'
import {styled} from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
interface Column {
    id: 'id' | '食品名' | '廃棄率' | 'エネルギー_kcal' | 'エネルギー_kj' | '水分' | 'タンパク質' | 'アミノ酸組成によるたんぱく質' | '脂質' | 
    'トリアシルグリセロール当量' | '飽和脂肪酸' | '一価不飽和脂肪酸' | '多価不飽和脂肪酸' | 
    'コレステロール' | '炭水化物' | '利用可能炭水化物_単糖当量' | '水溶性食物繊維' | '不溶性食物繊維' | 
    '食物繊維総量' | '灰分' | 'ナトリウム' | 'カリウム' | 'カルシウム' | 'マグネシウム' | 'リン' | '鉄' | 
    '亜鉛' | '銅' | 'マンガン' | 'ヨウ素' | 'セレン' | 'クロム' | 'モリブデン' | 'レチノール' | 'αカロテン' | 
    'βカロテン' | 'βクリプトキサンチン' | 'βカロテン当量' | 'レチノール活性当量' | 'ビタミンD' | 'αトコフェロール' | 
    'βトコフェロール' | 'γトコフェロール' | 'δトコフェロール' | 'ビタミンK' | 'ビタミンB1' | 'ビタミンB2' | 
    'ナイアシン' | 'ビタミンB6' | 'ビタミンB12' | '葉酸' | 'パントテン酸' | 'ビオチン' | 'ビタミンC' | '食塩相当量' | '備考';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}
  
export const columns: readonly Column[] = [
    {id:'id',label:'id',minWidth:36,align:'center',format:(value:number)=>value.toString()},
    {id:'食品名',label:'食品名',minWidth:240},
    {id:'廃棄率',label:'廃棄率 (%)',minWidth:50,align:'center',format:(value:number)=>value.toFixed(1)},
    {id:'エネルギー_kcal',label:"エネルギー (kcal/100g)",minWidth:110,align:'center',format:(value:number)=>value.toLocaleString('ja-JP')},
    {id:'エネルギー_kj',label:'エネルギー (kJ/100g)',minWidth:100,align:'center',format:(value:number)=>value.toLocaleString('ja-JP')},
    {id:'水分',label:'水分 (g/100g)',minWidth:40,align:'center',format:(value:number)=>value.toString()},
    {id:'タンパク質',label:'タンパク質 (g/100g)',minWidth:80,align:'center',format:(value:number)=>value.toString()},
    {id:'アミノ酸組成によるたんぱく質',label:'アミノ酸組成によるたんぱく質 (g/100g)',minWidth:140,align:'center',format:(value:number)=>value.toString()},
    {id:'脂質',label:'脂質 (g/100g)',minWidth:50,align:'center',format:(value:number)=>value.toString()},
    {id:'トリアシルグリセロール当量',label:'トリアシルグリセロール当量 (g/100g)',minWidth:140,align:'center',format:(value:number)=>value.toString()},
    {id:'飽和脂肪酸',label:'飽和脂肪酸 (g/100g)',minWidth:80,align:'center',format:(value:number)=>value.toString()},
    {id:'一価不飽和脂肪酸',label:'一価不飽和脂肪酸 (g/100g)',minWidth:130,align:'center',format:(value:number)=>value.toString()},
    {id:'多価不飽和脂肪酸',label:'多価不飽和脂肪酸 (g/100g)',minWidth:130,align:'center',format:(value:number)=>value.toString()},
    {id:'コレステロール',label:'コレステロール (mg/100g)',minWidth:100,align:'center',format:(value:number)=>value.toString()},
    {id:'炭水化物',label:'炭水化物 (g/100g)',minWidth:70,align:'center',format:(value:number)=>value.toString()},
    {id:'利用可能炭水化物_単糖当量',label:'利用可能炭水化物_単糖当量 (g/100g)',minWidth:130,align:'center',format:(value:number)=>value.toString()},
    {id:'水溶性食物繊維',label:'水溶性食物繊維 (g/100g)',minWidth:120,align:'center',format:(value:number)=>value.toString()},
    {id:'不溶性食物繊維',label:'不溶性食物繊維 (g/100g)',minWidth:120,align:'center',format:(value:number)=>value.toString()},
    {id:'食物繊維総量',label:'食物繊維総量 (g/100g)',minWidth:130,align:'center',format:(value:number)=>value.toString()},
    {id:'灰分',label:'灰分 (g/100g)',minWidth:50,align:'center',format:(value:number)=>value.toString()},
    {id:'ナトリウム',label:'ナトリウム (mg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'カリウム',label:'カリウム (mg/100g)',minWidth:80,align:'center',format:(value:number)=>value.toString()},
    {id:'カルシウム',label:'カルシウム (mg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'マグネシウム',label:'マグネシウム (mg/100g)',minWidth:100,align:'center',format:(value:number)=>value.toString()},
    {id:'リン',label:'リン (mg/100g)',minWidth:40,align:'center',format:(value:number)=>value.toString()},
    {id:'鉄',label:'鉄 (mg/100g)',minWidth:40,align:'center',format:(value:number)=>value.toString()},
    {id:'亜鉛',label:'亜鉛 (mg/100g)',minWidth:40,align:'center',format:(value:number)=>value.toString()},
    {id:'銅',label:'銅 (mg/100g)',minWidth:40,align:'center',format:(value:number)=>value.toString()},
    {id:'マンガン',label:'マンガン (mg/100g)',minWidth:50,align:'center',format:(value:number)=>value.toString()},
    {id:'ヨウ素',label:'ヨウ素 (μg/100g)',minWidth:50,align:'center',format:(value:number)=>value.toString()},
    {id:'セレン',label:'セレン (μg/100g)',minWidth:50,align:'center',format:(value:number)=>value.toString()},
    {id:'クロム',label:'クロム (μg/100g)',minWidth:50,align:'center',format:(value:number)=>value.toString()},
    {id:'モリブデン',label:'モリブデン (μg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'レチノール',label:'レチノール (μg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'αカロテン',label:'αカロテン (μg/100g)',minWidth:70,align:'center',format:(value:number)=>value.toString()},
    {id:'βカロテン',label:'βカロテン (μg/100g)',minWidth:70,align:'center',format:(value:number)=>value.toString()},
    {id:'βクリプトキサンチン',label:'βクリプトキサンチン (μg/100g)',minWidth:140,align:'center',format:(value:number)=>value.toString()},
    {id:'βカロテン当量',label:'βカロテン当量 (μg/100g)',minWidth:130,align:'center',format:(value:number)=>value.toString()},
    {id:'レチノール活性当量',label:'レチノール活性当量 (μg/100g)',minWidth:140,align:'center',format:(value:number)=>value.toString()},
    {id:'ビタミンD',label:'ビタミンD (μg/100g)',minWidth:100,align:'center',format:(value:number)=>value.toString()},
    {id:'αトコフェロール',label:'αトコフェロール (mg/100g)',minWidth:120,align:'center',format:(value:number)=>value.toString()},
    {id:'βトコフェロール',label:'βトコフェロール (mg/100g)',minWidth:120,align:'center',format:(value:number)=>value.toString()},
    {id:'γトコフェロール',label:'γトコフェロール (mg/100g)',minWidth:120,align:'center',format:(value:number)=>value.toString()},
    {id:'δトコフェロール',label:'δトコフェロール (mg/100g)',minWidth:120,align:'center',format:(value:number)=>value.toString()},
    {id:'ビタミンK',label:'ビタミンK (μg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'ビタミンB1',label:'ビタミンB1 (mg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'ビタミンB2',label:'ビタミンB2 (mg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'ナイアシン',label:'ナイアシン (mg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'ビタミンB6',label:'ビタミンB6 (mg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'ビタミンB12',label:'ビタミンB12 (μg/100g)',minWidth:90,align:'center',format:(value:number)=>value.toString()},
    {id:'葉酸',label:'葉酸 (μg/100g)',minWidth:40,align:'center',format:(value:number)=>value.toString()},
    {id:'パントテン酸',label:'パントテン酸 (mg/100g)',minWidth:100,align:'center',format:(value:number)=>value.toString()},
    {id:'ビオチン',label:'ビオチン (μg/100g)',minWidth:80,align:'center',format:(value:number)=>value.toString()},
    {id:'ビタミンC',label:'ビタミンC (mg/100g)',minWidth:80,align:'center',format:(value:number)=>value.toString()},
    {id:'備考',label:'備考',minWidth:240},
  ];

  export type Data = {
    id:number,
	食品名:string,
    廃棄率:number,
    エネルギー_kcal:number,
    エネルギー_kj:number,
    水分:number,
    タンパク質:number,
    アミノ酸組成によるたんぱく質:number,
    脂質:number,
    トリアシルグリセロール当量:number,
    飽和脂肪酸:number,
    一価不飽和脂肪酸:number,
    多価不飽和脂肪酸:number,
    コレステロール:number,
    炭水化物:number,
    利用可能炭水化物_単糖当量:number,
	水溶性食物繊維:number,
	不溶性食物繊維:number,
	食物繊維総量:number,
	灰分:number,
	ナトリウム:number,
	カリウム:number,
	カルシウム:number,
	マグネシウム:number,
	リン:number,
	鉄:number,
	亜鉛:number,
	銅:number,
	マンガン:number,
	ヨウ素:number,
	セレン:number,
	クロム:number,
	モリブデン:number,
	レチノール:number,
	αカロテン:number,
	βカロテン:number,
	βクリプトキサンチン:number,
	βカロテン当量:number,
	レチノール活性当量:number,
	ビタミンD:number,
	αトコフェロール:number,
	βトコフェロール:number,
	γトコフェロール:number,
	δトコフェロール:number,
	ビタミンK:number,
	ビタミンB1:number,
	ビタミンB2:number,
	ナイアシン:number,
	ビタミンB6:number,
	ビタミンB12:number,
	葉酸:number,
	パントテン酸:number,
	ビオチン:number,
	ビタミンC:number,
	食塩相当量:number,
	備考:string
}

export function createData(
    id:number,//0
	食品名:string,//1
    廃棄率:number,//2
    エネルギー_kcal:number,//3
    エネルギー_kj:number,//4
    水分:number,//5
    タンパク質:number,//6
    アミノ酸組成によるたんぱく質:number,//7
    脂質:number,//8
    トリアシルグリセロール当量:number,//9
    飽和脂肪酸:number,//10
    一価不飽和脂肪酸:number,//11
    多価不飽和脂肪酸:number,//12
    コレステロール:number,//13
    炭水化物:number,//14
    利用可能炭水化物_単糖当量:number,//15
	水溶性食物繊維:number,//16
	不溶性食物繊維:number,//17
	食物繊維総量:number,//18
	灰分:number,//19
	ナトリウム:number,//20
	カリウム:number,//21
	カルシウム:number,//22
	マグネシウム:number,//23
	リン:number,//24
	鉄:number,//25
	亜鉛:number,//26
	銅:number,//27
	マンガン:number,//28
	ヨウ素:number,//29
	セレン:number,//30
	クロム:number,//31
	モリブデン:number,//32
	レチノール:number,//33
	αカロテン:number,//34
	βカロテン:number,//35
	βクリプトキサンチン:number,//36
	βカロテン当量:number,//37
	レチノール活性当量:number,//38
	ビタミンD:number,//39
	αトコフェロール:number,//40
	βトコフェロール:number,//41
	γトコフェロール:number,//42
	δトコフェロール:number,//43
	ビタミンK:number,//44
	ビタミンB1:number,//45
	ビタミンB2:number,//46
	ナイアシン:number,//47
	ビタミンB6:number,//48
	ビタミンB12:number,//49
	葉酸:number,//50
	パントテン酸:number,//51
	ビオチン:number,//52
	ビタミンC:number,//53
	食塩相当量:number,//54
	備考:string//55
  ): Data {
	return {
		id,食品名,廃棄率,エネルギー_kcal,エネルギー_kj,水分,タンパク質,アミノ酸組成によるたんぱく質,
		脂質,トリアシルグリセロール当量,飽和脂肪酸,一価不飽和脂肪酸,多価不飽和脂肪酸,
		コレステロール,炭水化物,利用可能炭水化物_単糖当量,水溶性食物繊維,不溶性食物繊維,食物繊維総量,
		灰分,ナトリウム,カリウム,カルシウム,マグネシウム,リン,鉄,亜鉛,銅,マンガン,ヨウ素,セレン,
		クロム,モリブデン,レチノール,αカロテン,βカロテン,βクリプトキサンチン,βカロテン当量,レチノール活性当量,
		ビタミンD,αトコフェロール,βトコフェロール,γトコフェロール,δトコフェロール,ビタミンK,
		ビタミンB1,ビタミンB2,ナイアシン,ビタミンB6,ビタミンB12,葉酸,パントテン酸,ビオチン,ビタミンC,
		食塩相当量,備考
	};
}

export function dataConverter(input:Array<Array<any>>){
    let out:Array<any> = [];
    input.map((each:any) => {
      out.push(createData(
        each[0],each[1],each[2],each[3],each[4],each[5],each[6],each[7],each[8],each[9],
        each[10],each[11],each[12],each[13],each[14],each[15],each[16],each[17],each[18],each[19],
        each[20],each[21],each[22],each[23],each[24],each[25],each[26],each[27],each[28],each[29],
        each[30],each[31],each[32],each[33],each[34],each[35],each[36],each[37],each[38],each[39],
        each[40],each[41],each[42],each[43],each[44],each[45],each[46],each[47],each[48],each[49],
        each[50],each[51],each[52],each[53],each[54],each[55]
      ));
    });
    return out;
  }
  
  export type typeDetailIO = {
    backdrop:boolean,
    id:number
  };

 export type typeDetailData = {
    open:boolean,
    data:Data
  }
  
  export const emptyDetailData = {
    open:false,
    data:{
        id:0,//0
        食品名:"",//1
        廃棄率:0,//2
        エネルギー_kcal:0,//3
        エネルギー_kj:0,//4
        水分:0,//5
        タンパク質:0,//6
        アミノ酸組成によるたんぱく質:0,//7
        脂質:0,//8
        トリアシルグリセロール当量:0,//9
        飽和脂肪酸:0,//10
        一価不飽和脂肪酸:0,//11
        多価不飽和脂肪酸:0,//12
        コレステロール:0,//13
        炭水化物:0,//14
        利用可能炭水化物_単糖当量:0,//15
        水溶性食物繊維:0,//16
        不溶性食物繊維:0,//17
        食物繊維総量:0,//18
        灰分:0,//19
        ナトリウム:0,//20
        カリウム:0,//21
        カルシウム:0,//22
        マグネシウム:0,//23
        リン:0,//24
        鉄:0,//25
        亜鉛:0,//26
        銅:0,//27
        マンガン:0,//28
        ヨウ素:0,//29
        セレン:0,//30
        クロム:0,//31
        モリブデン:0,//32
        レチノール:0,//33
        αカロテン:0,//34
        βカロテン:0,//35
        βクリプトキサンチン:0,//36
        βカロテン当量:0,//37
        レチノール活性当量:0,//38
        ビタミンD:0,//39
        αトコフェロール:0,//40
        βトコフェロール:0,//41
        γトコフェロール:0,//42
        δトコフェロール:0,//43
        ビタミンK:0,//44
        ビタミンB1:0,//45
        ビタミンB2:0,//46
        ナイアシン:0,//47
        ビタミンB6:0,//48
        ビタミンB12:0,//49
        葉酸:0,//50
        パントテン酸:0,//51
        ビオチン:0,//52
        ビタミンC:0,//53
        食塩相当量:0,//54
        備考:""//55
    
    }
  }