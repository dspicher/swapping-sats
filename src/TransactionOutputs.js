import React from 'react';
import BityFiatAmount from './BityFiatAmount';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

class TransactionOutputs extends React.Component {
    render() {
        return (
            <div className="TransactionOutputs">
                {this.props.outputs != null ?
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>Adress</TableCell>
                                <TableCell>Satoshis</TableCell>
                                <TableCell>Bity buy</TableCell>
                                <TableCell>Bity sell</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.outputs.map((output, key) => (
                                <TableRow key={key}>
                                    <TableCell>{output.addresses}</TableCell>
                                    <TableCell>{output.value}</TableCell>
                                    <TableCell><BityFiatAmount isOutput={false} amount={output.value} /></TableCell>
                                    <TableCell><BityFiatAmount isOutput={true} amount={output.value} /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> :
                    <p>Enter a valid TXID</p>
                }
            </div>
        );
    }
}

TransactionOutputs.propTypes = {
    outputs: PropTypes.array
};

export default TransactionOutputs;
