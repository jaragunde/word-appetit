/*
 * Copyright (C) 2013 Jacobo Aragunde Pérez <jaragunde@igalia.com>
 *
 * This file is part of Word appetit!
 *
 * Word appetit! is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Word appetit! is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Word appetit!  If not, see <http://www.gnu.org/licenses/>.
 */

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
