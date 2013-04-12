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
 * Customer object definition
 */
var Customer = GameEntity.extend({
    //overwrite default x and y
    x: 40,
    y: 430,

    type: 'customer',

    //letters on the table
    letters: [],

    //define the sprite on init because there is only one
    sprite: new Sprite({
        x: 0,
        y: 0,
        w: 75,
        h: 101,
    }),

    init: function(ctx, sheet) {
        this.sprite.sheet = sheet;

        this._super(ctx);
    },
});
