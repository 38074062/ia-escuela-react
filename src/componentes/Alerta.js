import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class Alerta extends React.Component {
    render = () => (
        <div>
            <Dialog
                open={this.props.visible}
                onClose={() => this.props.onClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.titulo}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.descripcion}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.onClose()} color="primary">
                        Cancelar
          </Button>
                    <Button onClick={() => this.props.onClose(true)} color="primary" autoFocus>
                        Aceptar
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}