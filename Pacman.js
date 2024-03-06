export class Pacman {

   pacmanFrames = document.querySelector('#animation');
   DIRECTION_RIGHT = 4;
   DIRECTION_TOP = 3;
   DIRECTION_LEFT = 2;
   DIRECTION_BOTTOM = 1;
   direction = this.DIRECTION_RIGHT;
   nextDirection = this.DIRECTION_RIGHT
   x = 200;
   y = 260;
   speed = 6;
   currentFrame = 0;
   score = 0;
   lives = 3;

   constructor (map) {
      this.map = map;
      this.originX = this.x;
      this.originY = this.y;
   }
   moveProcess (gameLoopInterval) {
      if (this.x > 405 && this.getMapY() === 10) {
         this.x = 0;
         this.y = 200;
      } else if (this.x < 0 && this.getMapY() === 10) {
         this.x = 405;
         this.y = 200;
      }

      this.changeDirection();
      this.moveForward();
      if (this.wallCollision()) {
         this.moveBackward();
      }
      if (this.map.map[this.getMapY()][this.getMapX()] === 2) {
         this.map.map[this.getMapY()][this.getMapX()] = 3;
         this.score++;
         if (this.score == 205) {
            this.win(gameLoopInterval);
         }
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
   pacmanAnimation () {
      this.currentFrame = this.currentFrame == 6 ? 0 : this.currentFrame + 1;
      this.map.context.save();
      this.map.context.translate(this.x + this.map.block / 2, this.y + this.map.block / 2);
      this.map.context.rotate((this.direction * 90 * Math.PI) / 180);
      this.map.context.translate(-this.x - this.map.block / 2, -this.y - this.map.block / 2);
      this.map.context.drawImage(this.pacmanFrames, this.currentFrame * this.map.block, 0, this.map.block, this.map.block, this.x, this.y, this.map.block, this.map.block)
      this.map.context.restore();
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
   win (gameLoopInterval) {
      clearInterval(gameLoopInterval);
      this.map.context.font = "34px Emulogic";
      this.map.context.fillStyle = "yellow";
      this.map.context.fillText("YOU WIN", 130, 200);
   }
   ghostsCollisions (ghosts, gameLoopInterval) {

      for (let ghost of ghosts) {
         if (this.getMapX() === ghost.getMapX() && this.getMapY() === ghost.getMapY()) {
            this.lives--;
            for (let g of ghosts) {
               g.x = g.originX;
               g.y = g.originY;
            }
            this.x = this.originX;
            this.y = this.originY;
         }
      }


      if (this.lives === 0) {
         clearInterval(gameLoopInterval);
         this.map.context.font = "34px Emulogic";
         this.map.context.fillStyle = "red";
         this.map.context.fillText("GAME OVER", 120, 200);
      }
   }
}
