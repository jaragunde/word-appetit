/*
 * Copyright (C) 2013 Jacobo Aragunde Pérez <jaragunde@igalia.com>
 *
 * This file is part of Alphabet Soup.
 *
 * Alphabet Soup is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alphabet Soup is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with PhpReport.  If not, see <http://www.gnu.org/licenses/>.
 */

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
