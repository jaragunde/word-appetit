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

    init: function(ctx, sheet) {
        this.sprite.sheet = sheet;

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
            left: this.x + this.sprite.cx,
            right: this.x + this.sprite.cx + this.sprite.w,
            top: this.y + this.sprite.cy,
            bottom: this.y + this.sprite.cy + 2
        };
    },

    draw: function () {
        this.ctx.fillRect(this.x + this.sprite.cx, this.y + this.sprite.cy,
                this.sprite.w, 2);

        this._super();
    },
});
