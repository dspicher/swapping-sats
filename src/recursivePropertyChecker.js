class PropertyViolation extends Error {
    constructor(message, line) {
        super(message);
        this.line = line;
    }
}

function recursivePropertyChecker(currentElement, previousElements, getNextElements, predicates) {
    if (predicates.stop(currentElement)) {
        return;
    } else if (predicates.fail(currentElement)) {
        throw new PropertyViolation("property violated", previousElements + [currentElement])
    } else {
        let nextElements = getNextElements(currentElement);
        previousElements.push(currentElement)
        nextElements.map((el)=>recursivePropertyChecker(el, previousElements, getNextElements, predicates))
        return;
    }
}

export {recursivePropertyChecker, PropertyViolation};