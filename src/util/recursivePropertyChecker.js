async function recursivePropertyChecker(currentElement, getNextElements, predicates) {
    if (predicates.stop(currentElement)) {
        return { holds: true }
    } else if (predicates.fail(currentElement)) {
        return {
            holds: false,
            counterExample: [currentElement]
        }
    } else {
        let nextElements = await getNextElements(currentElement);
        if (nextElements == null || nextElements.length === 0) {
            return { holds: true };
        }
        let resultsForNext = await Promise.all(nextElements
            .map(async (el) => await recursivePropertyChecker(el, getNextElements, predicates)));
        if (resultsForNext.map(el => el.holds).every(a => a)) {
            return { holds: true };
        } else {
            let idx = resultsForNext.findIndex(el => !el.holds);
            return {
                holds: false,
                counterExample: [currentElement].concat(resultsForNext[idx].counterExample)
            };
        }
    }
}

module.exports = {
    recursivePropertyChecker: recursivePropertyChecker
}