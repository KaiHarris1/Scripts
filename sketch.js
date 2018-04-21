let s;
let food;
let scl = 40;
let m;
let dir;
let gold = [new Collectable('gold')];
let showGold;

function setup() {
   createCanvas(600, 600);
   frameRate(10);
   s = new Snake();
   f = new Collectable('food')
   f.pickLocation();
   gold[0].pickLocation();
}

function mousePressed() {
   s.total++
}

function draw() {
   background(30);
   cpu();
   if (s.eat(f.x, f.y)) {
      f.pickLocation();
   }
   for (let g of gold) {
      if (s.eat(g.x, g.y)) {
         g.pickLocation();

         if (s.total % 5 === 0 && s.total !== 0) {
            gold[gold.length + 1] = new Collectable('gold');
            print(gold[0])
            print("t")
            for (var i = 0; i < g.length; i++) {
               g.show();
               print(gold[0])
            }
         }
      }

   }

   
}

function cpu() { //The main computing/rendering for all objects
   s.death();
   s.update();
   s.show();
   f.show();

}

function keyPressed() { //if Arrow Keys are pressed. Change Direction
   if (keyCode === UP_ARROW && dir != 'DOWN') {
      s.dir(0, -1);
      dir = 'UP'
   } else if (keyCode === DOWN_ARROW && dir != 'UP') {
      s.dir(0, 1);
      dir = 'DOWN'
   } else if (keyCode === LEFT_ARROW && dir != 'RIGHT') {
      s.dir(-1, 0);
      dir = 'LEFT'
   } else if (keyCode === RIGHT_ARROW && dir != 'LEFT') {
      s.dir(1, 0);
      dir = 'RIGHT'
   }
}

function Collectable(type) {
   this.x;
   this.y;
   this.type = type;

   this.pickLocation = function() {
      let cols = floor(width / scl);
      let rows = floor(height / scl);
      this.x = floor(random(cols)) * scl;
      this.y = floor(random(rows)) * scl;
   }

   this.show = function() {
      if (this.type == 'food') {
         fill(255, 0, 100);
         rect(this.x, this.y, scl, scl);
      } else if (this.type == 'gold' && showGold) {
         for (let i = 0; i <= gold.length; i++) {
            fill(244, 238, 66);
            rect(this.x, this.y, scl, scl);
         }
      }
   }
}

function Snake() { //The snake object
   this.x = 0;
   this.y = 0;
   this.xSpeed = 1;
   this.ySpeed = 0;
   this.total = 0;
   this.tail = [];

   this.dir = function(x, y) { //Direction of snake
      this.xSpeed = x;
      this.ySpeed = y;
   }
   this.eat = function(xpos, ypos) {
      var d = dist(this.x, this.y, xpos, ypos);
      if (f.type == 'food') {
         if (d < 1) {
            this.total++;
            return true;
         } else {
            return false;
         }
      }
      for (let g of gold) {
         if (g.type == 'gold') {
            if (d < 1 && showGold) {
               this.total++;
               return true;
            } else {
               return false;
            }
         }
      }
   }
   this.death = function() {
      for (let i = 0; i < this.tail.length; i++) {
         let pos = this.tail[i];
         let d = dist(this.x, this.y, pos.x, pos.y)
         if (d < 1) {
            this.total = 0;
            this.tail = [];
            gold = [new Collectable('gold')];
            showBonus = false;
            bonus = false;
         }
      }
   }
   this.update = function() { //Update the snake USES the scl
      if (this.total === this.tail.length) {
         for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
         }
      }
      this.tail[this.total - 1] = createVector(this.x, this.y);

      this.x = this.x + this.xSpeed * scl;
      this.y = this.y + this.ySpeed * scl;

      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);
   }
   this.show = function() { //Shows the rect
      noStroke();
      fill(180)
      for (let i = 0; i < this.tail.length; i++) {
         rect(this.tail[i].x, this.tail[i].y, scl, scl)
      }
      fill(255);
      rect(this.x, this.y, scl, scl);
   }
}