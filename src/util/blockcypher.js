
async function fetchTransaction(txid) {
    let token = 'e587cf89b1774385838ef21b1373f455';
    let apiUrl = 'https://api.blockcypher.com/v1/btc/main/';
    let txEndpoint = 'txs/';
    let tx = await fetch(apiUrl + txEndpoint + txid + '?token=' + token);
    return tx.json();
  }


  export {
      fetchTransaction
  }