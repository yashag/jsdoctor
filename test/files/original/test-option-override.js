class Cylinder extends Circle {
    constructor(x, y, radius, height) {
        super(x, y, radius); // calls the super constructor
        this.height = height;
    }

    getHeight() {
        return this.height;
    }
}