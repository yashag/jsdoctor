function calculateXDelta(x1, x2) {
    return Math.abs(x1 - x2);
}

function calculateYDelta(y1, y2) {
    return Math.abs(y1 - y2);
}

function generateCenterAxisPoint() {
    return new Point(0, 0);
}

function resetPointToCenter(point) {
    point.X = 0;
    point.Y = 0;
}

function generatePoint(x, y, format) {
    if (!x || !y) {
        throw new PointError("Can't create a point without parameters");
    }

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