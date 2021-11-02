import * as React from 'react';
import {AppBar as AppBarComponenet}  from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../routes';

type AppBarType={
  LogOut:any;
}

const useStyles = makeStyles({
    appBarColor:{
        backgroundColor:"rgb(42, 27, 38) !important",
        backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.6)), url("https://pl.tedcdn.com/ted-auth-assets/bg-fellows-001.svg")`,
        backgroundSize:"cover",
    }
})

const  AppBar:React.FunctionComponent<AppBarType> = (props) => {
    const {LogOut}=props
    const classes = useStyles()
    const history = useHistory()
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarComponenet 
        position="static" 
        classes={
            {colorPrimary:classes.appBarColor}
        }
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Packaging
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={LogOut}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBarComponenet>
    </Box>
  );
}

export default AppBar