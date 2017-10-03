/**
 * A circle based Cylinder implementation
 * @extends Circle
 */
class Cylinder extends Circle {
    /**
     * Creates a Cylinder
     * @constructor
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @param {number} radius - The width of the cylinder, in pixels
     * @param {number} height - The height of the cylinder, in pixels
     */
    constructor(x, y, radius, height) {
        super(x, y, radius); // calls the super constructor
        this.height = height;
    }

    /**
     * Get the cylinder's height
     * @method getHeight
     * @returns {number} The cylinder's height, in pixels
     */
    getHeight() {
        return this.height;
    }
}