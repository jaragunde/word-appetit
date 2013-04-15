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
 * Plate object definition
 */
var Plate = GameEntity.extend({
    type: 'plate',

    //letters in the plate
    letters: [],

    //letter placeholders: positions where letters should be drawn
    //when they are being carried by the player
    letterPlaceholders: [],
    lettersPerRow: 0,
    lettersHeight: 0,

    //plate width, it's configurable because it impacts in the difficulty
    plateW: 40,

    init: function(ctx) {

        //store plate half width, to speed calculations
        this.plateHW = Math.floor(this.plateW / 2);

        //setup letter placeholders taking into account plate width
        var letterW = 10;
        var letterH = 14;
        var dx = -1 * this.plateHW;
        var dy = 0;//this.sprite.cy;
        var x = Math.floor(letterW / 2);
        var y = -x;
        while(y > -300) {
            while(x < this.plateW) {
                this.letterPlaceholders.push({
                    x: x + dx,
                    y: y + dy,
                });
                x += letterW;
            }
            x = Math.floor(letterW / 2);
            y -= letterH;
        }
        this.lettersPerRow = Math.floor(this.plateW / letterW);

        this._super(ctx);
    },

    update: function (x, y) {
        this.x = x;
        this.y = y;
    },

    //on collision with a letter, the letter is stored
    collision: function (object) {
        if(object.type == 'letter') {
            this.letters.push(object);
            this.lettersHeight =
                    Math.floor(this.letters.length / this.lettersPerRow);
        }
    },

    //bounding box for the plate is redefined
    //because it doesn't have a sprite
    getBoundingBox: function () {
        var box = {
            left: this.x - this.plateHW,
            right: this.x + this.plateHW,
            //as the letters tower grows, the bounding box is pushed higher
            top: this.y - this.lettersHeight * 16,
        };
        box.bottom = box.top + 2; //plate is 2px wide
        return box;
    },

    draw: function () {
        //draw plate
        this.ctx.fillRect(this.x - this.plateHW, this.y,
                this.plateW, 2);

        //draw letters
        var i = 0;
        while(i<this.letters.length && i<this.letterPlaceholders.length) {
            var letter = this.letters[i];
            letter.x = this.x + this.letterPlaceholders[i].x;
            letter.y = this.y + this.letterPlaceholders[i].y;
            letter.draw();
            i++;
        }
    },

    //empty the plate
    reset: function () {
        this.letters = [];
        this.lettersHeight = 0;
    },
});
