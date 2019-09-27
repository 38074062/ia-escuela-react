import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik';
import { CircularProgress, Grid, Button } from '@material-ui/core';
import { FormikTextField, FormikSelectField } from 'formik-material-fields';
import * as Yup from 'yup';
import { servicioEmpleados } from '../../servicios/empleados.servicio';

let styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

const AltaEmpleadoSchema = Yup.object().shape({
    nombre: Yup.string()
        .required('Ingrese el nombre'),
    apellido: Yup.string()
        .required('Ingrese el apellido'),
    nombreUsuario: Yup.string().email()
        .required('Ingrese el mail'),
    cuit: Yup.string()
        .required('Ingrese el cuit'),
    cargo: Yup.number()
        .required('Seleccione el cargo'),
    dni: Yup.number().min(6)
        .required('Ingrese el dni'),
});

class AltaEmpleado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cargos: []
        }
    }

    componentDidMount() {
        servicioEmpleados.listarCargos().then(cargos => {
            let opcionesCargos = this.convertirCargos(cargos);
            this.setState({ cargos: opcionesCargos });
        });

    }

    convertirCargos = (cargos) => {
        let cargosConvertidos = [];
        cargos.forEach(cargo => {
            cargosConvertidos.push({
                label: cargo.nombre,
                value: cargo.codigo
            });
        });
        return cargosConvertidos;
    }

    onSubmit = (datos, actions) => {
        var mostrarMensaje = this.props.mostrarMensaje;
        var navegacion = this.props.history;
        if (this.props.location && this.props.location.state && this.props.location.state.empleado) {
            datos.id = this.props.location.state.empleado.id;
            servicioEmpleados.modificarEmpleado(datos)
                .then(
                    (respuesta) => {
                        mostrarMensaje(respuesta);
                        navegacion.push("/empleados");
                    },
                    (error) => {
                        mostrarMensaje(error);
                        actions.setSubmitting(false);
                        actions.setErrors({ "dni": error });
                    }
                );
        } else {
            servicioEmpleados.altaEmpleado(datos)
                .then(
                    (respuesta) => {
                        mostrarMensaje(respuesta);
                        navegacion.push("/empleados");
                    },
                    (error) => {
                        mostrarMensaje(error);
                        actions.setSubmitting(false);
                        actions.setErrors({ "dni": error });
                    }
                );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Nuevo empleado
            </Typography>
                    <Formik
                        initialValues={{
                            nombre: (this.props.location.state && this.props.location.state.empleado && this.props.location.state.empleado.nombre) || "",
                            apellido: (this.props.location.state && this.props.location.state.empleado && this.props.location.state.empleado.apellido) || "",
                            nombreUsuario: (this.props.location.state && this.props.location.state.empleado && this.props.location.state.empleado.nombreUsuario) || "",
                            cuit: (this.props.location.state && this.props.location.state.empleado && this.props.location.state.empleado.cuit) || "",
                            dni: (this.props.location.state && this.props.location.state.empleado && this.props.location.state.empleado.dni) || "",
                            cargo: (this.props.location.state && this.props.location.state.empleado && this.props.location.state.empleado.cargo) || 0
                        }}
                        validationSchema={AltaEmpleadoSchema}
                        onSubmit={this.onSubmit.bind(this)}
                        render={({ values, isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <FormikTextField name="dni" label="DNI" type="number" margin="normal" fullWidth />
                                    <FormikTextField name="nombre" label="Nombre" margin="normal" fullWidth />
                                    <FormikTextField name="apellido" label="Apellido" margin="normal" fullWidth />
                                    <FormikTextField name="nombreUsuario" label="Mail" margin="normal" fullWidth />
                                    <FormikTextField name="cuit" label="CUIT" margin="normal" fullWidth />
                                    <FormikSelectField name="cargo" label="Cargo" margin="normal" options={this.state.cargos} fullWidth />
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
                                    >
                                        Guardar              </Button>
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

export default withStyles(styles)(AltaEmpleado)