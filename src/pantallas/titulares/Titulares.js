import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from "@material-ui/icons/Edit";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { Modal } from '@material-ui/core';
import { servicioTitulares } from '../../servicios/titulares.servicio';
import NuevoTitularModal from "./modals/NuevoTitularModal";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import View from '@material-ui/icons/Visibility';
import Alerta from '../../componentes/Alerta';

let styles = theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: `0 ${theme.spacing(3)}px`,

    },
    paper: {
        maxWidth: '95%',
        textAlign: 'center',
        margin: `${theme.spacing()}px auto`,
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    progress: {
        margin: `${theme.spacing()}px auto`,
        maxWidth: '100%',
        textAlign: 'center',
    },
    table: {
        minWidth: '95%',
    },
    snackbar: {
        margin: theme.spacing(),
        position: 'absolute',
    },
    addFab: {
        margin: theme.spacing(),
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(6),
        maxWidth: '95%',
    },
    tableCell: {
        paddingRight: 4,
        paddingLeft: 5
    },
    formControl: {
        margin: theme.spacing(),
        minWidth: 120,
    },
    typography: {
        color: 'black',
    }
});

class Titulares extends React.Component {
    constructor(props) {
        super();
        this.state = {
            titulares: [], cargando: true, message: "", pagina: 0, alertaVisible: false,
            filasPorPagina: 6, filas: [], modalNuevoTitularVisible: false, titular: null
        };
        this.props = props;
    }
    componentDidMount = () => {
        this.getTitulares();
    }

    getTitulares = () => {
        servicioTitulares.listarTitulares().then(
            (respuesta) => {
                this.setState({ titulares: respuesta, cargando: false });
            },
            (error) => {
                this.setState({ cargando: false });
                this.props.mostrarMensaje(error);
            }
        );
    }

    handleChangePage = (event, pagina) => {
        this.setState({ pagina });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ pagina: 0, filasPorPagina: event.target.value });
    };

    onEliminarTitular = (eliminar) => {
        this.setState({ alertaVisible: false });
        if (eliminar) {
            servicioTitulares.eliminarTitular(this.state.titular.id).then(
                (respuesta) => {
                    this.setState({ cargando: false });
                    this.props.mostrarMensaje(respuesta);
                },
                (error) => {
                    this.setState({ cargando: false });
                    this.props.mostrarMensaje(error);
                }
            );
        }
    }

    render = () => {
        let { classes } = this.props;
        let { filas, filasPorPagina, pagina } = this.state;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h5">Titulares</Typography>
                        <Alerta titulo={"Atención"} descripcion={"¿Está seguro de eliminar este titular?"} onClose={this.onEliminarTitular} visible={this.state.alertaVisible} />
                        <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={() => this.setState({ modalNuevoTitularVisible: true })}>
                            <AddIcon className={classes.extendedIcon} />
                            Nuevo titular</Fab>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.modalNuevoTitularVisible}
                            onClose={() => this.setState({ modalNuevoTitularVisible: false, titular: null })}
                        ><NuevoTitularModal cerrarModal={() => {
                            this.setState({ modalNuevoTitularVisible: false, titular: null });
                            this.getTitulares();
                        }} mostrarMensaje={this.props.mostrarMensaje} titular={this.state.titular} /></Modal>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>DNI</TableCell>
                                    <TableCell className={classes.tableCell}>Nombre</TableCell>
                                    <TableCell className={classes.tableCell}>Apellido</TableCell>
                                    <TableCell className={classes.tableCell}>Direccion</TableCell>
                                    <TableCell className={classes.tableCell}>Mail</TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                    <TableCell className={classes.tableCell}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.cargando ?
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            <CircularProgress align="center" className={classes.progress} />
                                        </TableCell>
                                    </TableRow> :
                                    this.state.titulares.slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina).map((titular, index) => (
                                        <TableRow key={titular.id}>
                                            <TableCell className={classes.tableCell}>
                                                {titular.dni}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{titular.nombre}</TableCell>
                                            <TableCell className={classes.tableCell}>{titular.apellido}</TableCell>
                                            <TableCell className={classes.tableCell}>{titular.direccion}</TableCell>
                                            <TableCell className={classes.tableCell}>{titular.mail}</TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="secondary" className="button" onClickCapture={() => this.setState({ alertaVisible: true, titular: titular })}>
                                                Eliminar<DeleteIcon />
                                            </Button></TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" onClickCapture={() => this.setState({ modalNuevoTitularVisible: true, titular: titular })}>
                                                Modificar<Edit />
                                            </Button></TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" onClickCapture={() => this.props.history.push({
                                                pathname: "/titular",
                                                state: { idTitular: titular.id }
                                            })}>
                                                Ver<View />
                                            </Button></TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={filas.length}
                                        rowsPerPage={filasPorPagina}
                                        page={pagina}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Titulares)
