import React from 'react';
import BityFiatAmount from './BityFiatAmount';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class TransactionOutputs extends React.Component {

    async fetchTransaction(txid) {
        let token = 'e587cf89b1774385838ef21b1373f455';
        let apiUrl = 'https://api.blockcypher.com/v1/btc/main/';
        let txEndpoint = 'txs/';
        return await fetch(apiUrl + txEndpoint + txid + '?token=' + token);
    }

    assignOutputs(txPromise) {
        txPromise
        .then(res => res.json())
        .then(res => res.outputs)
        .then(result => result.map((obj)=>{return {value: obj.value, 
                                                   addresses: obj.addresses, 
                                                   script_type: obj.script_type,
                                                    }}))
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    outputs: result
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    

    initOutputs() {
        this.assignOutputs(this.fetchTransaction(this.props.txid));
    }

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            outputs: [],
            error: null
        };

    }

    componentDidMount() {
        this.initOutputs();
    }


    render() {
        return (
            <div className="TransactionOutputs">
                {this.state.isLoaded ?
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
                                            {this.state.outputs.map((output, key) => (
                                            <TableRow key={key}>
                                                <TableCell>{output.addresses}</TableCell>
                                                <TableCell align="right">{output.value}</TableCell>
                                                <TableCell align="right"><BityFiatAmount isOutput={false} amount={output.value}/></TableCell>
                                                <TableCell align="right"><BityFiatAmount isOutput={true} amount={output.value}/></TableCell>
                                            </TableRow>
                                            ))}
                                        </TableBody>
                                        </Table> : 
                    <p>Loading</p>
                }
            </div>
        );
    }
}

export default TransactionOutputs;
