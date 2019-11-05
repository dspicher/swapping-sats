import React from 'react';
import TransactionOutputs from './TransactionOutputs';
import TransactionInput from './TransactionInput';
import './App.css';

class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
        txid: null
    };
  }

    handleTxidChange(txid) {
      this.setState({txid: txid});

}

hasValidTxid() {
  return this.state.txid!=null && this.state.txid.length===64;
}
   render() {
  return (
    <div className="App">
      <TransactionInput onTxidChange={(txid)=>this.handleTxidChange(txid)}/>
                {this.hasValidTxid() ?
                     <TransactionOutputs txid={this.state.txid}/>   :
                     <p>Enter txid</p>
                }
      
    </div>
  );
  }
}

export default App;
