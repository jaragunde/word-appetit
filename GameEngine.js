/**
 * Game engine object definition
 */
var GameEngine = Class.extend({
    //pointers to canvas, context and sheet
    canvas: null,
    ctx: null,
    sheet1: null,
    sheet2: null,

    //pointers to game objects
    player: null,

    //object containing the state of the input keys
    inputArray: {
        'up': false,
        'down': false,
        'left': false,
        'right': false,
    },

    //game settings
    screenWidth: 640,
    screenHeight: 480,
    FPS: 1000 / 30,

    //members used to calculate FPS counter
    fpsCounter: false,
    lastLoop: new Date,
    thisLoop: 0,
    frameTime: 0,
    filterStrength: 20,

    init: function () {
        var self = this;

        //canvas
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.width = this.screenWidth;
        this.canvas.height = this.screenHeight;
        this.ctx = this.canvas.getContext('2d');

        //sprite sheet
        this.sheet1 = new Image();
        this.sheet1.src = "resources/walk-sequence.png";
        this.sheet2 = new Image();
        this.sheet2.src = "resources/character-stand.png";

        //input events
        this.canvas.addEventListener('keydown', function (event) {
            self.keyManager(event);
        });
        this.canvas.addEventListener('keyup', function (event) {
            self.keyManager(event);
        });

        //player object
        this.player = new Player(this.ctx, this.sheet2);

        //periodically invoke update function
        window.setInterval(function () {
            self.update();
        }, this.FPS);

        //focus canvas to be able to receive keyboard events
        this.canvas.focus();
    },

    keyManager: function (event) {
        var pressed = false;

        //read event
        if(event.type == 'keydown') {
            pressed = true;
        }
        if(event.type == 'keyup') {
            pressed = false;
        }

        //read input
        switch(event.keyCode) {
            case 37: //left
                this.inputArray.left = pressed;
                break;
            case 39: //right
                this.inputArray.right = pressed;
                break;
            case 38: //up
                this.inputArray.up = pressed;
                break;
            case 40: //down
                this.inputArray.down = pressed;
                break;
        }

        return event.keyCode;
    },

    update: function () {
        //update player
        this.player.update(this.inputArray);

        //clear old image
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);

        //draw player
        this.player.draw();

        if(this.fpsCounter) {
            //code from @Phrogz at http://stackoverflow.com/questions/4787431/check-fps-in-js
            var thisFrameTime = (this.thisLoop=new Date) - this.lastLoop;
            this.frameTime+= (thisFrameTime - this.frameTime) / this.filterStrength;
            this.lastLoop = this.thisLoop;
        }
    },

    //detect collision between two bounding boxes, returns boolean
    detectCollision: function (box1, box2) {
        if (box1.bottom < box2.top)
            return false;

        if(box2.bottom < box1.top)
            return false;

        if(box1.right < box2.left)
            return false;

        if(box2.right < box1.left)
            return false;

        return true;
    },

    fpsIntervalId: null,
    enableFPSCounter: function (enabled) {
        this.fpsCounter = enabled;
        var self = this;
        if(enabled) {
            this.fpsIntervalId = window.setInterval(function () {
                console.log((1000/self.frameTime).toFixed(1));
            },1000);
        }
        else {
            window.clearInterval(this.fpsIntervalId);
        }
    }
});
