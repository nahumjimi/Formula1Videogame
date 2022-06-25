class Positions{
    constructor(ctx, positionIndex){
        this.ctx = ctx;
        this.x = 20
        this.y = CANVAS_HEIGHT - 85
        this.w = 40;
        this.h = 80;
        this.img = new Image();
        this.img.src = POSITIONS[positionIndex]
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
}