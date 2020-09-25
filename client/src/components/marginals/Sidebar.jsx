import React, { useState } from 'react';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import useWindowSize from '../../hooks/useWindowSize';

import { Link } from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const windowSize = useWindowSize();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className={classes.list}>
      <div className={classes.toolbar} />
      <List>
        <a href='https://dscnitrourkela.tech' className={classes.listItem}>
          <ListItem button key='Home'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </a>
        <Link to='/livestream' className={classes.listItem}>
          <ListItem button key='Livestream'>
            <ListItemIcon>
              <LiveTvIcon />
            </ListItemIcon>
            <ListItemText primary='Livestream' />
          </ListItem>
        </Link>
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          {props.isAuth ? (
            <Link style={{ color: 'white' }} to='/profile' className={classes.listItem}>
              <Typography align='right' variant='h6' noWrap>
                Profile
              </Typography>
            </Link>
          ) : (
            <Link style={{ color: 'white' }} to='/login' className={classes.listItem}>
              <Typography align='right' variant='h6' noWrap>
                Sign in
              </Typography>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <nav className={windowSize.width > 700 ? classes.drawer : null} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default ResponsiveDrawer;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 10,
    height: '4em',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    minHeight: '100vh',
  },
  list: {
    marginTop: '2em',
  },
  listItem: {
    textDecoration: 'none',
    color: '#000',
  },
}));
