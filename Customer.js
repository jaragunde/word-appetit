/**
 * Customer object definition
 */
var Customer = GameEntity.extend({
    //overwrite default x and y
    x: 40,
    y: 430,

    type: 'customer',

    //define the sprite on init because there is only one
    sprite: new Sprite({
        x: 0,
        y: 0,
        w: 75,
        h: 101,
    }),

    init: function(ctx, sheet) {
        this.sprite.sheet = sheet;

        this._super(ctx);
    },
});
