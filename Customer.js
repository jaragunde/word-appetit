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
    y: 204,

    type: 'customer',

    //letters on the table
    letters: [],

    //letter placeholders: positions where letters should be drawn
    //when they are on the table
    letterPlaceholders: [],

    //letters that form the word we have to build (the goal)
    goal: [],
    goalLetterObjects: [],

    //timer to show the goal word (milliseconds)
    showGoalTimer: 5000,
    timeElapsed: 0,
    oldTimestamp: new Date(),

    init: function(ctx) {
        this.sprite = spriteManager.sprites["customer-waiting"];

        //setup letter placeholders
        var letterW = 10;
        var letterH = 14;
        var x = 30;
        var y = 194;
        while(y > 40) {
            while(x <= 60) {
                this.letterPlaceholders.push({
                    x: x,
                    y: y,
                });
                x += letterW;
            }
            x = 30;
            y -= letterH;
        }

        this._super(ctx);
    },

    update: function () {
        if(this.satisfied()) {
            var next = engine.getNextGoal();
            if(next) {
                this.resetGoal(next);
                this.letters.length = 0;
            }
        }
        if(this.timeElapsed < this.showGoalTimer) {
            var timestamp = new Date();
            this.timeElapsed += timestamp - this.oldTimestamp;
            this.oldTimestamp = timestamp;
        }
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
            if(engine.score < 0) {
                //don't allow negative scores
                engine.score = 0;
            }
            this.letters = this.letters.concat(letters);
            object.plate.reset();
        }
    },

    //the customer is satisfied when it has received
    //all the letters of the goal word
    satisfied: function () {
        return (this.goal.length == 0);
    },

    //set a new goal word
    resetGoal: function (goal) {
        this.goal = goal.slice();
        this.timeElapsed = 0;
        this.oldTimestamp = new Date();

        engine.cook.lettersCooking = goal.slice(); //FIXME c'mon, this is dirty

        //init goal letter objects (to be shown when the customer orders)
        var x = 34, y = 175;
        this.goalLetterObjects.length = 0;
        for(var i in this.goal) {
            this.goalLetterObjects.push(
                    new Letter(this.ctx, x, y, this.goal[i]));
            x+=10;
        }

        //change sprite
        this.sprite = spriteManager.sprites["customer-ordering-2"];
    },

    draw: function () {
        //draw goal letters
        if(this.timeElapsed < this.showGoalTimer) {
            for(var i in this.goalLetterObjects) {
                this.goalLetterObjects[i].draw();
            }
        }
        else {
            //change sprite if timer has expired
            this.sprite = spriteManager.sprites["customer-waiting"];
        }

        //draw letters in placeholders
        var i = 0;
        while(i<this.letters.length && i<this.letterPlaceholders.length) {
            var letter = this.letters[i];
            letter.x = this.letterPlaceholders[i].x;
            letter.y = this.letterPlaceholders[i].y;
            letter.draw();
            i++;
        }
        //draw sprite
        this._super();
    },
});
