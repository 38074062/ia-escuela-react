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

const CobroFacturaSchema = Yup.object().shape({
    monto: Yup.number()
        .required('Ingrese el monto'),
    fecha: Yup.date().required('Ingrese el nombre del titular'),
});

class CobroFacturaModal extends React.Component {
    onSubmit = (datos, actions) => {
        var mostrarMensaje = this.props.mostrarMensaje;
        var cerrarModal = this.props.cerrarModal;
        servicioTitulares.registrarCobro(datos)
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
                        Pago</Typography>
                    <Formik
                        initialValues={{
                            titularId: this.props.titularId,
                            facturaId: this.props.facturaId
                        }}
                        validationSchema={CobroFacturaSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        render={({ isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <FormikTextField name="fecha" label="Fecha" type="date" margin="normal" fullWidth />
                                    <FormikTextField name="monto" label="Monto" type="number" margin="normal" fullWidth />
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
                                    >Registrar pago</Button>
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

export default withStyles(styles)(CobroFacturaModal)