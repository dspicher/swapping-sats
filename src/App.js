import React from 'react';
import TransactionOutputs from './TransactionOutputs';
import TransactionInput from './TransactionInput';
import TransactionRBF from './TransactionRBF';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { fetchTransaction } from './util/blockstream';
import { transactionIsNotRBF } from './util/recursiveRBFChecker';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputs: null,
      rbf: null
    };
  }

  handleTxidChange(txid) {
    fetchTransaction(txid)
      .then(res => res.vout)
      .then(result => result.map((obj) => {
        return {
          value: obj.value,
          addresses: obj.scriptpubkey_address,
          script_type: obj.script_type,
        }
      })).then((outs) => this.setState({
        outputs: outs
      }));

    transactionIsNotRBF(txid).then(
      res => this.setState({ rbf: res })
    );
  }

  render() {
    return (
      <div className="App">

        <ThemeProvider>
          <Card className="main-card">
            <CardContent>
              <TransactionInput onTxidChange={(txid) => this.handleTxidChange(txid)} />
              <TransactionRBF rbf={this.state.rbf} />
              <TransactionOutputs outputs={this.state.outputs} />
            </CardContent>
          </Card>
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
