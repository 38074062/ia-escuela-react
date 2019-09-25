import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { servicioFacturacion } from '../../servicios/facturacion.servicio';
import MUIDataTable from "mui-datatables";

const columnas = [
    {
        name: "fecha",
        label: "Fecha",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "titular",
        label: "Titular",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "vencimiento",
        label: "Fecha de vencimiento",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "total",
        label: "Monto",
        options: {
            filter: true,
            sort: false,
        }
    },
];

const opciones = {
    textLabels: {
      body: {
        noMatch: "Sorry, no matching records found",
        toolTip: "Sort",
        columnHeaderTooltip: column => `Sort for ${column.label}`
      },
      pagination: {
        next: "Next Page",
        previous: "Previous Page",
        rowsPerPage: "Rows per page:",
        displayRows: "of",
      },
      toolbar: {
        search: "Search",
        downloadCsv: "Download CSV",
        print: "Print",
        viewColumns: "View Columns",
        filterTable: "Filter Table",
      },
      filter: {
        all: "Todos",
        title: "Filtros",
        reset: "Reestablecer",
      },
      viewColumns: {
        title: "Show Columns",
        titleAria: "Show/Hide Table Columns",
      },
      selectedRows: {
        text: "row(s) selected",
        delete: "Delete",
        deleteAria: "Delete Selected Rows",
      },
    }
  }

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

    render = () => {
        let { classes } = this.props;
        return (
            <React.Fragment>
                <Grid item xs={12}>
                    <Fab variant="extended" color="primary" aria-label="Add" className={classes.addFab} onClickCapture={() => servicioFacturacion.generarFacturas()}>
                        <AddIcon className={classes.extendedIcon} />
                        Generar facturas</Fab>
                    <MUIDataTable
                        title={"Facturas"}
                        data={this.state.facturas}
                        columns={columnas}
                        options={opciones}
                    />
                </Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Facturas)