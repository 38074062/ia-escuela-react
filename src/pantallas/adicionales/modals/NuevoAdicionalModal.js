import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Button, Grid, CssBaseline, CircularProgress } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { FormikTextField, FormikSelectField } from 'formik-material-fields';
import * as Yup from 'yup';
import { servicioServicios } from '../../../servicios/servicios.servicio';

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

const NuevoAdicionalSchema = Yup.object().shape({
    categoria: Yup.string()
        .required('Seleccione la categoria'),
    nombre: Yup.string()
        .required('Ingrese el nombre'),
    tipo: Yup.string()
        .required('Ingrese el tipo'),
    precio: Yup.number()
        .required('Ingrese el precio'),
});

class NuevoAdicionalModal extends React.Component {
    state = {
        categorias: []
    }

    componentDidMount() {
        let configuraciones = [];
        servicioServicios.getConfiguracion().then(respuesta => {
            respuesta.map(item => {
                let configuracion = {};
                configuracion.label = item;
                configuracion.value = item;
                configuraciones.push(configuracion);
            });
            this.setState({ categorias: configuraciones });
        })
    }

    onSubmit = (datos, actions) => {
        var mostrarMensaje = this.props.mostrarMensaje;
        var cerrarModal = this.props.cerrarModal;
        servicioServicios.nuevoServicio(datos)
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
                        Nuevo servicio</Typography>
                    <Formik
                        initialValues={{
                            categoria: "",
                            nombre: "",
                            tipo: "",
                            precio: 0
                        }}
                        validationSchema={NuevoAdicionalSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        render={({ values, isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <FormikSelectField name="categoria" label="Categoria" margin="normal" fullWidth options={this.state.categorias} />
                                    <FormikTextField name="nombre" label="Nombre" margin="normal" fullWidth />
                                    <FormikTextField name="tipo" label="Tipo" margin="normal" fullWidth />
                                    <FormikTextField name="precio" label="Precio" type="number" margin="normal" fullWidth />
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

export default withStyles(styles)(NuevoAdicionalModal)