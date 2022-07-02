class Game{
    constructor(ctx){
        this.ctx = ctx;
        this.intervalId = null;
        this.intervalDRS = null;
        this.intervalStopDRS = null;
        this.background = new Background(this.ctx);
        this.player = new Player(this.ctx);
        this.drivers = [];
        this.driverIndex = 0;
        this.positions = [];
        this.positionIndex = 0;
        this.powerups = [];
        this.tickPowerUp = 0;
        this.driverLeft = false;
        this.powerUpLeft = true;
        this.score = 0;
        this.normalSpeed = 4
        this.powerSpeed = 7
        this.DRSbar = document.getElementById('DRSbar')
        this.DRSbarTotal = 0;
        this.DRSbarOn = false;
        this.finishLineArray = []
        this.tickFinishLine = 0;
        this.countLaps = 0;
        this.numberOfLaps = 10; // numero de vueltas
        this.blockCollide = false;
        this.music = new Audio();
        this.music.src = "../sound/formula1anthem.mp3"
        this.music.loop = true;
        
    }

    start(){
        this.music.play()
        this.intervalId = setInterval (()=>{
            this.clear();
            this.printPosition();
            this.draw();
            this.checkCollisions()
            this.move();
            this.clearDrivers();
            this.printLaps()
          
            this.tickFinishLine++;
            this.tickPowerUp++;
            this.score++; 

            if (this.tickPowerUp % 500 === 0){
              if(this.DRSbarOn === false){
                this.addPowerUp()
              }
            }

            if (this.tickFinishLine % 500 === 0){
              this.addFinishLine()
            }
            
            if(this.drivers.length === 0){
              this.addDriver()             
            }

        },1000/60)
    }

    clear(){
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }

    move() {
        this.background.move();
        this.player.move();
        this.drivers.forEach(driv => driv.moveDri())
        this.powerups.forEach(power => power.move())
        this.finishLineArray.forEach(finish => finish.move())
    }

    draw(){
        this.background.draw()
        this.finishLineArray.forEach(finish => finish.draw())
        this.player.draw()
        this.positions.forEach(pos => pos.draw())
        this.drivers.forEach(driv => driv.draw())
        this.powerups.forEach(power => power.draw())
       
    }

    checkCollisions() {

      let playerVsPowerUp =  this.powerups.find(power => power.collide(this.player)) 
      //console.log(this.DRSbarOn)
      
      if (playerVsPowerUp){
        //console.log('entra')
        this.powerups.pop()
        this.DRSbarOn = true
        this.DRSbarTotal = 100; 
        this.printDRS()
      }
      if(this.DRSbarOn === true){
        this.player.vx = this.powerSpeed;
        this.player.vy = this.powerSpeed;



        if(!this.intervalStopDRS){
          this.intervalStopDRS = setTimeout(()=>{ 
            //console.log('SETTIMEOUT')
            this.DRSbarOn = false
            this.player.vx = this.normalSpeed
            this.player.vy = this.normalSpeed
            this.intervalStopDRS = null;
            clearTimeout(this.intervalStopDRS) 
          }, 5000)
       }
      
      } else{
        this.DRSbarOn = false;  
      }

        let playerVsDriv = this.drivers.find(driv => driv.collide(this.player))
        if (playerVsDriv || this.player.y >= this.ctx.canvas.height ||  this.player.y + this.player.h <= 0 || this.player.x < 83 || this.player.x + this.player.w > this.ctx.canvas.width - 80 )  {

          this.gameOver()
        }  

        if(!this.blockCollide){
          
          let playerVsFinish = this.finishLineArray.find(finish => finish.collide(this.player))
          if(playerVsFinish){
            this.countLaps ++
            this.blockCollide = true;
            setTimeout(()=>{
              this.blockCollide = false
            },1000)
          }
        }
      }

    addDriver() {
        if(this.driverIndex < 4){
          this.drivers.push(new Driver(this.ctx, this.driverLeft, this.player, this.driverIndex, this.positionIndex))
          this.driverIndex += 1;
          speed = speed + 0.5
          speedTakeOver = Math.abs(speedTakeOver) + 0.5 
          this.driverLeft = !this.driverLeft
        } else if(this.countLaps > this.numberOfLaps || this.driverIndex < 4){
            this.positionIndex += 1;
            this.youWin();
        }
       
      }

    addPowerUp(){
        this.powerups.push(new Powerup(this.ctx, this.powerUpLeft, this.player))
        this.powerUpLeft = !this.powerUpLeft
      }

      addFinishLine(){
        this.finishLineArray.push(new Finishline(this.ctx))
      }

      clearDrivers() {
        this.drivers = this.drivers.filter(driv=>driv.isVisible())
        this.powerups = this.powerups.filter(power=>power.isVisible())
        this.finishLineArray = this.finishLineArray.filter(finish=>finish.isVisible())
      }

      printLaps(){
        this.ctx.font = 'italic 30px Arial';
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "top";
        if(this.numberOfLaps === this.countLaps || this.numberOfLaps < this.countLaps){
          this.ctx.fillText(`Final Lap!`, this.ctx.canvas.width-180, this.ctx.canvas.height - 660 );
        }else{
          this.ctx.fillText(`Lap ${this.countLaps}/${this.numberOfLaps}`, this.ctx.canvas.width-180, this.ctx.canvas.height - 660 );
        }
        let lettersPosition = 'th'

        switch (this.positionIndex){
         case 0:
         case 1:
          lettersPosition = 'th'
          break;
         
         case 2:
          lettersPosition = 'rd'
          break;
         
         case 3:
          lettersPosition = 'nd'
          break;

         case 4:
          lettersPosition = 'st'
          break;

        }

        this.ctx.font = "italics 40px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`${lettersPosition}`, this.ctx.canvas.width - 620 , this.ctx.canvas.height - 55);

        if(this.countLaps > this.numberOfLaps && this.positionIndex != 4){
          this.gameOverLaps()
        }
      }

      printPosition(){
        this.drivers.forEach(driv => {
          this.positionIndex = driv.evaluatePosition(this.player, this.driverIndex)
        })
        this.positions.pop()
        this.positions.push(new Positions(this.ctx, this.positionIndex))
        
      }

      printDRS(){
        if (this.DRSbarOn === true){
          this.intervalDRS = setInterval(()=>{
            if(this.DRSbarTotal > 0){
              this.DRSbar.style.width = `${this.DRSbarTotal}%`
              this.DRSbarTotal = this.DRSbarTotal -  2;
            } else{
              this.DRSbarTotal = 0;
              this.DRSbar.style.width = `${this.DRSbarTotal}%`
              this.DRSbarOn = false;
              
              clearInterval(this.intervalDRS);
            }
          },100)  
        }
      }
      
      gameOverLaps(){
        clearInterval(this.intervalId);
        clearInterval(this.intervalDRS);

        let positionFinish = 0

        switch(this.positionIndex){
          case 0:
            positionFinish = '5th'
          break;
          case 1:
            positionFinish = '4th'
          break;
          case 2:
            positionFinish = '3rd'
          break;
          case 3:
            positionFinish = '2nd'
          break;
          case 4:
            positionFinish = '1st'
          break;
        }
        
        this.ctx.fillRect(20, CANVAS_HEIGHT/3, CANVAS_WIDTH -40, 250); 
        this.intervalId = null
        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.ctx.canvas.width/2, this.ctx.canvas.height/2);
        this.ctx.fillText(`You finished ${positionFinish} after ${this.numberOfLaps} laps`,   this.ctx.canvas.width/2, this.ctx.canvas.height-300);
        speed = 1;
      }

      gameOver() {
       
        const checoLost = document.getElementById('checolost')
        checoLost.classList.remove('hidden')

        let checoPositionLost = document.getElementById('checoLostPosition')
        if(this.countLaps != this.numberOfLaps){
          checoPositionLost.innerHTML = `You crashed in lap number ${this.countLaps}`
        } else{
          checoPositionLost.innerHTML = `You crashed in the Final Lap!`
        }

        clearInterval(this.intervalId);
        clearInterval(this.intervalDRS);

        
        this.intervalId = null
        
        speed = 1;
      }  

      youWin(){

        // colocar aqui el gif
        const checoWins = document.getElementById('checowins')
        checoWins.classList.remove('hidden')
        

        clearInterval(this.intervalId);
      }
}