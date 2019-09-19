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
import NuevoAdicionalModal from './modals/NuevoAdicionalModal';
import { servicioServicios } from '../../servicios/servicios.servicio';
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

class Adicionales extends React.Component {
    constructor(props) {
        super();
        this.state = {
            adicionales: [], cargando: true, message: "", pagina: 0,
            filasPorPagina: 6, filas: [], modalNuevoAdicionalVisible: false, adicional: null
        };
        this.props = props;
    }
    componentDidMount = () => {
        servicioServicios.getServicios().then(
            (respuesta) => {
                this.setState({ adicionales: respuesta, cargando: false });
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

    render = () => {
        let { classes } = this.props;
        let { filas, filasPorPagina, pagina } = this.state;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.typography} variant="h5">Servicios</Typography>
                        <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={()=>this.setState({ modalNuevoAdicionalVisible: true })}>
                            <AddIcon className={classes.extendedIcon} />
                            Nuevo servicio</Fab>
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.modalNuevoAdicionalVisible}
                            onClose={() => this.setState({ modalNuevoAdicionalVisible: false })}
                        ><NuevoAdicionalModal cerrarModal={() => this.setState({ modalNuevoAdicionalVisible: false })} mostrarMensaje={this.props.mostrarMensaje} /></Modal>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Nombre</TableCell>
                                    <TableCell className={classes.tableCell}>Tipo</TableCell>
                                    <TableCell className={classes.tableCell}>Precio</TableCell>
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
                                    this.state.adicionales.slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina).map((adicional, index) => (
                                        <TableRow key={adicional.id}>
                                            <TableCell className={classes.tableCell}>{adicional.nombre}</TableCell>
                                            <TableCell className={classes.tableCell}>{adicional.tipo}</TableCell>
                                            <TableCell className={classes.tableCell}>{adicional.precio}</TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="secondary" className="button">
                                                Eliminar<DeleteIcon />
                                            </Button></TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" >
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

export default withStyles(styles)(Adicionales)