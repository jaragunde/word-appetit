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
 * Game engine object definition
 */
var GameEngine = Class.extend({
    //pointers to canvas, context and sheet
    canvas: null,
    ctx: null,
    sheet: null,
    sheetLetters: null,

    //pointers to game objects
    player: null,
    plate: null,
    customer: null,
    cook: null,
    letters: [],

    //score
    score: 0,

    //level goals
    levelGoals: [["H", "A", "M"], ["S", "O", "U", "P"], ["J", "A", "M"]],
    currentGoal: 0,

    //object containing the state of the input keys
    inputArray: {
        'up': false,
        'down': false,
        'left': false,
        'right': false,
    },

    //game settings
    screenWidth: 640,
    screenHeight: 480,
    FPS: 1000 / 30,

    //members used to calculate FPS counter
    fpsCounter: false,
    lastLoop: new Date,
    thisLoop: 0,
    frameTime: 0,
    filterStrength: 20,

    init: function () {
        var self = this;

        //canvas
        this.canvas = document.getElementById("mainCanvas");
        this.canvas.width = this.screenWidth;
        this.canvas.height = this.screenHeight;
        this.ctx = this.canvas.getContext('2d');

        //sprite sheet
        this.sheet = new Image();
        this.sheet.src = "resources/sprites.png";
        this.sheetLetters = new Image();
        this.sheetLetters.src = "resources/letters.png";

        //input events
        this.canvas.addEventListener('keydown', function (event) {
            self.keyManager(event);
        });
        this.canvas.addEventListener('keyup', function (event) {
            self.keyManager(event);
        });

        //player, plate and customer objects
        this.plate = new Plate(this.ctx);
        this.player = new Player(this.plate, this.ctx, this.sheet);
        this.customer = new Customer(this.ctx, this.sheet, this.sheetLetters);
        this.cook = new Cook(this.ctx, this.sheet, this.sheetLetters);

        //periodically invoke update function
        window.setInterval(function () {
            self.update();
        }, this.FPS);

        //focus canvas to be able to receive keyboard events
        this.canvas.focus();
    },

    keyManager: function (event) {
        var pressed = false;

        //read event
        if(event.type == 'keydown') {
            pressed = true;
        }
        if(event.type == 'keyup') {
            pressed = false;
        }

        //read input
        switch(event.keyCode) {
            case 37: //left
                this.inputArray.left = pressed;
                break;
            case 39: //right
                this.inputArray.right = pressed;
                break;
            case 38: //up
                this.inputArray.up = pressed;
                break;
            case 40: //down
                this.inputArray.down = pressed;
                break;
        }

        return event.keyCode;
    },

    update: function () {
        //update player
        this.player.update(this.inputArray);

        //update customer
        this.customer.update();

        //update cook
        this.cook.update();

        //update letters
        for(var i in this.letters) {
            this.letters[i].update();

            //detect collisions between letters and the plate
            if(this.detectCollision(this.letters[i].getBoundingBox(),
                    this.plate.getBoundingBox())) {
                    this.plate.collision(this.letters[i]);
                    this.letters[i].collision(this.plate);
            }
        }

        //detect collisions between the customer and the player
        if(this.detectCollision(this.customer.getBoundingBox(),
                this.player.getBoundingBox())) {
                this.player.collision(this.customer);
                this.customer.collision(this.player);
        }

        //clear old image
        this.ctx.fillStyle = '#8ED6FF';
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000000';

        //draw player
        this.player.draw();

        //draw customer
        this.customer.draw();

        //draw cook
        this.cook.draw();

        //draw letters in next position, or remove if destroyed
        for(var i in this.letters) {
            if(this.letters[i].destroyed) {
                //FIXME: is this operation efficient?
                this.letters.splice(i, 1);
            }
            else {
                this.letters[i].draw();
            }
        }

        //draw score
        this.ctx.fillText('SCORE: ' + this.score, 15, 15);

        if(this.fpsCounter) {
            //code from @Phrogz at http://stackoverflow.com/questions/4787431/check-fps-in-js
            var thisFrameTime = (this.thisLoop=new Date) - this.lastLoop;
            this.frameTime+= (thisFrameTime - this.frameTime) / this.filterStrength;
            this.lastLoop = this.thisLoop;
        }
    },

    //detect collision between two bounding boxes, returns boolean
    detectCollision: function (box1, box2) {
        if (box1.bottom < box2.top)
            return false;

        if(box2.bottom < box1.top)
            return false;

        if(box1.right < box2.left)
            return false;

        if(box2.right < box1.left)
            return false;

        return true;
    },

    //retrieves a new goal and advances the pointer
    getNextGoal: function () {
        return this.levelGoals[this.currentGoal++];
    },

    fpsIntervalId: null,
    enableFPSCounter: function (enabled) {
        this.fpsCounter = enabled;
        var self = this;
        if(enabled) {
            this.fpsIntervalId = window.setInterval(function () {
                console.log((1000/self.frameTime).toFixed(1));
            },1000);
        }
        else {
            window.clearInterval(this.fpsIntervalId);
        }
    }
});
