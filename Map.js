export class Map {

      canvas = document.getElementById('canvas');
      context = this.canvas.getContext('2d');
      block = 20;
      innerWall = this.block / 1.6;
      outterWall = (this.block - this.innerWall) / 2;
      map = this.loadMap();
      wallColor = '#342DCA';

      drawMap () {
         for (let y = 0 ; y < this.map.length ; y++) {
            for (let x = 0 ; x < this.map[0].length ; x++) {
               if (this.map[y][x] === 1) {
                  this.createRect(
                     x * this.block,
                     y * this.block,
                     this.block,
                     this.block,
                     this.wallColor
                  )
               }
               if (x > 0 && this.map[y][x - 1] === 1) {
                  this.createRect(
                     x * this.block,
                     y * this.block + this.outterWall,
                     this.block - this.outterWall,
                     this.block - this.outterWall * 2,
                     'black'
                  )
               }
               if (x < this.map[0].length - 1 && this.map[y][x + 1] === 1) {
                  this.createRect(
                     x * this.block + this.outterWall,
                     y * this.block + this.outterWall,
                     this.block - this.outterWall,
                     this.block - this.outterWall * 2,
                     'black'
                  )
               }

               if (y > 0 && this.map[y - 1][x] === 1) {
                  this.createRect(
                     x * this.block + this.outterWall,
                     y * this.block,
                     this.block - this.outterWall * 2,
                     this.block - this.outterWall,
                     'black'
                  )
               }
               if (y < this.map.length - 1 && this.map[y + 1][x] === 1) {
                  this.createRect(
                     x * this.block + this.outterWall,
                     y * this.block + this.outterWall,
                     this.block - this.outterWall * 2,
                     this.block - this.outterWall,
                     'black'
                  )
               }
            }
         }
         this.drawFood();
      }

      drawFood () {
         for (let y = 0 ; y < this.map.length ; y++) {
            for (let x = 0 ; x < this.map[0].length ; x++) {
               if (this.map[y][x] === 2) {
                  this.createRect(
                     x * this.block + this.block / 3,
                     y * this.block + this.block / 3,
                     this.block / 3,
                     this.block / 3,
                     '#FFF'
                     )
               }
            }
         }
      }
      drawScore(score) {
         this.context.font = "20px Emulogic";
         this.context.fillStyle = "white";
         this.context.fillText(
            "Score: " + score,
            0,
            this.block * (this.map.length + 1)
         );
      }
      drawRemainingLives (lives, pacmanFrames) {
         this.context.font = "20px Emulogic";
         this.context.fillStyle = "white";
         this.context.fillText("Lives: ", 220, 20 * (this.map.length + 1));

         for (let i = 0; i < lives; i++) {
            this.context.drawImage(
               pacmanFrames,
               2 * 20,
               0,
               20,
               20,
               350 + i * 20,
               20 * this.map.length + 2,
               20,
               20
            );
         }
      }
      createRect (x, y, width, height, color) {
         this.context.fillStyle = color;
         this.context.fillRect(x, y, width, height);
      }

      loadMap () {
         return [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 2, 1, 3, 3, 3, 3, 3, 3, 3, 1, 2, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 2, 1, 3, 1, 1, 3, 1, 1, 3, 1, 2, 1, 1, 1, 1, 1],
            [2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 3, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2],
            [1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 3, 3, 1, 2, 1, 2, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
            [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
            [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
            [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
         ];
      }
}