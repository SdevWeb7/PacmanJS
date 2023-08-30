import { Node } from "./Node.js";

export class Grid {

   listNodes = [];

   constructor (map) {
      this.map = map;

      for (let y = 0 ; y < map.map.length ; y++) {
         for (let x = 0 ; x < map.map[0].length ; x++) {
            if (map.map[y][x] !== 1) {
               this.listNodes.push(new Node(map.map, x, y));
            }
         }
      }
   }

   getPath(origin, destination) {

      this.openList = [origin]
      this.closeList = []
      this.path = []

      let hierarchiqueNode = this.searchPath(origin, destination)
      while (hierarchiqueNode !== null) {
         this.path.push(hierarchiqueNode)
         hierarchiqueNode = hierarchiqueNode.parent
      }
      return this.path.reverse()[1];
   }

   searchPath(currentNode, destination) {
      if (this.map.map[destination.y][destination.x] === 1 || this.map.map[destination.y][destination.x] === undefined) {
         return null;
      }
      if (currentNode.x === destination.x && currentNode.y === destination.y) {
         this.closeList = []
         this.openList = []
         return currentNode;
      }

      if (!this.closeList.some(node => node.x === currentNode.x && node.y === currentNode.y)) {
         this.closeList.push(currentNode)
      }

      this.openList = this.openList.filter(node1 => !this.closeList.some(node => node.x === node1.x && node.y === node1.y))

      this.pushOpenList(currentNode, destination);
      let checkNode = this.getBestNode()

      if (checkNode !== null) {
         return this.searchPath(checkNode, destination)
      } else {
         this.closeList = []
         return null;
      }
   }

   getBestNode () {
      this.openList = this.openList.sort((a,b) => a.f - b.f)

      if (this.openList.length > 0) {
         return this.openList[0]
      } else {
         return null;
      }
   }
   pushOpenList(parent, destination) {
      if (parent.x >= 0 && !this.closeList.some(node => node.x === parent.x - 1 && node.y === parent.y)) {
         let nodeLeft = new Node(this.map.map, parent.x - 1, parent.y);
         if (!nodeLeft.isWall) {
            nodeLeft.heuristic(parent, destination);
            this.openList.push(nodeLeft);
         }
      }

      if (parent.x >= 0 && !this.closeList.some(node => node.x === parent.x + 1 && node.y === parent.y)) {
         let nodeRight = new Node(this.map.map, parent.x + 1, parent.y);
         if (!nodeRight.isWall) {
            nodeRight.heuristic(parent, destination);
            this.openList.push(nodeRight);
         }
      }

      if (parent.x >= 0 && !this.closeList.some(node => node.x === parent.x && node.y === parent.y - 1)) {
         let nodeTop = new Node(this.map.map, parent.x, parent.y - 1);
         if (!nodeTop.isWall) {
            nodeTop.heuristic(parent, destination);
            this.openList.push(nodeTop);
         }
      }

      if (parent.x >= 0 && !this.closeList.some(node => node.x === parent.x && node.y === parent.y + 1)) {
         let nodeBottom = new Node(this.map.map, parent.x, parent.y + 1);
         if (!nodeBottom.isWall) {
            nodeBottom.heuristic(parent, destination);
            this.openList.push(nodeBottom);
         }
      }

      return this.openList;
   }
}