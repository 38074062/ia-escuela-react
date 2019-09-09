import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountcircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import { servicioAutenticacion } from '../servicios';
import { Formik, Form } from 'formik';
import { CircularProgress, Grid, Button } from '@material-ui/core';
import { FormikTextField } from 'formik-material-fields';
import * as Yup from 'yup';

let styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
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

const LoginSchema = Yup.object().shape({
    nombreUsuario: Yup.string()
        .required('Ingrese el nombre de usuario'),
    contrasenia: Yup.string()
        .required('Ingrese la contraseña'),
});

class Login extends Component {
    constructor(props) {
        super(props);
        if (servicioAutenticacion.valorUsuarioActual) {
            this.props.history.push('/');
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <AccountcircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar sesión
            </Typography>
                    <Formik
                        initialValues={{
                            nombreUsuario: '',
                            contrasenia: ''
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={({ nombreUsuario, contrasenia }, { setStatus, setSubmitting }) => {
                            setStatus();
                            servicioAutenticacion.iniciarSesion(nombreUsuario, contrasenia)
                                .then(
                                    usuario => {
                                        const { from } = this.props.location.state || { from: { pathname: "/" } };
                                        this.props.history.push(from);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                        }}
                        render={({ isSubmitting }) => (
                            <Form className={classes.form}>
                                <Grid item xs={12}>
                                    <FormikTextField name="nombreUsuario" label="Usuario" type="email" margin="normal" fullWidth />
                                    <FormikTextField name="contrasenia" label="Contraseña" type="password" margin="normal" fullWidth />
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
                                        Iniciar sesión              </Button>
                                    {isSubmitting &&
                                        <CircularProgress align="center" />
                                    }
                                </Grid>
                            </Form>)}
                    />
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Login)