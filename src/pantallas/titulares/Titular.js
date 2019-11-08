import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { servicioTitulares } from '../../servicios/titulares.servicio';
import { Button, Modal } from '@material-ui/core';
import Edit from "@material-ui/icons/Edit";
import CobroFacturaModal from './modals/CobroFacturaModal';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import NuevaInscripcionModal from '../inscripciones/modals/NuevaInscripcionModal';
import { servicioInscripciones } from '../../servicios/inscripciones.servicio';
import Alerta from '../../componentes/Alerta';
import DeleteIcon from '@material-ui/icons/Delete';

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
    margin: {
        margin: theme.spacing.unit,
        textAlign: 'center',
        flex: 'auto',
    },
    button: {
        margin: `${theme.spacing.unit}px auto`,
    },
    text: {
        textAlign: 'center',
        flex: 'auto',
        color: 'black',
    },
    listItem: {
        textAlign: 'center',
        color: 'black',
    },
    typography: {
        color: 'black',
    },
    textField: {
        marginLeft: `1 ${theme.spacing.unit * 3}px`,
        marginRight: `1 ${theme.spacing.unit * 3}px`,
        width: 200,
    },
    tableCell: {
        paddingRight: 4,
        paddingLeft: 5
    },
});

class Titular extends React.Component {
    state = {
        titular: {},
        cargando: true,
        cobroModalVisible: false,
        serviciosModalVisible: false,
        idFactura: -1,
        inscripcionSeleccionada: null,
        alertaVisible: false
    }

    componentDidMount = () => {
        this.getTitular();
    }

    getTitular = () => {
        servicioTitulares.getTitular(this.props.location.state.idTitular).then(
            (respuesta) => {
                this.setState({ titular: respuesta, cargando: false });
            },
            (error) => {
                this.setState({ cargando: false });
                this.props.mostrarMensaje(error);
            }
        );
    }

    onEliminarInscripcion = (eliminar) => {
        this.setState({ alertaVisible: false });
        if (eliminar) {
            servicioInscripciones.eliminarInscripcion(this.state.inscripcionSeleccionada.id).then(
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
        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.cobroModalVisible}
                    onClose={() => this.setState({ cobroModalVisible: false })}
                ><CobroFacturaModal facturaId={this.state.idFactura} titularId={this.props.location.state.idTitular} cerrarModal={() => {
                    this.setState({ cobroModalVisible: false });
                    this.getTitular();
                }} mostrarMensaje={this.props.mostrarMensaje} /></Modal>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.serviciosModalVisible}
                    onClose={() => this.setState({ serviciosModalVisible: false })}
                ><NuevaInscripcionModal inscripcion={this.state.inscripcionSeleccionada} cerrarModal={() => {
                    this.setState({ serviciosModalVisible: false });
                    this.getTitular();
                }} mostrarMensaje={this.props.mostrarMensaje} /></Modal>
                <Alerta titulo={"Atención"} descripcion={"¿Está seguro de eliminar esta inscripcion?"} onClose={this.onEliminarInscripcion} visible={this.state.alertaVisible} />
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h5">Titular</Typography>
                        {this.state.cargando ?
                            (<CircularProgress align="center" className={classes.progress} />)
                            : (
                                <Grid container alignContent="center" alignItems="flex-start">
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} variant="h6" gutterBottom>Nombre</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} gutterBottom>{this.state.titular.nombre} {this.state.titular.apellido}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} variant="h6" gutterBottom>DNI</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} gutterBottom>{this.state.titular.dni}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} variant="h6" gutterBottom>Direccion</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} gutterBottom>{this.state.titular.direccion}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} variant="h6" gutterBottom>Email</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography className={classes.typography} gutterBottom>{this.state.titular.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography className={classes.typography} variant="h6" gutterBottom>Alumnos</Typography>
                                    </Grid>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Alumno</TableCell>
                                                <TableCell className={classes.tableCell}>Servicios asociados</TableCell>
                                                <TableCell className={classes.tableCell}></TableCell>
                                                <TableCell className={classes.tableCell}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.titular.inscripciones.map((inscripcion, index) => (
                                                <TableRow key={inscripcion.id}>
                                                    <TableCell className={classes.tableCell}>{inscripcion.alumno.nombre} {inscripcion.alumno.apellido}</TableCell>
                                                    <TableCell className={classes.tableCell}>{inscripcion.servicios.map(servicio => servicio.nombre).join(",")}</TableCell>
                                                    <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" onClickCapture={() => this.setState({
                                                        inscripcionSeleccionada:
                                                            { ...inscripcion, idTitular: this.state.titular.dni }, serviciosModalVisible: true
                                                    })}>
                                                        Modificar<Edit />
                                                    </Button></TableCell>
                                                    <TableCell className={classes.tableCell}><Button variant="contained" color="secondary" className="button" onClickCapture={() => this.setState({ alertaVisible: true, inscripcionSeleccionada: inscripcion })}>
                                                        Eliminar<DeleteIcon />
                                                    </Button></TableCell>
                                                </TableRow>))}
                                        </TableBody>
                                    </Table>
                                    <Grid item xs={12}>
                                        <Typography className={classes.typography} variant="h6" gutterBottom>Facturas</Typography>
                                    </Grid>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.tableCell}>Fecha</TableCell>
                                                <TableCell className={classes.tableCell}>Detalle</TableCell>
                                                <TableCell className={classes.tableCell}>Monto facturado</TableCell>
                                                <TableCell className={classes.tableCell}>Monto pagado</TableCell>
                                                <TableCell className={classes.tableCell}>Estado</TableCell>
                                                <TableCell className={classes.tableCell}></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.titular.facturas.map(factura => (
                                                <TableRow key={factura.id}>
                                                    <TableCell className={classes.tableCell}>{factura.fechaVencimiento}</TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        {factura.detalle.split("/n").map(function (item, key) {
                                                            return (
                                                                <Typography key={key}>
                                                                    {item}
                                                                    <br />
                                                                </Typography>
                                                            )
                                                        })}</TableCell>
                                                    <TableCell className={classes.tableCell}>{factura.monto}</TableCell>
                                                    <TableCell className={classes.tableCell}>{factura.montoPagado}</TableCell>
                                                    <TableCell className={classes.tableCell}>{factura.estado}</TableCell>
                                                    <TableCell className={classes.tableCell}>
                                                        <Button variant="contained" color="secondary" className="button" onClickCapture={() => this.setState({ cobroModalVisible: true, idFactura: factura.idFactura })}>
                                                            Registrar pago<Edit />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>))}
                                        </TableBody>
                                    </Table>
                                </Grid >
                            )}
                    </Paper>
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Titular)
