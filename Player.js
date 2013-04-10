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

    //plate width, it's configurable because it impacts in the difficulty
    plateW: 80,

    init: function(ctx, sheet) {
        this.sprite.sheet = sheet;

        //store plate half width, to speed calculations
        this.plateHW = Math.floor(this.plateW / 2);

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

        //draw sprite
        this._super();
    },
});
