/**
 * The getter parsed representation
 * @typedef {Object} GetterDocumentationExplanation
 * @property {Object} value
 * @property {FunctionBody} value.body - The body of the getter
 * @property {Object} key
 * @property {string} name - The name of the property
 */

const PropertyDocumentation = require('./abstractions/PropertyDocumentation');

/**
 * A GetterDocumentation implementation
 * @extends PropertyDocumentation
 */
class GetterDocumentation extends PropertyDocumentation {

    /**
     * Creates a GetterDocumentation
     * @constructor
     * @param {GetterDocumentationExplanation} explanation
     */
    constructor(explanation) {
        super();
        this.docGetter(explanation);
    }

    /**
     * @param {GetterDocumentationExplanation} explanation
     */
    docGetter(explanation) {
        this.descriptors = {
            description: this.documentDescription(explanation.key.name),
            type: this.documentGetType(explanation.value.body.body)
        };
    }

    /**
     * @param {string} propertyName
     * @returns {string}
     */
    documentDescription(propertyName) {
        return `Get the value of the ${propertyName} property`;
    }

}

module.exports = GetterDocumentation;