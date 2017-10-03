/**
 * The class parsed representation
 * @typedef {Object} ClassDocumentationExplanation
 * @property {string} superClass - The class's parent name
 * @property {Object} id - The class identification data
 * @property {string} id.name - The class name
 */

const Documentation = require('./abstractions/Documentation');
const texting = require('texting');

/**
 * A ClassDocumentation implementation
 * @extends Documentation
 */
class ClassDocumentation extends Documentation {

    /**
     * Creates a ClassDocumentation
     * @constructor
     * @param {ClassDocumentationExplanation} explanation
     */
    constructor(explanation) {
        super();
        this.docClass(explanation);
    }

    /**
     * @param {ClassDocumentationExplanation} explanation
     */
    docClass(explanation) {
        this.descriptors = {
            description: this.documentDescription(explanation.id.name),
            super: this.documentSuper(explanation.superClass)
        };
    }

    /**
     * @param {string} className - The name of the class
     * @returns {string} The jsdoc tag documentation
     */
    documentDescription(className) {
        return `A ${className} implementation`;
    }

    /**
     * @param {string} superClass - The name of the super class
     * @returns {string} The jsdoc tag documentation
     */
    documentSuper(superClass) {
        if (!superClass) return null;
        return this.doctionary.documentSuper(superClass.name);
    }

    /**
     * @returns {string} If documentation is empty returns an empty string. Otherwise returns jsdoc representation as a string
     */
    toString() {
        if (this.isEmpty()) return "";
        let annotations = Object.values(this.descriptors).filter(descriptor => !!descriptor);

        return texting.jsdocComments(annotations);
    }

}

module.exports = ClassDocumentation;