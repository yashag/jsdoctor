/**
 * The method parsed representation
 * @typedef {Object} MethodDocumentationExplanation
 * @property {Object} value
 * @property {Parameter[]} value.params - The method's parameters
 * @property {FunctionBody} value.body
 * @property {Object} id
 * @property {Object} id.type - The method type
 * @property {Object} id.name - The method name
 */

const FunctionDocumentation = require('./abstractions/FunctionDocumentation');

/**
 * A MethodDocumentation implementation
 * @extends FunctionDocumentation
 */
class MethodDocumentation extends FunctionDocumentation {

    /**
     * Creates a MethodDocumentation
     * @constructor
     * @param {MethodDocumentationExplanation} explanation
     */
    constructor(explanation) {
        super();
        this.docMethod(explanation);
    }

    /**
     * @param {MethodDocumentationExplanation} explanation
     */
    docMethod(explanation) {
        this.descriptors = {
            param: this.documentParameters(explanation.params),
            returns: this.documentReturns(explanation.body.body),
            throws: this.documentThrows(explanation.body.body)
        };
    }

}

module.exports = MethodDocumentation;