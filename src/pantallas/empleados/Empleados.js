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
import { servicioEmpleados } from '../../servicios/empleados.servicio';
import { Modal } from '@material-ui/core';
import CargaHorariaModal from './modals/CargaHorariaModal';
import Alerta from '../../componentes/Alerta';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

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

class Empleados extends React.Component {
    constructor(props) {
        super();
        this.state = {
            empleados: [], cargando: true, message: "", pagina: 0,
            filasPorPagina: 6, filas: [], modalCargaHorariaVisible: false, empleado: null,
            alertaVisible: false
        };
        this.props = props;
    }
    componentDidMount = () => {
        servicioEmpleados.listarEmpleados().then(
            (respuesta) => {
                this.setState({ empleados: respuesta, cargando: false });
            },
            (error) => {
                this.setState({ cargando: false });
                this.props.mostrarMensaje(error);
            }
        )
    }

    handleChangePage = (event, pagina) => {
        this.setState({ pagina });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ pagina: 0, filasPorPagina: event.target.value });
    };

    onEliminarEmpleado = (eliminar) => {
        this.setState({ alertaVisible: false });
        if (eliminar) {
            servicioEmpleados.eliminarEmpleado(this.state.empleado.id).then(
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

    liquidarSueldos = () =>{
        servicioEmpleados.liquidarSueldos().then(
            (respuesta) => {
                this.props.mostrarMensaje(respuesta);
            },
            (error) => {
                this.props.mostrarMensaje(error);
            }
        );
    }

    render = () => {
        let { classes } = this.props;
        let { filas, filasPorPagina, pagina } = this.state;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h5">Empleados</Typography>
                        <Alerta titulo={"Atención"} descripcion={"¿Está seguro de eliminar este empleado?"} onClose={this.onEliminarEmpleado} visible={this.state.alertaVisible} />
                        <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={() => this.liquidarSueldos()}>
                            <AddIcon className={classes.extendedIcon} />
                            Liquidar sueldos</Fab>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.modalCargaHorariaVisible}
                            onClose={() => this.setState({ modalCargaHorariaVisible: false, empleado: null })}
                        ><CargaHorariaModal id={this.state.empleado} cerrarModal={() => this.setState({ modalCargaHorariaVisible: false, empleado: null })} mostrarMensaje={this.props.mostrarMensaje} empleado={this.state.empleado} /></Modal>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>DNI</TableCell>
                                    <TableCell className={classes.tableCell}>Nombre</TableCell>
                                    <TableCell className={classes.tableCell}>Apellido</TableCell>
                                    <TableCell className={classes.tableCell}>CUIT</TableCell>
                                    <TableCell className={classes.tableCell}>Mail</TableCell>
                                    <TableCell className={classes.tableCell}>Cargo</TableCell>
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
                                    this.state.empleados.slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina).map((empleado, index) => (
                                        <TableRow key={empleado.id}>
                                            <TableCell className={classes.tableCell}>
                                                {empleado.dni}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{empleado.nombre}</TableCell>
                                            <TableCell className={classes.tableCell}>{empleado.apellido}</TableCell>
                                            <TableCell className={classes.tableCell}>{empleado.cuit}</TableCell>
                                            <TableCell className={classes.tableCell}>{empleado.nombreUsuario}</TableCell>
                                            <TableCell className={classes.tableCell}>{empleado.cargo}</TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" onClickCapture={() => this.props.history.push({
                                                pathname: "/empleados/nuevo",
                                                state: { empleado }
                                            })}>
                                                Modificar<Edit />
                                            </Button></TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="secondary" className="button" onClickCapture={() => this.setState({ alertaVisible: true, empleado: empleado })}>
                                                Eliminar<DeleteIcon />
                                            </Button></TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" onClickCapture={() => this.setState({ modalCargaHorariaVisible: true, empleado: empleado.id })}>
                                                Carga horaria<Edit />
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

export default withStyles(styles)(Empleados)
