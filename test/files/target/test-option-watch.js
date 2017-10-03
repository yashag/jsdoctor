/**
 * Generates a Cylinder based on provided radius and height
 * @param {number} radius - A radius, in pixels
 * @param {number} height - A height, in pixels
 * @returns {Cylinder} A Cylinder representation according to the parameters
 */
function generateCylinder(radius, height) {
    return new Cylinder(2, 1, radius, height);
}

/**
 * Generates a Circle based on provided radius
 * @param {number} radius - A radius, in pixels
 * @returns {Circle} A Circle representation according to the parameters
 */
function generateCircle(radius) {
    return new Circle(1, 2, radius);
}