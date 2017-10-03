/**
 * A parsed comment
 * @typedef {Object} Comment
 * @property {string} value - The content of the comment
 * @property {string} type - The type of the comment
 * @property {Object} loc - The location of the comment within the code
 * @property {Object} loc.start
 * @property {number} loc.start.line
 * @property {Object} loc.end
 * @property {number} loc.end.line
 */

/**
 * The parsed explanation of the source code
 * @typedef {Object} Explanation
 * @property {Object[]} tokens - A tokenized version of the source code
 * @property {Comment[]} comments - The comments found inside the the source code
 * @property {Object} body - The body of the source code, which holds it's parse equivalent
 */

const indentString = require('indent-string');
const { EOL } = require('os');

const MethodDocumentation = require('./documentation/MethodDocumentation');
const ClassDocumentation = require('./documentation/ClassDocumentation');
const ConstructorDocumentation = require('./documentation/ConstructorDocumentation');
const ClassMethodDocumentation = require('./documentation/ClassMethodDocumentation');
const GetterDocumentation = require('./documentation/GetterDocumentation');
const SetterDocumentation = require('./documentation/SetterDocumentation');

const _source = new WeakMap();
const _explanation = new WeakMap();
const _tokens = new WeakMap();
const _comments = new WeakMap();

/**
 * A Doctor implementation
 */
class Doctor {

    /**
     * Creates a Doctor
     * @constructor
     * @param {string} source - The source code in string form
     * @param {Explanation} explanation
     * @param {Object} options - Additional options
     * @param {boolean} options.overrideComments - Should existing comment be overriden with newly generated ones or not
     */
    constructor(source, explanation, options) {
        _source.set(this, source);
        _explanation.set(this, explanation.body);
        _tokens.set(this, explanation.tokens);
        _comments.set(this, explanation.comments);
        this.documentation = {};
        this.options = options;

        this.document();
    }

    /**
     * Document each part of the code and associate it with the line it should be inserted into 
     */
    document() {
        _explanation.get(this).forEach(explanation => {
            const line = explanation.loc.start.line;

            this.specificDocumentation(line, explanation);
        });
    }

    /**
     * @param {number} line
     * @param {Object} documentation
     */
    registerDocumentation(line, documentation) {
        const comments = this.retrieveComments(line);

        if (!comments || (comments && this.options.overrideComments)) {
            this.documentation[line] = {
                content: documentation,
                comments
            };
        }
    }

    /**
     * @param {number} line
     * @returns {Comment}
     */
    retrieveComments(line) {
        return _comments.get(this).find(comment => comment.loc.end.line === (line - 1));
    }

    /**
     * @param {number} line
     * @param {Object} explanation - The explanation of a main code part
     * @param {string} explanation.type
     */
    specificDocumentation(line, explanation) {
        switch (explanation.type) {
            case 'FunctionDeclaration':
                this.registerDocumentation(line, new MethodDocumentation(explanation));
                break;
            case 'ClassDeclaration':
                this.registerDocumentation(line, new ClassDocumentation(explanation));
                for (let classPart of explanation.body.body) {
                    this.classDetailedDocumentation(classPart.loc.start.line, classPart, {className: explanation.id.name});
                }
                break;
            default:
                break;
        }
    }

    /**
     * @param {number} line
     * @param {Object} explanation - The explanation of a secondary code part
     * @param {string} explanation.kind
     * @param {Object} args - Additional arguments for the documentation initialization
     * @param {string} args.className
     */
    classDetailedDocumentation(line, explanation, args = {}) {
        switch (explanation.kind) {
            case 'constructor':
                this.registerDocumentation(line, new ConstructorDocumentation(explanation, args.className));
                break;
            case 'method':
                this.registerDocumentation(line, new ClassMethodDocumentation(explanation));
                break;
            case 'get':
                this.registerDocumentation(line, new GetterDocumentation(explanation));
                break;
            case 'set':
                this.registerDocumentation(line, new SetterDocumentation(explanation));
                break;
            default:
                break;
        }
    }

    /**
     * @returns {string}
     */
    toString() {
        let contentLines = _source.get(this).split(/\r?\n/);

        Object.keys(this.documentation)
            .sort((line, nextLine) => nextLine - line) // reverse sort
            .forEach(documentationLine => {
                const pad = contentLines[documentationLine - 1].search(/\S|$/);
                const generatedComments = this.documentation[documentationLine].content.toString();
                const originalComments = this.documentation[documentationLine].comments;

                let numberOfLinesToReplace = 0;
                if (originalComments) numberOfLinesToReplace = originalComments.loc.end.line - originalComments.loc.start.line + 1;

                contentLines.splice(documentationLine - numberOfLinesToReplace - 1, numberOfLinesToReplace, indentString(generatedComments, pad));
            }, this);

        return contentLines.join(EOL);
    }

}

module.exports = Doctor;