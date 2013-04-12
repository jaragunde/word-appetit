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

    //pointer to plate object
    plate: null,

    init: function(plate, ctx, sheet) {
        this.sprite.sheet = sheet;
        this.plate = plate;
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
        this.plate.update(this.x, this.y + this.sprite.cy);
    },

    //on collision with a letter, the letter is stored
    collision: function (object) {
        if(object.type == 'letter') {
            this.letters.push(object);
            this.lettersHeight =
                    Math.floor(this.letters.length / this.lettersPerRow);
        }
    },

    draw: function () {
        //draw plate
        this.plate.draw();
        //draw sprite
        this._super();
    },
});
