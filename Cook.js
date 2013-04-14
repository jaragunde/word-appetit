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
    y: 20,

    type: 'cook',

    //letters that can spawn
    //(they are the letters from the goal and maybe some more)
    lettersCooking: ["H", "A", "M"],
    sheetLetters: null,

    //define the sprite on init because there is only one
    sprite: new Sprite({
        "x": 219,
        "y": 68,
        "w": 24,
        "h": 28,
    }),

    //is the cook visible?
    //(it is only visible when a letter is going to be thrown)
    visible: false,

    init: function(ctx, sheet, lettersSheet) {
        this.sprite.sheet = sheet;
        this.sheetLetters = lettersSheet;

        this._super(ctx);
    },

    update: function () {
        //randomly spawn a letter
        if(Math.random() < 0.1) {
            var position = Math.floor(Math.random() * 640);
            engine.letters.push(new Letter(this.ctx, this.sheetLetters,
                    position, 20, this.getNextLetter()));
            this.x = position - 12;
            this.visible = true;
        }
        else {
            this.visible = false;
        }
    },

    draw: function () {
        if(this.visible) {
            this._super();
        }
    },

    //returns the next letter that will fall
    //it is chosen among the letters of the goal word
    getNextLetter: function () {
        return this.lettersCooking[Math.floor(Math.random()*this.lettersCooking.length)];
    },
});
