/**
 * A coordinates based Point implementation
 */
class Point {
    /**
     * Creates a Point
     * @constructor
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     */
    constructor(x, y) {
        this.coordinates = {x, y};
    }

    /**
     * Get the value of the X property
     * @type {number}
     */
    get X() {
        return this.coordinates.x;
    }

    /**
     * Set the value of the X property
     * @type {number}
     */
    set X(x) {
        this.coordinates.x = x;
    }

    /**
     * Get the value of the Y property
     * @type {number}
     */
    get Y() {
        return this.coordinates.y;
    }

    /**
     * Set the value of the Y property
     * @type {number}
     */
    set Y(y) {
        this.coordinates.y = y;
    }

    /**
     * Creates a Point instance from a comma-seperated string of coordinates
     * @param {string} str - The string containing two comma-separated numbers
     * @returns {Point} A Point object instance
     * @throws {Error} Invalid input. Expected a comma seperated coordinates string
     * @static
     */
    static fromString(str) {
        let [x, y, rest] = str.split(',', 2);
        x = parseFloat(x);
        y = parseFloat(y);

        if (!isNaN(x) && !isNaN(y)) {
            return new Point(x, y);
        }

        throw new Error("Invalid input. Expected a comma seperated coordinates string");
    }
}