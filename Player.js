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
});
