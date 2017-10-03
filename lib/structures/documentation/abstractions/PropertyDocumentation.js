const FunctionDocumentation = require('./FunctionDocumentation');

/**
 * A PropertyDocumentation implementation, with some function overrides
 * @extends FunctionDocumentation
 * @abstract
 */
class PropertyDocumentation extends FunctionDocumentation {

    /**
     * Creates a FunctionDocumentation
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * @param {FunctionBody} functionBody
     * @returns {string} A string representation of all possible return types
     */
    documentGetType(returnStatement) {
        const returnTypes = this.learnReturnTypes(returnStatement);

        if (!returnTypes || returnTypes.length === 0) return null;
        return this.doctionary.documentType(returnTypes[0]);
    }

    /**
     * @param {Parameter[]} parameters
     * @returns {string[]} An array of string representations of all parameters
     */
    documentSetType (parameters) {
        return this.learnParameters(parameters).map(param => {
            return this.doctionary.documentType(param.parameterType);
        }, this);
    }
}

module.exports = PropertyDocumentation;