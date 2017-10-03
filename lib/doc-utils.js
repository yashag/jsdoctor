/**
 * A doctor utility functions module
 * @module doctor/utility
 */

const fastGlob = require('fast-glob');

/**
 * @param {Object} obj
 * @returns {boolean}
 */
function isEmpty(obj) {
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) return false;
    }
    return true;
}

/**
 * @param {Object} obj
 * @param {string} key - A name of a specific property within the object
 * @param {*} value - The desired value to be matched with key
 * @returns {Array.<Object>} All matched ocurrences found
 */
function deepFind(obj, key, value) {
    let occurences = [];

    if (obj[key] === value) occurences.push(obj);

    for (let objKey in obj) {
        if (!!obj[objKey] && (typeof obj[objKey] === "object" || Array.isArray(obj[objKey]))) {
            occurences = occurences.concat(deepFind(obj[objKey], key, value));
        }
    }

    return occurences;
}

/**
 * Filter duplicates within an array
 * @param {Array} array
 * @returns {Array}
 */
function unique(array) {
    return [...new Set(array)];
}

/**
 * Checks which file paths are js files and are valid for doctoring
 * @param {string} path - Either a filepath or a glob
 * @returns {Array.<string>} All valid for doctoring file paths
 */
function validateFiles(path) {
    return fastGlob(path, {onlyFiles: true, transform: fileTransformation}).then(files => {
        return files.filter(file => file.valid).map(file => file.path);
    });
}

/**
 * @param {string} filePath
 * @returns {{path: string, valid: boolean}}
 */
function fileTransformation(filePath) {
    return {path: filePath, valid: isFileValid(filePath)};
}

/**
 * @param {string} filePath
 * @returns {boolean} is js file or not
 */
function isFileValid(filePath) {
    return filePath.slice(-3) === '.js';
}


module.exports = {
    isEmpty,
    deepFind,
    unique,
    validateFiles
};