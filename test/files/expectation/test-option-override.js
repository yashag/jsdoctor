/**
 * A Cylinder implementation
 * @extends Circle
 */
class Cylinder extends Circle {
    /**
     * Creates a Cylinder
     * @constructor
     * @param {*} x
     * @param {*} y
     * @param {*} radius
     * @param {*} height
     */
    constructor(x, y, radius, height) {
        super(x, y, radius); // calls the super constructor
        this.height = height;
    }

    /**
     * @returns {*}
     */
    getHeight() {
        return this.height;
    }
}