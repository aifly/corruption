/**
 * Created by fly on 2016/12/14.
 */

export default class Vector2{
    constructor(x=0,y=0){
        this.x = x;
        this.y = y;
    }
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy(v) {

        this.x = v.x;
        this.y = v.y;

        return this;

    }

    clone() {

       // return new THREE.Vector2(this.x, this.y);

    }

    add(v1, v2) {

        this.x = v1.x + v2.x;
        this.y = v1.y + v2.y;

        return this;

    }
    addSelf(v) {

        this.x += v.x;
        this.y += v.y;
        return this;

    }

    sub(v1, v2) {

        this.x = v1.x - v2.x;
        this.y = v1.y - v2.y;

        return this;

    }

    subSelf(v) {

        this.x -= v.x;
        this.y -= v.y;

        return this;

    }

    multiplyScalar(s) {

        this.x *= s;
        this.y *= s;

        return this;

    }

    divideScalar(s) {

        if (s) {

            this.x /= s;
            this.y /= s;

        } else {

            this.set(0, 0);

        }

        return this;

    }


    negate() {
        return this.multiplyScalar(-1);
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;

    }

    lengthSq() {

        return this.x * this.x + this.y * this.y;
    }

    length() {

        return Math.sqrt(this.lengthSq());

    }

    normalize() {

        return this.divideScalar(this.length());

    }

    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v) {
        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;
    }


    setLength(l) {

        return this.normalize().multiplyScalar(l);

    }

    equals(v) {

        return ((v.x === this.x) && (v.y === this.y));

    }
    rotateSelf(p, theta) {
        var v = new Vector2();

        v.sub(this, p);
        theta *= Math.PI / 180;
        var R = [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
        this.x = p.x + R[0][0] * v.x + R[0][1] * v.y;
        this.y = p.y + R[1][0] * v.x + R[1][1] * v.y;
    }


    reflectionSelf(v) {
        var nv = v.normalize();
        this.subSelf(nv.multiplyScalar(2 * this.dot(nv)));
    }
    distanceToLine(p1, p2) {
        if (p2.x === p1.x) {
            return Math.abs(this.y - p1.y);
        }
        else if (p2.y === p1.y) {
            return Math.abs(this.x - p1.x);
        }
        else {
            var A = (p2.y - p1.y) / (p2.x - p1.x);
            var B = -1;
            var C = p1.y - A * p1.x;
            return Math.abs(A * this.x + B * this.y + C) / Math.sqrt(A * A + B * B);
        }
    }
    vertical() {
        return new Vector2(-this.y, this.x);
    }

}


Vector2.sub =  (v1, v2) =>{
    return new Vector2(v1.x - v2.x, v1.y - v2.y)
}


Vector2.rotate =  (p1, p2, theta) =>{
    var v = new Vector2();
    v.sub(p1, p2);
    theta *= Math.PI / 180;
    var R = [ [Math.cos(theta), -Math.sin(theta)],  [Math.sin(theta), Math.cos(theta)] ];
    return new Vector2(p2.x + R[0][0] * v.x + R[0][1] * v.y, p2.y + R[1][0] * v.x + R[1][1] * v.y);
}