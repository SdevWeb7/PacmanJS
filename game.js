import { Map } from './Map.js';
import { Pacman } from './Pacman.js';
import { Ghost } from "./Ghosts.js";

let map = new Map();
let pacman = new Pacman(map);
let ghosts = [new Ghost(map, pacman, 180, 200, 0, 0), new Ghost(map, pacman, 180, 220, 0, 1), new Ghost(map, pacman, 220, 200, 1, 0), new Ghost(map, pacman, 200, 200, 1, 1)];

let gameLoop = () => {
   map.context.clearRect(0, 0, map.canvas.width, map.canvas.height);
   map.createRect(0, 0, map.canvas.width, map.canvas.height, "black");
   map.drawMap();
   map.drawScore(pacman.score);
   map.drawRemainingLives(pacman.lives, pacman.pacmanFrames);
   pacman.pacmanAnimation();
   pacman.moveProcess(gameLoopInterval);
   for (let ghost of ghosts) {
      ghost.drawGhost();
      ghost.moveProcess();
   }
   pacman.ghostsCollisions(ghosts, gameLoopInterval)
}

let gameLoopInterval = setInterval(gameLoop, 1000 / 20);
gameLoop();

document.addEventListener('keydown', event => {
   switch (event.key) {
      case 'ArrowUp':
         pacman.nextDirection = pacman.DIRECTION_TOP;
         break;
      case 'ArrowLeft':
         pacman.nextDirection = pacman.DIRECTION_LEFT;
         break;
      case 'ArrowDown':
         pacman.nextDirection = pacman.DIRECTION_BOTTOM;
         break;
      case 'ArrowRight':
         pacman.nextDirection = pacman.DIRECTION_RIGHT;
         break;
      case 's':
         pacman.win(gameLoopInterval);
         break;
   }
})

