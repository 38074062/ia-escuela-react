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
import NuevaInscripcionModal from './modals/NuevaInscripcionModal';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { servicioInscripciones } from '../../servicios/inscripciones.servicio';
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

class Inscripciones extends React.Component {
    constructor(props) {
        super();
        this.state = {
            inscripciones: [], cargando: true, message: "", pagina: 0,
            filasPorPagina: 6, filas: [], modalNuevaInscripcionVisible: false, inscripcion: null
        };
        this.props = props;
    }
    componentDidMount = () => {
        this.getInscripciones();
    }

    getInscripciones = () => {
        servicioInscripciones.listarInscripciones().then(
            (respuesta) => {
                this.setState({ inscripciones: respuesta, cargando: false });
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


    onEliminarInscripcion = (eliminar) => {
        this.setState({ alertaVisible: false });
        if (eliminar) {
            servicioInscripciones.eliminarInscripcion(this.state.inscripcion.id).then(
                (respuesta) => {
                    this.setState({ cargando: false });
                    this.props.mostrarMensaje(respuesta);
                    this.getInscripciones();
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
                        <Typography className={classes.typography} variant="h5">Inscripciones</Typography>
                        <Alerta titulo={"Atención"} descripcion={"¿Está seguro de eliminar esta inscripción?"} onClose={this.onEliminarInscripcion} visible={this.state.alertaVisible} />
                        <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={() => this.setState({ modalNuevaInscripcionVisible: true })}>
                            <AddIcon className={classes.extendedIcon} />
                            Nueva inscripcion</Fab>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.modalNuevaInscripcionVisible}
                            onClose={() => this.setState({ modalNuevaInscripcionVisible: false, inscripcion: null })}
                        ><NuevaInscripcionModal cerrarModal={() => {
                            this.setState({ modalNuevaInscripcionVisible: false, inscripcion: null });
                            this.getInscripciones();
                        }} mostrarMensaje={this.props.mostrarMensaje} inscripcion={this.state.inscripcion} /></Modal>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>DNI Titular</TableCell>
                                    <TableCell className={classes.tableCell}>Nombre del alumno</TableCell>
                                    <TableCell className={classes.tableCell}>Apellido del alumno</TableCell>
                                    <TableCell className={classes.tableCell}>DNI del alumno</TableCell>
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
                                    this.state.inscripciones.slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina).map((inscripcion, index) => (
                                        <TableRow key={inscripcion.id}>
                                            <TableCell className={classes.tableCell}>
                                                {inscripcion.dniTitular}
                                            </TableCell>
                                            <TableCell className={classes.tableCell}>{inscripcion.alumno.nombre}</TableCell>
                                            <TableCell className={classes.tableCell}>{inscripcion.alumno.apellido}</TableCell>
                                            <TableCell className={classes.tableCell}>{inscripcion.alumno.dni}</TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="secondary" className="button" onClickCapture={() => this.setState({ alertaVisible: true, inscripcion: inscripcion })}>
                                                Eliminar<DeleteIcon />
                                            </Button></TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" onClickCapture={() => this.setState({ inscripcion: inscripcion, modalNuevaInscripcionVisible: true })}>
                                                Modificar<Edit />
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

export default withStyles(styles)(Inscripciones)