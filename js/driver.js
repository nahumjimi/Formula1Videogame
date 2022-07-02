class Driver{
    constructor(ctx, left, player, driverIndex) {
        this.ctx = ctx;
        this.w = 40;
        this.h = 100;
        this.img = new Image();
        this.img.src = DRIVERS[driverIndex]
        this.dist = Math.random() * 300 + 60
        this.x = CANVAS_WIDTH / 2
        this.y = -110;
        this.vy = 2;
        this.player = player;
        this.vx = 1
        this.takeOverOn = false;
        this.takeOverSpeed = 7;
        this.right =  false;
        this.left = false;

      }


      moveDri() {
        

        // console.log(this.takeOverOn)
        let xPlayer = this.player.x
        if(this.player.y > this.y && this.y < CANVAS_HEIGHT / 3 && this.takeOverOn === false){
          this.y += 1
          // ****** desde aquí se cubre de que no lo rebases...
          if(xPlayer < this.x){
              this.x = this.x - speed
            }  else if(xPlayer > this.x ){
              this.x = this.x + speed
            }else{  
              this.x = this.x
            }
        // ****** hasta aquí se cubre de que no lo rebases...
        } 
        if(this.y > CANVAS_HEIGHT/3 && this.y < ((CANVAS_HEIGHT/3) +5 ) && this.takeOverOn === false){
          this.vy = 0;
          // ****** desde aquí se cubre de que no lo rebases...
          if(xPlayer < this.x){
            this.x = this.x - speed
          }  else if(xPlayer > this.x ){
            this.x = this.x + speed
          }else{  
            this.x = this.x
          } 
        // ****** hasta aquí se cubre de que no lo rebases...
        } 

        if(this.y < ((CANVAS_HEIGHT/3) +5 ) && this.player.y < this.y && this.player.y + this.player.h > this.y && this.takeOverOn === false){
          this.y += 1;
          // ****** desde aquí se cubre de que no lo rebases...
          if(xPlayer < this.x){
            this.x = this.x - speed
          }  else if(xPlayer > this.x ){
            this.x = this.x + speed
          }else{  
            this.x = this.x
          } 
        // ****** hasta aquí se cubre de que no lo rebases...
        } 

        if(this.y > this.player.y && this.takeOverOn === false){
          this.y += 1;
          // ****** desde aquí se cubre de que no lo rebases...
          if(xPlayer < this.x){
            this.x = this.x - speed
          }  else if(xPlayer > this.x ){
            this.x = this.x + speed
          }else{  
            this.x = this.x
          } 
        // ****** hasta aquí se cubre de que no lo rebases...
        } 
       

        // ¡¡¡    AQUI COMIENZA EL REBASE    !!!

        //console.log(`right ${this.right}`)
        //console.log(`left ${this.left}`)
        if(this.y > (CANVAS_HEIGHT * 4/6) && this.y < (CANVAS_HEIGHT - 5) && this.takeOverOn === false){
         // console.log('entra') // *** LOGRÓ ENTRAR AQUI!!!
          this.y += 0.3;
          this.takeOverOn = true
          }
      
        // si ya te rebasó que siga subiendo
        if(this.y < this.player.y && this.takeOverOn === true){
          this.y -= 5
          if(this.y < CANVAS_HEIGHT /3 && this.takeOverOn === true)
          this.takeOverOn = false;
          this.left = false
          this.right = false
        }

        if((((this.x + this.w)/2) > (((this.player.x + this.player.w) / 2) + 50) || ((this.x + this.w)/2) < (((this.player.x + this.player.w) / 2)-50)) && this.takeOverOn === true){   
         //console.log('ENTRAAAAAAA')
          this.y -= 7
        } 

        if(this.takeOverOn === true){
          this.x += speedTakeOver
        }

         if(this.x <= CANVAS_WIDTH -100 && this.takeOverOn === true){
          this.y += 0.2
         } else {
          speedTakeOver = speedTakeOver *-1
         }

         if(this.x >= 100 && this.takeOverOn === true){
          this.y += 0.2
         } else {
          speedTakeOver = speedTakeOver *-1
         }


 /* 28.06.2022 aeropuerto SS 28.06************** 
          if(this.x >= CANVAS_WIDTH - 80 && this.takeOverOn === true){
            this.left = true;
            this.right = false;
          } else if (this.x <= 80 && this.takeOverOn === true){
            this.left = false;
            this.right = true;
          } else if (this.x == CANVAS_WIDTH/2){
            let randomSide = Math.floor(Math.random (2))
            if (randomSide === 1){
                this.left = true
                this.right = false
            } else{
                this.left = false
                this.right = true
            }
          }

          if(this.x >= CANVAS_WIDTH/2 && this.x <= CANVAS_WIDTH -80 && this.takeOverOn === true && this.left === true){
            console.log('entra')
            this.left = true
            this.right = false
            this.y += 0.4
          } 
          if(this.x <= CANVAS_WIDTH/2 && this.takeOverOn === true){
            this.left = false
            this.right = true
            this.y += 0.4 
          }

          if(this.left === true && this.takeOverOn === true){
            console.log('entra')
            this.x = this.x - speed
          }
          if(this.right === true && this.takeOverOn === true){
            this.x = this.x + speed
          }
         
  28.06.2022 aeropuerto SS 28.06************** */

        // } else if(((this.x + this.w)/2) > CANVAS_WIDTH/2 && this.x < CANVAS_WIDTH -80 && this.takeOverOn === true){
        //   console.log('ENTRAAAAAAA')
        //       this.x = this.x + speed
        //       this.y = 0.5
        // }
            // } else if(this.x >= CANVAS_WIDTH - 80){
            //   this.x = this.x - speed
            //   this.y = -0.5
            // }

            // if(this.x < CANVAS_WIDTH / 2 && this.x > CANVAS_WIDTH + 80){
            //   this.x = this.x + speed
            //   this.y = -0.5
            // } else if(this.x <= 80){
            //   this.x = this.x - speed
            //   this.y = -0.5
            // }
        
        if(this.y > (CANVAS_HEIGHT - 6) && this.takeOverOn === true){
          this.takeOverOn = false
          this.y += 1;
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
