import { fetchTransaction } from './util/blockcypher';
import {recursivePropertyChecker} from './recursivePropertyChecker';

function isConfirmed(tx) {
    return tx["block_height"] > 0;
}

function signalsRBF(input) {
    return input["sequence"] < 2 ** 32 - 2;
}

function txSignalsRBF(tx) {
    tx["inputs"].map(signalsRBF).some(a=>a);
}

function getAncestorTransactions(tx) {
    return tx["inputs"].map((input) => input["prev_hash"]);
}

async function transactionIsRBF(txid) {
    let predicates = {stop: isConfirmed, fail: txSignalsRBF}
    return await recursivePropertyChecker(txid, getAncestorTransactions, predicates);
        
}



 
export {
    isConfirmed,
    signalsRBF
}