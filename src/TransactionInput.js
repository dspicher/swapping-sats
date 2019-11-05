import React from 'react';
import TextField from '@material-ui/core/TextField';

class TransactionInput extends React.Component {

    handleChange(e) {
        this.props.onTxidChange(e.target.value);
    }

    render() {
        return (
            <div className="TransactionInput">
            <div>
              <TextField
                id="outlined-basic"
                label="TXID"
                margin="normal"
                onChange={(e) => this.handleChange(e)}
                variant="outlined"
              />
            </div>
                
            </div>
        );
    }
}

export default TransactionInput;
