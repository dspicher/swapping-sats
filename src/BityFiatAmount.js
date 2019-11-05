import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class BityFiatAmount extends React.Component {

    async postEstimate(cryptoAmount, isInput) {
        let estimateEndpoint = "https://exchange.api.bity.com/v2/orders/estimate";
        let crypto = {"currency":"BTC", "amount": (cryptoAmount/10e7).toString()};
        let fiat = {"currency": "CHF"};
        let payload, out_field;
        if (isInput) {
            payload = {"input":crypto, "output": fiat};
            out_field = "output";
        } else {
            payload = {"input":fiat, "output": crypto};
            out_field = "input";
        }
        let response = await this.postData(estimateEndpoint, payload);
        return response[out_field]["amount"];
    }

    async postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },  
        body: JSON.stringify(data) 
    });
    return await response.json(); 
    }


    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            amount: null,
            error: null
        };

    }

    componentDidMount() {
        this.postEstimate(this.props.amount, this.props.isOutput).then((result)=>this.setState({amount:result, isLoaded: true}));
    }

    render() {
        return (
            <div className="BityFiatAmount">
                {this.state.isLoaded ?
                     this.state.amount   :
                     <CircularProgress size={20}/>
                }
            </div>
        );
    }
}