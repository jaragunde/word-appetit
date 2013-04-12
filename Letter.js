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

    //define the sprite on init because there is only one
    sprite: new Sprite({
        x: 3,
        y: 3,
        w: 16,
        h: 15,
    }),

    //position of sprites for letters in the sheet
    sprites: {
        'A': [3,3 ],
        'B': [3 + 17, 3],
        'C': [3 + 17*2, 3],
        'D': [3 + 17*3, 3],
        'E': [3 + 17*4, 3],
        'F': [3 + 17*5, 3],
        'G': [3 + 17*6, 3],
        'H': [3 + 17*7, 3],
        'I': [3 + 17*8, 3],
        'J': [3 + 17*9, 3],
        'K': [3 + 17*10, 3],
        'L': [3 + 17*11, 3],
        'M': [3 + 17*12, 3],
        'N': [3, 19],
        'O': [3 + 17, 19],
        'P': [3 + 17*2, 19],
        'Q': [3 + 17*3, 19],
        'R': [3 + 17*4, 19],
        'S': [3 + 17*5, 19],
        'T': [3 + 17*6, 19],
        'U': [3 + 17*7, 19],
        'V': [3 + 17*8, 19],
        'W': [3 + 17*9, 19],
        'X': [3 + 17*10, 19],
        'Y': [3 + 17*11, 19],
        'Z': [3 + 17*12, 19],
    },

    init: function(ctx, sheet, x, y, value) {
        this.sprite.sheet = sheet;
        this.x = x;
        this.y = y;
        this.value = value;
        this.sprite.x = this.sprites[value][0];
        this.sprite.y = this.sprites[value][1];

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
