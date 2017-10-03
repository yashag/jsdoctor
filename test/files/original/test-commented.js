// A coordinates and radius Circle implementation
class Circle extends Point {
    /**
     * Creates a Circle
     * @constructor
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @param {number} radius - The radius of the circle, in pixels
     */
    constructor(x, y, radius) {
        super(x, y); // calls the super constructor
        this.radius = radius;
    }

    /*
    Multi
    Line
    Comment
    */
    getRadius() {
        return this.radius;
    }
}