const texting = require('texting');

const JSDoctionary = require('../../JSDoctionary');
const docUtils = require('../../../doc-utils');

const _descriptors = new WeakMap();

/**
 * An abstract Documentation implementation
 * @abstract
 */
class Documentation {

    /**
     * Creates a Documentation
     * @constructor
     */
    constructor() {
        this.doctionary = new JSDoctionary();
        this.descriptors = {};
    }

    /**
     * Get the value of the descriptors property
     * @type {Object}
     */
    get descriptors () {
        return _descriptors.get(this);
    }

    /**
     * Set the value of the descriptors property
     * @type {Object}
     */
    set descriptors (annotations) {
        _descriptors.set(this, annotations);
    }

    /**
     * Returns the type of the argument based on information provided by the parser.
     * @param {Object} arg - Parser explanation
     * @param {string} arg.type
     * @returns {string} The type of the argument. The default is a generic type represented by an asterisk
     */
    typeInfer(arg) {
        switch (arg.type) {
            case "ArrayExpression":
                let elementsTypes = arg.elements.map(element => this.typeInfer(element));
                elementsTypes = docUtils.unique(elementsTypes);
                if(elementsTypes.length === 1 && elementsTypes[0] !== '*') return `Array.<${elementsTypes[0]}>`;
                return "Array";
            case "ObjectExpression":
                return "Object";
            case "NewExpression":
                return arg.callee.name;
            case "Literal":
                return typeof arg.value;
            default:
                return "*";
        }
    }

    /**
     * @returns {boolean}
     * @private
     */
    isEmpty() {
        return docUtils.isEmpty(this.descriptors);
    }

    /**
     * @returns {string} If the documentation contains descriptors, returns them in a jsdoc format. Otherwise return an empty string
     */
    toString() {
        if (this.isEmpty()) return "";
        
        let annotations = [];

        Object.values(this.descriptors).forEach(descriptor => {
            if (Array.isArray(descriptor)) {
                if (descriptor.length) annotations = annotations.concat(descriptor);
            } else if (descriptor) {
                annotations.push(descriptor);
            }
        });

        return texting.jsdocComments(annotations);
    }

}

module.exports = Documentation;