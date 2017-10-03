/**
 * A Dot implementation
 * @extends Point
 */
class Dot extends Point {
    /**
     * Creates a Dot
     * @constructor
     * @param {*} x
     * @param {*} y
     * @param {*} width
     */
    constructor(x, y, width) {
        super(x, y);
        this.width = width;
    }

    /**
     * @returns {*}
     */
    getWidth() {
        return this.width;
    }
}