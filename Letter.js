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
 * Letter object definition
 */
var Letter = GameEntity.extend({
    //movement speed
    speed: 4,

    type: 'letter',

    //the letter represented by this object
    value: null,

    //position of sprites for letters in the sheet
    sprites: {
        'A': [2, 2],
        'B': [2 + 10, 2],
        'C': [2 + 10*2, 2],
        'D': [2 + 10*3, 2],
        'E': [2 + 10*4, 2],
        'F': [2 + 10*5, 2],
        'G': [2 + 10*6, 2],
        'H': [2 + 10*7, 2],
        'I': [2 + 10*8, 2],
        'J': [2 + 10*9, 2],
        'K': [2 + 10*10, 2],
        'L': [2 + 10*11, 2],
        'M': [2 + 10*12, 2],
        'N': [2, 16],
        'O': [2 + 10, 16],
        'P': [2 + 10*2, 16],
        'Q': [2 + 10*3, 16],
        'R': [2 + 10*4, 16],
        'S': [2 + 10*5, 16],
        'T': [2 + 10*6, 16],
        'U': [2 + 10*7, 16],
        'V': [2 + 10*8, 16],
        'W': [2 + 10*9, 16],
        'X': [2 + 10*10, 16],
        'Y': [2 + 10*11, 16],
        'Z': [2 + 10*12, 16],
    },

    init: function(ctx, sheet, x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.sprite = new Sprite({
            x: this.sprites[value][0],
            y: this.sprites[value][1],
            w: 8,
            h: 12,
            sheet: sheet,
        });

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
