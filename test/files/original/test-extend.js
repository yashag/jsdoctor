class Dot extends Point {
    constructor(x, y, width) {
        super(x, y);
        this.width = width;
    }

    getWidth() {
        return this.width;
    }
}