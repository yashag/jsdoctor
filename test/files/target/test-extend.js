/**
 * A coordinates and width based Dot implementation
 * @extends Point
 */
class Dot extends Point {
    /**
     * Creates a Dot
     * @constructor
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @param {number} width - The width of the dot, in pixels
     */
    constructor(x, y, width) {
        super(x, y);
        this.width = width;
    }

    /**
     * Get the dot's width
     * @returns {number} The dot's width, in pixels
     */
    getWidth() {
        return this.width;
    }
}