import { Grid } from "./Grid.js";
import { Node } from "./Node.js";

export class Ghost {

   ghostFrames = document.getElementById('ghosts');
   sizeX = 150;
   sizeY = 118;
   DIRECTION_RIGHT = 4;
   DIRECTION_TOP = 3;
   DIRECTION_LEFT = 2;
   DIRECTION_BOTTOM = 1;
   direction = this.DIRECTION_RIGHT;
   nextDirection = this.DIRECTION_RIGHT
   speed = 4;

   constructor (map, pacman, x, y, frameX, frameY) {
      this.map = map;
      this.pacman = pacman;
      this.x = x;
      this.y = y;
      this.originX = x;
      this.originY = y;
      this.frameX = frameX;
      this.frameY = frameY;
   }
   moveProcess () {
      if (this.x > 405 && this.getMapY() === 10) {
         this.x = 0;
         this.y = 200;
      } else if (this.x < 0 && this.getMapY() === 10) {
         this.x = 405;
         this.y = 200;
      }

      this.findPacman();
      this.changeDirection();

      this.moveForward();
      if (this.wallCollision()) {
         this.moveBackward();
      }
   }
   changeDirection () {
      if (this.direction == this.nextDirection) return;
      let tempDirection = this.direction;
      this.direction = this.nextDirection;
      this.moveForward();
      if (this.wallCollision()) {
         this.moveBackward();
         this.direction = tempDirection;
      } else {
         this.moveBackward();
      }
   }
   moveForward () {
      switch (this.direction) {
         case this.DIRECTION_RIGHT:
            this.x += this.speed;
            break;
         case this.DIRECTION_TOP:
            this.y -= this.speed;
            break;
         case this.DIRECTION_LEFT:
            this.x -= this.speed;
            break;
         case this.DIRECTION_BOTTOM:
            this.y += this.speed;
            break;
      }
   }
   moveBackward () {
      switch (this.direction) {
         case this.DIRECTION_RIGHT:
            this.x -= this.speed;
            break;
         case this.DIRECTION_TOP:
            this.y += this.speed;
            break;
         case this.DIRECTION_LEFT:
            this.x += this.speed;
            break;
         case this.DIRECTION_BOTTOM:
            this.y -= this.speed;
            break;
      }
   }
   getMapX () {
      return Math.floor(this.x / this.map.block);
   }
   getMapY () {
      return Math.floor(this.y / this.map.block);
   }
   getMapXRightSide () {
      return Math.floor((this.x * 0.999 + this.map.block) / this.map.block);
   }
   getMapYRightSide () {
      return Math.floor((this.y * 0.999 + this.map.block) / this.map.block);
   }
   wallCollision () {
      if (this.map.map[this.getMapY()][this.getMapX()] === 1 || this.map.map[this.getMapYRightSide()][this.getMapX()] === 1 || this.map.map[this.getMapY()][this.getMapXRightSide()] === 1 || this.map.map[this.getMapYRightSide()][this.getMapXRightSide()] === 1) {
         return true;
      } else {
         return false;
      }
   }
   drawGhost () {
      this.map.context.drawImage(
         this.ghostFrames,
         this.frameX * this.sizeX,
         this.frameY * this.sizeY,
         this.sizeX,
         this.sizeY,
         this.x,
         this.y,
         this.map.block,
         this.map.block
      );
   }
   findPacman () {
      let grid = new Grid(this.map);
      let origin = new Node(this.map.map, this.getMapX(), this.getMapY());
      let destination = new Node(this.map.map, this.pacman.getMapX(), this.pacman.getMapY());
      let nextCase = grid.getPath(origin, destination);

      if (nextCase !== undefined && nextCase !== null) {
         if (nextCase.x < this.getMapX()) {
            this.nextDirection = this.DIRECTION_LEFT;
         } else if (nextCase.x > this.getMapX()){
            this.nextDirection = this.DIRECTION_RIGHT;
         } else if (nextCase.y < this.getMapY()){
            this.nextDirection = this.DIRECTION_TOP;
         } else if (nextCase.y > this.getMapY()){
            this.nextDirection = this.DIRECTION_BOTTOM;
         }
      }

   }
}