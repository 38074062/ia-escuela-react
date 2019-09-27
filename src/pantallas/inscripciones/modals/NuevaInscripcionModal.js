import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { FormikSelectField, FormikTextField } from 'formik-material-fields';
import * as Yup from 'yup';
import { servicioServicios } from '../../../servicios/servicios.servicio';
import { servicioInscripciones } from '../../../servicios/inscripciones.servicio';

let styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
        textAlign: 'center',
    },
    paper: {
        maxWidth: '60%',
        width: 500,
        textAlign: 'center',
        margin: `${theme.spacing.unit}px auto`,
        padding: theme.spacing(4),
        color: theme.palette.text.secondary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) !important',
        backgroundColor: "white"
    },
    typography: {
        color: 'black',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        backgroundColor: "white"
    },
});

const NuevaInscripcionSchema = Yup.object().shape({
    idTitular: Yup.number()
        .required('Ingrese el dni del titular'),
    alumno: Yup.object().shape({
        nombre: Yup.string().required('Ingrese el nombre del alumno'),
        apellido: Yup.string().required('Ingrese el apellido del alumno'),
        dni: Yup.number().required('Ingrese el dni del alumno'),
    }),
    idServicios: Yup.array()
        .required('Seleccione al menos un servicio')
});

class NuevaInscripcionModal extends React.Component {
    state = {
        servicios: [],
        inscripcion: {
            idTitular: 0,
            alumno: {
                nombre: "",
                apellido: "",
                dni: 0
            },
            idServicios: [],
            servicios: []
        }
    }

    componentDidMount() {
        if (this.props.inscripcion) {
            this.setState({ inscripcion: this.props.inscripcion });
        }
        let serviciosConvertidos = [];
        servicioServicios.getServicios().then(servicios => {
            servicios.forEach(servicio => {
                let servicioObj = {};
                servicioObj.label = servicio.categoria + "-" + servicio.nombre + "-" + servicio.tipo + "-" + servicio.precio;
                servicioObj.value = servicio.id;
                serviciosConvertidos.push(servicioObj);
            });
            this.setState({ servicios: serviciosConvertidos });
        });
    }

    onSubmit = (datos, actions) => {
        var mostrarMensaje = this.props.mostrarMensaje;
        var cerrarModal = this.props.cerrarModal;
        if (this.props.inscripcion) {
            servicioInscripciones.modificarInscripcion({ id: this.props.inscripcion.id, idServicios: datos.idServicios })
                .then(
                    (respuesta) => {
                        mostrarMensaje(respuesta);
                        actions.setSubmitting(false);
                        cerrarModal();
                    },
                    (error) => {
                        mostrarMensaje(error);
                        actions.setSubmitting(false);
                    }
                );
        } else {
            servicioInscripciones.nuevaInscripcion(datos)
                .then(
                    (respuesta) => {
                        mostrarMensaje(respuesta);
                        actions.setSubmitting(false);
                        cerrarModal();
                    },
                    (error) => {
                        mostrarMensaje(error);
                        actions.setSubmitting(false);
                    }
                );
        }
    }

    render = () => {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Nueva inscripción</Typography>
                    <Formik
                        initialValues={{
                            idTitular: (this.props.inscripcion && this.props.inscripcion.dniTitular) || 0,
                            alumno: {
                                nombre: (this.props.inscripcion && this.props.inscripcion.alumno.nombre) || "",
                                apellido: (this.props.inscripcion && this.props.inscripcion.alumno.apellido) || "",
                                dni: (this.props.inscripcion && this.props.inscripcion.alumno.dni) || 0
                            },
                            idServicios: (this.props.inscripcion && this.props.inscripcion.servicios.map(s => s.id)) || []
                        }}
                        validationSchema={NuevaInscripcionSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        render={({ isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <FormikTextField name="idTitular" label="DNI titular" type="number" margin="normal" fullWidth disabled={this.props.inscripcion}/>
                                    <FormikTextField name="alumno.nombre" label="Nombre del alumno" margin="normal" fullWidth disabled={this.props.inscripcion}/>
                                    <FormikTextField name="alumno.apellido" label="Apellido del alumno" margin="normal" fullWidth disabled={this.props.inscripcion}/>
                                    <FormikTextField name="alumno.dni" label="DNI del alumno" margin="normal" type="number" fullWidth disabled={this.props.inscripcion}/>
                                    <FormikSelectField name="idServicios" multiple label="Servicios" margin="normal" fullWidth options={this.state.servicios} />
                                </Grid>
                                <Grid container
                                    alignItems="center"
                                    justify="center">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        disabled={isSubmitting}
                                    > Guardar</Button>
                                    {isSubmitting &&
                                        <CircularProgress align="center" />
                                    }
                                </Grid>
                            </Form>)}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(NuevaInscripcionModal)