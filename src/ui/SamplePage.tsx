import * as React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import {MyDrawer} from './Drawer';
import {SessionContext,sessionIO} from '../system/Session';
import {AppBar,drawerWidth} from '../system/Cast';

export default function SamplePage(){
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
                              Sample page
                          </Typography>
                      </Toolbar>
                  </AppBar>
                  <Typography variant="h2" noWrap component="div" sx={{fontWeight:'bold',marginTop:14,padding:2,textAlign:'center'}}>
                        Sample page
                    </Typography>
              </Box>
          </Box>
        </React.Fragment>
    )
}