import { fetchTransaction } from './blockcypher';
import {recursivePropertyChecker} from './recursivePropertyChecker';

function isConfirmed(tx) {
    return tx["block_height"] > 0;
}

function signalsRBF(input) {
    return input["sequence"] < 2 ** 32 - 2;
}

function txSignalsRBF(tx) {
    return tx["inputs"].map(signalsRBF).some(a=>a);
}

function getAncestorTransactions(tx) {
    return Promise.all(tx["inputs"].map((input) => fetchTransaction(input["prev_hash"])));
}

async function transactionIsNotRBF(txid) {
    let predicates = {stop: isConfirmed, fail: txSignalsRBF}
    let initial = await fetchTransaction(txid);
    return await recursivePropertyChecker(initial, getAncestorTransactions, predicates);        
}



 
export {
    transactionIsNotRBF,
    txSignalsRBF
}