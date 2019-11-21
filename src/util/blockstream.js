const fetch = require('node-fetch');

export async function fetchTransaction(txid) {
  let apiUrl = 'https://blockstream.info/api/';
  let txEndpoint = 'tx/';
  let tx = await fetch(apiUrl + txEndpoint + txid);
  return tx.json();
}