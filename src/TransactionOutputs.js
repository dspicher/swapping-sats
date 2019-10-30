import React from 'react';
import Griddle, { plugins } from 'griddle-react';

class TransactionOutputs extends React.Component {

    fetchOutputs() {
        let token = 'e587cf89b1774385838ef21b1373f455';
        let apiUrl = 'https://api.blockcypher.com/v1/btc/main/';
        let txEndpoint = 'txs/';
        fetch(apiUrl + txEndpoint + this.props.txid + '?token=' + token)
            .then(res => res.json())
            .then(res => res.outputs)
            .then(result => result.map((obj)=>{return {value: obj.value, addresses: obj.addresses, script_type: obj.script_type}}))
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

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            outputs: [],
            error: null
        };

    }

    componentDidMount() {
        this.fetchOutputs();
    }


    render() {
        const metaData = [{columnName: "script_type",
                            order: 1},
                            {columnName: "addresses",
                            order: 2},
                            {columnName: "value",
                            order: 3}
    ]
        return (
            <div className="TransactionOutputs">
                {this.state.isLoaded ?
                      <Griddle
                      data={this.state.outputs}
                      enableSettings={false}
                      plugins={[plugins.LocalPlugin]}
                      columnMetadata={metaData}
                      components={{ Filter: () => null, PageDropdown: () => null }}
                      
                    /> :
                    <p>Loading</p>
                }
            </div>
        );
    }
}

export default TransactionOutputs;
