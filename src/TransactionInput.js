import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    textFld: { width: 1000, height: 40 }
});


class TransactionInput extends React.Component {

    isValidTxid(txid) {
        return txid != null && txid.length === 64;
    }

    handleChange(e) {
        if (this.isValidTxid(e.target.value)) {
            this.props.onTxidChange(e.target.value);
        }
    }

    render() {

        return (
            <div className="TransactionInput">
                <Grid
                    container
                    spacing={5}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    <Grid item>
                        <TextField
                            id="outlined-basic"
                            label="TXID"
                            margin="normal"
                            onChange={(e) => this.handleChange(e)}
                            variant="outlined"
                            style={styles.textFld}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

TransactionInput.propTypes = {
    onTxidChange: PropTypes.func
};

export default withStyles(styles)(TransactionInput);
