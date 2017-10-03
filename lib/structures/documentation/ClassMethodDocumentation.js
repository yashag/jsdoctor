/**
 * The method parsed representation
 * @typedef {Object} ClassMethodDocumentationExplanation
 * @property {Object} value
 * @property {Parameter[]} value.params - The method's parameters
 * @property {FunctionBody} value.body
 */

const FunctionDocumentation = require('./abstractions/FunctionDocumentation');

/**
 * A ClassMethodDocumentation implementation
 * @extends FunctionDocumentation
 */
class ClassMethodDocumentation extends FunctionDocumentation {

    /**
     * Creates a ClassMethodDocumentation
     * @constructor
     * @param {ClassMethodDocumentationExplanation} explanation
     */
    constructor(explanation) {
        super();
        this.docClassMethod(explanation);
    }

    /**
     * @param {ClassMethodDocumentationExplanation} explanation
     */
    docClassMethod(explanation) {
        this.descriptors = {
            param: this.documentParameters(explanation.value.params),
            returns: this.documentReturns(explanation.value.body.body),
            throws: this.documentThrows(explanation.value.body.body)
        };
    }

}

module.exports = ClassMethodDocumentation;