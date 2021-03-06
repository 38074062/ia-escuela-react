import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { RutaPrivada } from '../../rutas/RutaPrivada';
import Adicionales from '../adicionales/Adicionales';
import AltaEmpleado from '../empleados/AltaEmpleado';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import Empleados from '../empleados/Empleados';
import Titulares from '../titulares/Titulares';
import Inscripciones from '../inscripciones/Inscripciones';
import Titular from '../titulares/Titular';
import { servicioAutenticacion } from '../../servicios';
import { Button } from '@material-ui/core';
import Facturas from '../facturacion/Facturas';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Escuela
          </Typography>
          <IconButton color="inherit">
            <Button variant="contained" color="secondary" className="button" onClickCapture={() => servicioAutenticacion.cerrarSesion()}>
              Cerrar sesión
            </Button>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItem>
          <ListSubheader inset>Empleados</ListSubheader>
          <ListItem button onClickCapture={() => props.history.push("/empleados/nuevo")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Nuevo empleado" />
          </ListItem>
          <ListItem button onClickCapture={() => props.history.push("/empleados")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Ver empleados" />
          </ListItem>
          <ListSubheader inset>Inscripciones</ListSubheader>
          <ListItem button onClickCapture={() => props.history.push("/inscripciones")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Inscripciones" />
          </ListItem>
          <ListItem button onClickCapture={() => props.history.push("/titulares")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Titulares" />
          </ListItem>
          <ListSubheader inset>Facturación</ListSubheader>
          <ListItem button onClickCapture={() => props.history.push("/facturas")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Facturas" />
          </ListItem>
          <ListSubheader inset>Administración</ListSubheader>
          <ListItem button onClickCapture={() => props.history.push("/adicionales")}>
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Servicios" />
          </ListItem>
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RutaPrivada path="/titulares" exact component={Titulares} mostrarMensaje={props.mostrarMensaje} />
              <RutaPrivada path="/inscripciones" exact component={Inscripciones} mostrarMensaje={props.mostrarMensaje} />
              <RutaPrivada path="/adicionales" exact component={Adicionales} mostrarMensaje={props.mostrarMensaje} />
              <RutaPrivada path="/empleados/nuevo" exact component={AltaEmpleado} mostrarMensaje={props.mostrarMensaje} />
              <RutaPrivada path="/empleados" exact component={Empleados} mostrarMensaje={props.mostrarMensaje} />
              <RutaPrivada path="/titular" exact component={Titular} mostrarMensaje={props.mostrarMensaje} />
              <RutaPrivada path="/facturas" exact component={Facturas} mostrarMensaje={props.mostrarMensaje} />
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}