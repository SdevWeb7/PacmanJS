export class Node {
   constructor (map, x, y) {
      this.x = x;
      this.y = y;

      map[y][x] === 1 ? this.isWall = true : this.isWall = false;

      this.g = 0;
      this.h = 0;
      this.f = 0;
      this.parent = null;
   }
   heuristic (parent, destination) {
      this.parent = parent;
      this.g = parent.g + 1;
      this.h = (Math.abs(this.x - destination.x) + Math.abs(this.y - destination.y));
      this.f = this.g + this.h;
   }
}
