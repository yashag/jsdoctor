/**
 * The setter parsed representation
 * @typedef {Object} SetterDocumentationExplanation
 * @property {Object} value
 * @property {Parameter[]} value.params - The setter's parameters
 * @property {Object} key
 * @property {string} name - The name of the property
 */

const PropertyDocumentation = require('./abstractions/PropertyDocumentation');

/**
 * A SetterDocumentation implementation
 * @extends PropertyDocumentation
 */
class SetterDocumentation extends PropertyDocumentation {

    /**
     * Creates a SetterDocumentation
     * @constructor
     * @param {SetterDocumentationExplanation} explanation
     */
    constructor(explanation) {
        super();
        this.docSetter(explanation);
    }

    /**
     * @param {SetterDocumentationExplanation} explanation
     */
    docSetter(explanation) {
        this.descriptors = {
            description: this.documentDescription(explanation.key.name),
            type: this.documentSetType(explanation.value.params)
        };
    }

    /**
     * @param {string} propertyName
     * @returns {string}
     */
    documentDescription(propertyName) {
        return `Set the value of the ${propertyName} property`;
    }

}

module.exports = SetterDocumentation;