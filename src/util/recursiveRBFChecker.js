var blockstream = require('./blockstream.js');
var recursivePropertyChecker = require('./recursivePropertyChecker');

function isConfirmed(tx) {
    return tx["status"]["confirmed"];
}

function signalsRBF(input) {
    return input["sequence"] < 2 ** 32 - 2;
}

function txSignalsRBF(tx) {
    return tx["vin"].map(signalsRBF).some(a => a);
}

function getAncestorTransactions(tx) {
    return Promise.all(tx["vin"].map((input) => blockstream.fetchTransaction(input["txid"])));
}

async function transactionIsNotRBF(txid) {
    let predicates = { stop: isConfirmed, fail: txSignalsRBF }
    let initial = await blockstream.fetchTransaction(txid);
    return await recursivePropertyChecker.recursivePropertyChecker(initial, getAncestorTransactions, predicates);
}

module.exports = {
    transactionIsNotRBF: transactionIsNotRBF
}
