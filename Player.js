/**
 * Player object definition
 */
var Player = GameEntity.extend({
    //overwrite default x and y
    x: 300,
    y: 400,

    //movement speed
    speed: 3,

    type: 'player',

    //pointer to the sprites used to animate the ship
    sprite: new Sprite({
        x: 0,
        y: 0,
        w: 82,
        h: 119,
    }),

    //letters in the plate
    letters: [],

    //letter placeholders: positions where letters should be drawn
    //when they are being carried by the player
    letterPlaceholders: [],

    //plate width, it's configurable because it impacts in the difficulty
    plateW: 80,

    init: function(ctx, sheet) {
        this.sprite.sheet = sheet;

        //store plate half width, to speed calculations
        this.plateHW = Math.floor(this.plateW / 2);

        //setup letter placeholders taking into account plate width
        var letterW = 16;
        var dx = -1 * this.plateHW;
        var dy = this.sprite.cy;
        var x = Math.floor(letterW / 2);
        var y = -x;
        while(y > -300) {
            while(x < this.plateW) {
                this.letterPlaceholders.push({
                    x: x + dx,
                    y: y + dy,
                });
                x += letterW;
            }
            x = Math.floor(letterW / 2);
            y -= letterW;
        }

        this._super(ctx);
    },

    update: function (inputArray) {
        //update position and sprite given input
        if(inputArray.left) {
            this.x -= this.speed;
        }
        if(inputArray.right) {
            this.x += this.speed;
        }
    },

    //on collision with a letter, the letter is stored
    collision: function (object) {
        if(object.type == 'letter') {
            this.letters.push(object);
        }
    },

    //bounding box for player is redefined
    //only collisions with the plate must be detected
    getBoundingBox: function () {
        return {
            left: this.x - this.plateHW,
            right: this.x + this.plateHW,
            top: this.y + this.sprite.cy,
            bottom: this.y + this.sprite.cy + 2
        };
    },

    draw: function () {
        //draw plate
        this.ctx.fillRect(this.x - this.plateHW, this.y + this.sprite.cy,
                this.plateW, 2);

        //draw letters
        var i = 0;
        while(i<this.letters.length && i<this.letterPlaceholders.length) {
            var letter = this.letters[i];
            letter.x = this.x + this.letterPlaceholders[i].x;
            letter.y = this.y + this.letterPlaceholders[i].y;
            letter.draw();
            i++;
        }

        //draw sprite
        this._super();
    },
});
