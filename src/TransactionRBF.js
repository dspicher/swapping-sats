import React from 'react';
import PropTypes from 'prop-types';

class TransactionInput extends React.Component {
    render() {
        return (
            <div className="TransactionInput">
                {this.props.rbf != null ?
                    (this.props.rbf.holds ?
                        <p>not rbf</p> :
                        (this.props.rbf.counterExample.length === 1 ?
                            <p>This transaction directly signals RBF</p> :
                            <div>
                                <p>The following unconfirmed ancestor transaction signals RBF</p>
                                <p>{this.props.rbf.counterExample[this.props.rbf.counterExample.length - 1].txid}</p>
                            </div>
                        )
                    ) :
                    <p></p>}
            </div>
        );
    }
}

TransactionInput.propTypes = {
    rbf: PropTypes.object
};

export default TransactionInput;
