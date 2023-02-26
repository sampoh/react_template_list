import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import {isMobile} from "react-device-detect";

export type typeSearchForm = {
    name:string,
    trigger:number
  };
  
export const defaultSearchForm:typeSearchForm = {
    name:'',
    trigger:0
};

type typeSearchInput = {
    searchForm:typeSearchForm,
    setSearchForm:React.Dispatch<React.SetStateAction<typeSearchForm>>,
};
export function SearchInput({searchForm, setSearchForm}:typeSearchInput) {
    const submitHandler = (ev:any) => {
        ev.preventDefault();
        setSearchForm((prev) => ({...prev,...{trigger:(prev.trigger + 1)}}));
    }
    let inputWidth = (isMobile)?'100%':400;

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:(isMobile)?'98%':400}}
      onSubmit={submitHandler}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="食品名"
        inputProps={{ 'aria-label': 'name of food' }}
        onChange={(ev) => { setSearchForm((prev) => ({...prev,...{name:ev.target.value}})) }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search"
       onClick={() => { setSearchForm((prev) => ({...prev,...{trigger:(prev.trigger + 1)}})) }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}