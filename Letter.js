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

    init: function(ctx, x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.sprite = spriteManager.sprites[value];

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
