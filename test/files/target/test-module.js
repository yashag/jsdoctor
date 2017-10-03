/**
 * A point utility functions module
 * @module point/utility
 */

/**
 * Caluclates the delta distance between the x coordinates of two points
 * @param {number} x1 - The first point's x coordinate
 * @param {number} x2 - The second point's x coordinate
 * @returns {number} The x coordinates delta distnace
 */
function calculateXDelta(x1, x2) {
    return Math.abs(x1 - x2);
}

/**
 * Caluclates the delta distance between the y coordinates of two points
 * @param {number} y1 - The first point's y coordinate
 * @param {number} y2 - The second point's y coordinate
 * @returns {number} The y coordinates delta distnace
 */
function calculateYDelta(y1, y2) {
    return Math.abs(y1 - y2);
}

/**
 * Generates a point object, which is located at the center of the axis system
 * @returns {Point} A point object located at the center of the axis system
 */
function generateCenterAxisPoint() {
    return new Point(0, 0);
}

/**
 * Resets the x and y coordinates of a provided point to the center of the axis system
 * @param {Point} point - A point object
 * @private
 */
function resetPointToCenter(point) {
    point.X = 0;
    point.Y = 0;
}

/**
 * Generates a point representation based on provided coordinates and requested format
 * @param {number} x - A x coordinate on the x axis
 * @param {number} y - A y coordinate on the y axis
 * @param {string} format - The requested format representation of the returned point object
 * @returns {(string|Array.<number>|{x: number, y: number}|Point)} A point representation according to the requested format
 * @throws {Error} Invalid paramters. Valid parameters are requested
 */
function generatePoint(x, y, format) {
    if (format === "string") {
        return x + ',' + y;
    } else if (format === "array") {
        return [x, y];
    } else if (format === "object") {
        return {x, y};
    } else if (format === "point") {
        return new Point(x, y);
    }

    throw new Error("Invalid paramters. Please provide valid parameters for point generation");
}

module.exports = {
    calculateXDelta,
    calculateYDelta,
    generateCenterAxisPoint,
    generatePoint
};