import React from 'react';
import PropTypes from 'prop-types';

class TransactionInput extends React.Component {

    render() {
        return (
            <div className="TransactionInput">
                {this.props.rbf != null ? (this.props.rbf.holds ? <p>not rbf</p> : <p>rbf</p>) : <p></p>}
            </div>
        );
    }
}

TransactionInput.propTypes = {
    rbf: PropTypes.object
};

export default TransactionInput;
