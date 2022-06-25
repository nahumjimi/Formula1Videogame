class Driver{
    constructor(ctx, left, player, driverIndex) {
        this.ctx = ctx;
        this.w = 40;
        this.h = 100;
        this.img = new Image();
        this.img.src = DRIVERS[driverIndex]
        this.dist = Math.random() * 300 + 60
        this.x = left ? 75 : this.ctx.canvas.width - this.dist
        this.y = -110;
        this.vy = 2;
        this.player = player;
      }


      moveDri() {
      
      let xPlayer = this.player.x

      if(this.y > CANVAS_HEIGHT / 3 ){
        this.vy = 0;
      } else{
        this.y += this.vy
      }
      if(this.player.y < this.y){
        this.y+= 1
     }

        if(xPlayer < this.x){
          this.x += -speed
      }  else if(xPlayer > this.x ){
          this.x += speed
      }else{
        this.vx = 0
      }

       if(this.yPlayer < this.x ){
          this.vx = this.vx * -1
    }  
    }

      collide(player) {
        const collideX = player.x + player.w > this.x && player.x < this.x + this.w
        const collideY = player.y < this.y + this.h && player.y + player.h > this.y
    
        return collideX && collideY // si las dos se cumplen significa que es true y por lo tanto en game.js se valora como GameOver
      }

      evaluatePosition(player, drivIndex){
        //console.log(drivIndex)
        let driverY = this.y
        let playerY = player.y
          switch (drivIndex){
            case 1:
                if(playerY > driverY){
                  return 0
                } else{
                  return 1
                }
              break;
            case 2:
              if(playerY > driverY){
                return 1
              } else{
                return 2
              }
              break;
            case 3:
              if(playerY > driverY){
                return 2
              } else{
                return 3
              }
              break;
            case 4:
              if(playerY > driverY){
                return 3
              } else{
                return 4
              }
              break;
            case 5:
              if(playerY > driverY){
                return 4
              } else{
                return 5
              }
              break;  
          }
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
        return this.y + this.h < CANVAS_HEIGHT + 100
      }
}
