/**
 * Container of the information related with a sprite
 */
var Sprite = Class.extend({
    //sheet containing this sprite
    sheet: null,

    //position of the upper-left corner of the sprite in the sheet
    x: 0,
    y: 0,

    //width and height of the sprite
    w: 0,
    h: 0,

    //offset to calculate the top-left corner from the center of the sprite
    cx: 0,
    cy: 0,

    //margin to calculate the collision box of the sprite
    //e.g. if cw = -1, the collision box has 1px less on the left and right
    cw: 0,
    ch: 0,

    init: function (parameters) {
        //merge object parameters with received parameters
        for(var i in parameters) {
            this[i] = parameters[i];
        }
        this.cx = - this.w / 2;
        this.cy = - this.h / 2;
    },
    
    //draw the sprite in a determinate position in a canvas context
    //x and y indicate the position of the center of the sprite in the ctx
    draw: function (ctx, x, y) {
        ctx.drawImage(this.sheet, this.x, this.y, this.w, this.h,
                x + this.cx, y + this.cy, this.w, this.h);
    },
});
