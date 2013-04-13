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

    //letters that form the word we have to build (the goal)
    goal: ['C', 'O', 'W'],
    goalLetterObjects: [],

    //timer to show the goal word (milliseconds)
    showGoalTimer: 5000,
    timeElapsed: 0,
    oldTimestamp: new Date(),

    //define the sprite on init because there is only one
    sprite: new Sprite({
        "x": 76,
        "y": 68,
        "w": 56,
        "h": 40,
    }),

    init: function(ctx, sheet, lettersSheet) {
        this.sprite.sheet = sheet;

        //init goal letter objects (to be shown when the customer orders)
        var x = 20, y = 300;
        for(var i in this.goal) {
            this.goalLetterObjects.push(
                    new Letter(ctx, lettersSheet, x, y, this.goal[i]));
            x+=16;
        }

        this._super(ctx);
    },

    update: function () {
        if(this.timeElapsed < this.showGoalTimer) {
            var timestamp = new Date();
            this.timeElapsed += timestamp - this.oldTimestamp;
            this.oldTimestamp = timestamp;
        }
    },

    draw: function () {
        if(this.timeElapsed < this.showGoalTimer) {
            for(var i in this.goalLetterObjects) {
                this.goalLetterObjects[i].draw();
            }
        }

        this._super();
    },

    //returns the next letter that will fall
    //it is chosen among the letters of the goal word
    getNextLetter: function () {
        return this.goal[Math.floor(Math.random()*this.goal.length)];
    },

    //on collision with the player, the letters in the plate are stored
    collision: function (object) {
        if(object.type == 'player') {
            var letters = object.plate.letters;
            var points = 0;
            for(var i in letters) {
                //search the letter inside the goals array
                var letter = letters[i].value;
                var position = this.goal.indexOf(letter);
                if(position > -1) {
                    //this letter is not part of the goal any more
                    this.goal.splice(position, 1);
                    //add 100 points per letter
                    points += 100;
                }
                else {
                    //remove 50 points per repeated letter
                    points -= 50;
                }
            }
            engine.score += points; //FIXME: hard-coded access to engine object
            this.letters = this.letters.concat(letters);
            object.plate.reset();
        }
    },
});
