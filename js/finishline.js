class Finishline{
    constructor(ctx){
        this.ctx = ctx,
        this.x = 80;
        this.y = 0;
        this.vy = 10;
        this.img = new Image();
        this.img.src = "/images/finishline.png";
        this.w = CANVAS_WIDTH -83;
        this.h = 30;
    }
    draw(){
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )
    }

    move() {
        this.y += this.vy
      }

      isVisible() {
        return this.y + this.h < CANVAS_HEIGHT + 100
      }

      collide(player) {
        const collideX = player.x + player.w > this.x && player.x < this.x + this.w
        const collideY = player.y < this.y + this.h && player.y + player.h > this.y
    
        return collideX && collideY // si las dos se cumplen significa que es true y por lo tanto en game.js se valora como GameOver
      }

}