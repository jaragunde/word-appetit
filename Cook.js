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
 * Cook object definition
 */
var Cook = GameEntity.extend({
    y: 26,
    //minimum and maximum positions for the x value
    minX: 110,
    maxX: 630,

    //movement speed
    speed: 10,

    type: 'cook',

    //letters that can spawn
    //(they are the letters from the goal and maybe some more)
    lettersCooking: [],

    //direction to move (negative indicates to the left)
    direction: -1,

    init: function(ctx) {
        this.sprite = spriteManager.sprites["cook"];

        //store precalculated value w
        this.w = this.maxX - this.minX;

        this._super(ctx);
    },

    update: function () {
        //update position
        this.x += this.speed * this.direction;
        //if reached the limits, change direction
        if(this.x < this.minX) {
            this.x = this.minX;
            this.direction *= -1;
        }
        else if(this.x > this.maxX) {
            this.x = this.maxX;
            this.direction *= -1;
        }
        else if(Math.random() < 0.05) {
            //randomly change direction
            this.direction *= -1;
        }
        //randomly spawn a letter
        if(Math.random() < 0.1) {
            engine.letters.push(new Letter(this.ctx, this.x+12, 20,
                    this.getNextLetter()));
        }
    },

    //returns the next letter that will fall
    //it is chosen among the letters of the goal word
    getNextLetter: function () {
        return this.lettersCooking[Math.floor(Math.random()*this.lettersCooking.length)];
    },
});
