import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { FormikTextField } from 'formik-material-fields';
import * as Yup from 'yup';
import { servicioTitulares } from '../../../servicios/titulares.servicio';

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

const NuevoTitularSchema = Yup.object().shape({
    dni: Yup.number()
        .required('Ingrese el dni del titular'),
    nombre: Yup.string().required('Ingrese el nombre del titular'),
    apellido: Yup.string().required('Ingrese el apellido del titular'),
    direccion: Yup.string().required('Ingrese la dirección del titular'),
    email: Yup.string().required('Ingrese el mail del titular'),
    cuentaBancaria: Yup.string()
        .required('Ingrese la cuenta bancaria')
});

class NuevoTitularModal extends React.Component {
    onSubmit = (datos, actions) => {
        var mostrarMensaje = this.props.mostrarMensaje;
        var cerrarModal = this.props.cerrarModal;
        servicioTitulares.nuevoTitular(datos)
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

    render = () => {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Nuevo titular</Typography>
                    <Formik
                        initialValues={{
                            nombre: "",
                            apellido: "",
                            dni: 0,
                            direccion: "",
                            email: "",
                            cuentaBancaria: "",
                        }}
                        validationSchema={NuevoTitularSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        render={({ isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <FormikTextField name="dni" label="DNI" type="number" margin="normal" fullWidth />
                                    <FormikTextField name="nombre" label="Nombre" margin="normal" fullWidth />
                                    <FormikTextField name="apellido" label="Apellido" margin="normal" fullWidth />
                                    <FormikTextField name="direccion" label="Direccion" margin="normal" fullWidth />
                                    <FormikTextField name="email" label="Email" margin="normal" type="email" fullWidth />
                                    <FormikTextField name="cuentaBancaria" label="Cuenta bancaria" margin="normal" fullWidth />
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

export default withStyles(styles)(NuevoTitularModal)