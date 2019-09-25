import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Edit from "@material-ui/icons/Edit";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { servicioFacturacion } from '../../servicios/facturacion.servicio';

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

class Facturas extends React.Component {
    constructor(props) {
        super();
        this.state = {
            facturas: [], cargando: true, message: "", pagina: 0,
            filasPorPagina: 6, filas: [], factura: null
        };
        this.props = props;
    }
    componentDidMount = () => {
        servicioFacturacion.listarFacturas().then(
            (respuesta) => {
                this.setState({ facturas: respuesta, cargando: false });
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
                        <Typography className={classes.typography} variant="h5">Facturas</Typography>
                        <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={() => servicioFacturacion.generarFacturas()}>
                            <AddIcon className={classes.extendedIcon} />
                            Generar facturas</Fab>
                        <Table className={classes.table} size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Fecha facturación</TableCell>
                                    <TableCell className={classes.tableCell}>Titular</TableCell>
                                    <TableCell className={classes.tableCell}>Total</TableCell>
                                    <TableCell className={classes.tableCell}>Fecha de vencimiento</TableCell>
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
                                    this.state.facturas.slice(pagina * filasPorPagina, pagina * filasPorPagina + filasPorPagina).map((factura, index) => (
                                        <TableRow key={factura.id}>
                                            <TableCell className={classes.tableCell}>{factura.fecha}</TableCell>
                                            <TableCell className={classes.tableCell}>{factura.titular}</TableCell>
                                            <TableCell className={classes.tableCell}>${factura.total.toFixed(2)}</TableCell>
                                            <TableCell className={classes.tableCell}>{factura.vencimiento}</TableCell>
                                            <TableCell className={classes.tableCell}><Button variant="contained" color="primary" className="button" >
                                                Ver<Edit />
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

export default withStyles(styles)(Facturas)