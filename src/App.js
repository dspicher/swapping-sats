import React from 'react';
import TransactionOutputs from './TransactionOutputs';
import TransactionInput from './TransactionInput';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import './App.css';
import { fetchTransaction } from './util/blockcypher';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outputs: null
    };
  }

  handleTxidChange(txid) {
    fetchTransaction(txid)
      .then(res => res.outputs)
      .then(result => result.map((obj) => {
        return {
          value: obj.value,
          addresses: obj.addresses,
          script_type: obj.script_type,
        }
      })).then((outs) => this.setState({ outputs: outs }));
  }

  render() {
    return (
      <div className="App">
        <ThemeProvider>
          <TransactionInput onTxidChange={(txid) => this.handleTxidChange(txid)} />
          <TransactionOutputs outputs={this.state.outputs} />
        </ThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
