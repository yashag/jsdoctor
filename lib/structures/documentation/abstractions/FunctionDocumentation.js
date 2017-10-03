/**
 * A parser depiciton of a function body
 * @typedef {Object} FunctionBody
 * @property {Object} body - The body of the method
*/

/**
 * A parser depiciton of a parameter
 * @typedef {Object} Parameter
 * @property {string[]} type
 * @property {Object} [left] - The left side in case the es6 defualt value assignment is used 
 * @property {string} left.name
 * @property {Object} [right] - The right side in case the es6 defualt value assignment is used 
 * @property {string} right.type
 */

const Documentation = require('./Documentation');
const docUtils = require('../../../doc-utils');

/**
 * A FunctionDocumentation implementation, with additional functions functionality
 * @extends Documentation
 * @abstract
 */
class FunctionDocumentation extends Documentation {

    /**
     * Creates a FunctionDocumentation
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Returns the types of all possible returned values within the function, as discovered by the parser
     * @param {FunctionBody} functionBody - Parser function explanation
     * @returns {Array.<string>} All possible returned values
     */
    learnReturnTypes(functionBody) {
        let allReturnStatements = docUtils.deepFind(functionBody, "type", "ReturnStatement");
        let returnTypes = allReturnStatements.map(statement => this.typeInfer(statement.argument));
        return docUtils.unique(returnTypes);
    }

    /**
     * Returns the types of all the relavant exceptions infromation within the function, as discovered by the parser
     * @param {FunctionBody} functionBody - Parser function explanation
     * @returns {Array.<{type: string, ?description: string}>} All exceptions
     */
    learnThrows(functionBody) {
        let allThrowStatements = docUtils.deepFind(functionBody, "type", "ThrowStatement");
        return allThrowStatements.map(statement => {
            const errorDescription = docUtils.deepFind(statement.argument, "type", "Literal")[0] || {};

            return {
                type: this.typeInfer(statement.argument),
                description: errorDescription.value
            };
        });
    }

    /**
     * Learn the types of the provided parameters, based on information provided by the parser
     * @param {Parameter[]} parameters - The function's parameters information
     * @returns {Array.<{parameterName: string, parameterType: ?string}>} An array of the function's parameters and possibly their types
     */
    learnParameters(parameters) {
        if (!parameters) return null;

        return parameters.map(parameter => {

            if(parameter.type === "AssignmentPattern") {
                let parameterType = this.typeInfer(parameter.right);
                return {parameterName: parameter.left.name, parameterType};
            } else if (parameter.type === "Identifier") {
                return {parameterName: parameter.name};
            }

        }).filter(parameter => !!parameter);
    }
    
    /**
     * @param {Parameter[]} parameters
     * @returns {string[]} An array of string representations of all parameters
     */
    documentParameters (parameters) {
        return this.learnParameters(parameters).map(param => {
            return this.doctionary.documentParameter(param.parameterName, param.parameterType);
        }, this);
    }
    
    /**
     * @param {FunctionBody} functionBody
     * @returns {string} A string representation of all possible return types
     */
    documentReturns(functionBody) {
        const returnTypes = this.learnReturnTypes(functionBody);

        if (!returnTypes || returnTypes.length === 0) return null;
        return this.doctionary.documentReturns(returnTypes);
    }

    /**
     * @param {FunctionBody} functionBody
     * @returns {Array.<string>} An array of string representations of all possibly thrown exceptions
     */
    documentThrows(functionBody) {
        const throwsErrors = this.learnThrows(functionBody);

        if (!throwsErrors || throwsErrors.length === 0) return null;
        return throwsErrors.map(error => {
            return this.doctionary.documentThrows(error.type, error.description);
        });
    }

}

module.exports = FunctionDocumentation;