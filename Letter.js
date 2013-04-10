/**
 * Letter object definition
 */
var Letter = GameEntity.extend({
    //movement speed
    speed: 4,

    type: 'letter',

    //define the sprite on init because there is only one
    sprite: new Sprite({
        x: 3,
        y: 3,
        w: 16,
        h: 15,
    }),

    init: function(ctx, sheet, x, y) {
        this.sprite.sheet = sheet;
        this.x = x;
        this.y = y;

        this._super(ctx);
    },

    update: function () {
        this.y += this.speed;

        //destroy when it's out of the screen
        if(this.y > 500) {
            this.destroyed = true;
        }
    },

    collision: function (object) {
        this.destroyed = true;
    }
});
