import { Vector } from "artistic-engine";

export class Vector2D extends Vector.Vector2D {
    public add(vector: Vector.Vector2D) {
        this.X += vector.X;
        this.Y += vector.Y;
    }

    public sub(vector: Vector.Vector2D) {
        this.X -= vector.X;
        this.Y -= vector.Y;
    }

    public mul(num: number) {
        this.X *= num;
        this.Y *= num;
    }

    public dot(vector: Vector.Vector2D) {
        return this.X * vector.X + this.Y * vector.Y;
    }

    public mag() {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    }

    public unit() {
        const size = this.mag();
        if (size !== 0) this.mul(1 / size);
    }
}