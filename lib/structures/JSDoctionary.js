/**
 * A JSDoc tags dictionary implementation
 */
class JSDoctionary {

    /**
     * Creates a JSDoctionary
     * @constructor
     */
    constructor() {}

    /**
     * @param {string} superClassName
     * @returns {string}
     */
    documentSuper(superClassName) {
        return `@extends ${superClassName}`;
    }

    /**
     * @param {string} className
     * @returns {string}
     */
    documentClass(className) {
        return `@class ${className}`;
    }

    /**
     * @returns {string}
     */
    documentConstructor() {
        return `@constructor`;
    }

    /**
     * @param {string} methodName
     * @returns {string}
     */
    documentMethod(methodName) {
        return `@method ${methodName}`;
    }

    /**
     * @param {string} parameterName
     * @param {string} [parameterType='*']
     * @returns {string}
     */
    documentParameter(parameterName, parameterType = '*') {
        return `@param {${parameterType}} ${parameterName}`;
    }

    /**
     * @param {string[]} types
     * @returns {string}
     */
    documentReturns(types) {
        if(types.length > 1) {
            return `@returns {(${types.join('|')})}`;
        }
        return `@returns {${types[0]}}`;
    }

    /**
     * @param {string} errorType
     * @param {string} errorDescription
     * @returns {string}
     */
    documentThrows(errorType, errorDescription) {
        if (!errorDescription) return `@throws {${errorType}}`;
        return `@throws {${errorType}} ${errorDescription}`;
    }

    /**
     * @param {string} [type='*']
     * @returns {string}
     */
    documentType(type = '*') {
        return `@type {${type}}`;
    }
}

module.exports = JSDoctionary;