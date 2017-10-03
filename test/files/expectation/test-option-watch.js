/**
 * @param {*} radius
 * @param {*} height
 * @returns {Cylinder}
 */
function generateCylinder(radius, height) {
    return new Cylinder(2, 1, radius, height);
}

/**
 * @param {*} radius
 * @returns {Circle}
 */
function generateCircle(radius) {
    return new Circle(1, 2, radius);
}