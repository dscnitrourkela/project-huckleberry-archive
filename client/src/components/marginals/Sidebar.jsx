import React, { useState } from 'react';

// Libraries
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import AccountCircle from '@material-ui/icons/AccountCircle';

// Hooks
import useWindowSize from '../../hooks/useWindowSize';

// Redux
import { connect } from 'react-redux';

// Components
import LoginButton from '../auth/LoginButton';

const mapStateToProps = (state) => ({ uuid: state.auth.uuid });

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window, children, uuid } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
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
            <ListItemText primary='Live' />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {uuid && (
          <Link to='/profile' className={classes.listItem}>
            <ListItem button key='Profile'>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>
          </Link>
        )}
      </List>
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
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h5' noWrap className={classes.typographyTitle}>
              DSC NITRkl
            </Typography>
            <LoginButton />
          </div>
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

export default connect(mapStateToProps)(ResponsiveDrawer);

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
    height: '5em',
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    color: '#000',
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
    fontFamily: '"Open Sans", sans-serif',
  },
  typographyTitle: {
    fontFamily: '"Open Sans", sans-serif',
  },
}));
