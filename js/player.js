class Player{
    constructor(ctx){
        this.ctx = ctx;
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT -150;
        this.w = 40;
        this.h = 100;
        this.img = new Image();
        this.img.src = "./images/checo.png"
        this.vx = 4;
        this.vy = 4;

        this.actions = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowLeft: false,
            ArrowRight: false,
        }
        
        this._setListeners()

    }


    switchAction(key, value) {
        this.actions[key] = value
        this.actions[key] = value
    }

    _setListeners() {
        document.onkeydown = e => this.switchAction(e.key, true)
        document.onkeyup = e => this.switchAction(e.key, false)
      }

    move() {
        if (this.actions.ArrowLeft) {
            this.x -= this.vx
        } else if (this.actions.ArrowRight) {
            this.x += this.vx
        }

        if (this.actions.ArrowUp) {
            this.y -= this.vy
        } else if (this.actions.ArrowDown) {
            this.y += this.vy
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
}