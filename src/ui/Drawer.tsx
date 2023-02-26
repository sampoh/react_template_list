import React from 'react'

import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';

import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BuildIcon from '@mui/icons-material/Build';

import {drawerWidth} from '../system/Cast';
import {SessionContext,sessionIO} from '../system/Session';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));

type typeMyDrawer = {
    open:boolean,
    setTriggerLogout:React.Dispatch<React.SetStateAction<boolean>>,
    handleDrawerClose:() => void
}

export function MyDrawer({open,setTriggerLogout,handleDrawerClose}:typeMyDrawer){
    const theme = useTheme();
    const {setVirtualUrl} = React.useContext(SessionContext);
    return (
        <Drawer
            sx={{width:drawerWidth,flexShrink:0,
            '& .MuiDrawer-paper':{width:drawerWidth,boxSizing:'border-box'},}}
            variant="persistent"
            anchor="left"
            open={open} >
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <ListItem key={'List'} disablePadding onClick={() => setVirtualUrl("/")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <ListAltIcon />
                        </ListItemIcon>
                        <ListItemText primary={'食品成分表 ( 野菜 )'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'SamplePage'} disablePadding onClick={() => setVirtualUrl("/sample")}>
                    <ListItemButton>
                        <ListItemIcon>
                            <BuildIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Sample page'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem key={'Logout'} disablePadding>
                    <ListItemButton onClick={() => { setTriggerLogout((prev)=>(!prev)) }}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}
