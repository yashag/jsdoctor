/**
 * A Point implementation
 */
class Point {
    
    /**
     * Creates a Point
     * @constructor
     * @param {*} x
     * @param {*} y
     */
    constructor(x, y) {
        this.coordinates = {x, y};
    }
    
    /**
     * Get the value of the X property
     * @type {*}
     */
    get X() {
        return this.coordinates.x;
    }

    /**
     * Set the value of the X property
     * @type {*}
     */
    set X(x) {
        this.coordinates.x = x;
    }

    /**
     * Get the value of the Y property
     * @type {*}
     */
    get Y() {
        return this.coordinates.y;
    }

    /**
     * Set the value of the Y property
     * @type {*}
     */
    set Y(y) {
        this.coordinates.y = y;
    }

    /**
     * @param {*} str
     * @returns {Point}
     * @throws {Error} Invalid input. Expected a comma seperated coordinates string
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