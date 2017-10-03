class Point {
    
    constructor(x, y) {
        this.coordinates = {x, y};
    }
    
    get X() {
        return this.coordinates.x;
    }

    set X(x) {
        this.coordinates.x = x;
    }

    get Y() {
        return this.coordinates.y;
    }

    set Y(y) {
        this.coordinates.y = y;
    }

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