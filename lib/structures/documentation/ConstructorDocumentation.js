/**
 * The method parsed representation
 * @typedef {Object} ConstructorDocumentationExplanation
 * @property {Object} value
 * @property {Parameter[]} value.params - The method's parameters
 */

const FunctionDocumentation = require('./abstractions/FunctionDocumentation');

/**
 * A ConstructorDocumentation implementation
 * @extends FunctionDocumentation
 */
class ConstructorDocumentation extends FunctionDocumentation {

    /**
     * Creates a ConstructorDocumentation
     * @constructor
     * @param {ConstructorDocumentationExplanation} explanation
     * @param {string} className - The name of the class
     */
    constructor(explanation, className) {
        super();
        this.docConstructor(explanation, className);
    }

    /**
     * @param {ConstructorDocumentationExplanation} explanation
     * @param {string} className - The name of the class
     */
    docConstructor(explanation, className) {
        this.descriptors = {
            description: this.documentDescription(className),
            constructor: this.documentConstructor(),
            param: this.documentParameters(explanation.value.params)
        };
    }

    /**
     * @param {string} className - The name of the class
     * @returns {string}
     */
    documentDescription (className) {
        return `Creates a ${className}`;
    }

    /**
     * @returns {string}
     */
    documentConstructor() {
        return this.doctionary.documentConstructor();
    }

}

module.exports = ConstructorDocumentation;