/**
 * Generic game entity object definition
 */
var GameEntity = Class.extend({
    //x and y position of the entity
    x: 0,
    y: 0,

    //movement speed
    speed: 1,

    //pointer to the canvas 2D context
    ctx: null,

    //pointer to the current sprite of the entity
    sprite: null,

    //marker for entities that have been destroyed and should be removed from
    //the game loop
    destroyed: false,

    //string defining the type of entity
    type: 'void',

    init: function(ctx) {
        this.ctx = ctx;
    },

    draw: function () {
        this.sprite.draw(this.ctx, this.x, this.y);
    },

    //get bounding box of the sprite for collision detection
    getBoundingBox: function () {
        return {
            left: this.x + this.sprite.cx - this.sprite.cw,
            right: this.x + this.sprite.cx + this.sprite.w + this.sprite.cw,
            top: this.y + this.sprite.cy - this.sprite.ch,
            bottom: this.y + this.sprite.cy + this.sprite.h + this.sprite.ch
        };
    },

    //overwrite with behaviour on collision
    collision: function (object) {
        console.log(this.type + ' collides ' + object.type);
    }
});
