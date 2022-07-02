class Powerup{
    constructor(ctx, left, player){
        this.ctx = ctx
        this.w = 40;
        this.h = 20;
        this.img = new Image();
        this.img.src = "/images/drs.png"
        this.dist = Math.random() * 300 + 80
        this.x = left ? 75 : this.ctx.canvas.width - this.dist
        this.y = -110;
        this.vy = 5;
        this.vx = 3;
        this.player = player;
    }

    move() {
        this.y+= this.vy
        this.x+= this.vx

        if(this.x + this.w >= CANVAS_HEIGHT){
          this.vx = this.vx *-1;
        }else if(this.x === 0){
          this.vx = this.vx *-1;
        }
      }
  
        collide(player) {
          const collideX = player.x + player.w > this.x && player.x < this.x + this.w
          const collideY = player.y < this.y + this.h && player.y + player.h > this.y
      
          return collideX && collideY // si las dos se cumplen significa que es true y por lo tanto en game.js se valora como GameOver
        }
  
        draw() {
          this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
            )
        }
  
        
        isVisible() {
          return this.y + this.h < CANVAS_HEIGHT + 100;
        }


}

