import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { Formik, Form } from 'formik';
import FormikTextField from 'formik-material-fields/lib/FormikTextField';
import { servicioEmpleados } from '../../../servicios/empleados.servicio';
import * as Yup from 'yup';

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

const CargaHorariaSchema = Yup.object().shape({
    haber: Yup.string()
        .required('Ingrese el haber'),
    precio: Yup.number()
        .required('Ingrese el precio'),
    descuento: Yup.number()
        .required('Ingrese el descuento'),
    horario: Yup.string()
        .required('Ingrese el horario'),
    horas: Yup.number()
        .required('Ingrese las horas')
});

class CargaHorariaModal extends React.Component {
    onSubmit = (datos, actions) => {
        var mostrarMensaje = this.props.mostrarMensaje;
        var cerrarModal = this.props.cerrarModal;
        servicioEmpleados.agregarCargaHoraria(datos)
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
                        Carga horaria    </Typography>
                    <Formik
                        initialValues={{
                            idEmpleado: this.props.id,
                            haber: "",
                            precio: 0,
                            descuento: 0,
                            horario: "",
                            horas: 0
                        }}
                        validationSchema={CargaHorariaSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        render={({ values, isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <FormikTextField name="haber" label="Haber" margin="normal" fullWidth />
                                    <FormikTextField name="precio" label="Precio" type="number" margin="normal" fullWidth />
                                    <FormikTextField name="descuento" label="Descuento" type="number" margin="normal" fullWidth />
                                    <FormikTextField name="horario" label="Horario" margin="normal" fullWidth />
                                    <FormikTextField name="horas" label="Horas" type="number" margin="normal" fullWidth />
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

export default withStyles(styles)(CargaHorariaModal)