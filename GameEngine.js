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
 * Game engine object definition
 */
var GameEngine = Class.extend({
    //pointers to canvas and context
    canvas: null,
    ctx: null,

    //sprite for the background
    background: null,

    //sprite for the presentation screen
    presentation: null,

    //pointers to game objects
    player: null,
    plate: null,
    customer: null,
    cook: null,
    letters: [],

    //score
    score: 0,

    //levels definition
    levelsDefinition: [
        {
            "targetScore": 500,
            "words": [["H", "A", "M"], ["S", "O", "U", "P"], ["J", "A", "M"]],
        },{
            "targetScore": 900,
            "words": [["S", "O", "U", "P"], ["B", "A", "C", "O", "N"], ["P", "O", "R", "K"]],
        },{
            "targetScore": 1500,
            "words": [["C", "H", "E", "E", "S", "E"], ["C", "H", "I", "C", "K", "E", "N"], ["S", "A", "L", "A", "D"]],
        },{
            "targetScore": 1900,
            "words": [["H", "A", "M", "B", "U", "R", "G", "E", "R"], ["V", "E", "G", "E", "T", "A", "B", "L", "E", "S"]],
        },{
            "targetScore": 2200,
            "words": [["S", "O", "U", "P"], ["C", "H", "I", "C", "K", "E", "N"], ["D", "E", "S", "S", "E", "R", "T"]],
        },{
            "targetScore": 2600,
            "words": [["S", "P", "A", "M"], ["B", "A", "C", "O", "N"], ["S", "A", "U", "S", "A", "G", "E", "S"], ["S", "P", "A", "M"]],
        }
    ],

    //level goals
    currentLevel: 0,
    currentGoal: 0,
    levelFinished: false,
    gameOver: true,

    //object containing the state of the input keys
    inputArray: {
        'up': false,
        'down': false,
        'left': false,
        'right': false,
        'anyKey': false,
    },

    //game settings
    screenWidth: 640,
    screenHeight: 228,
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
        this.ctx.fillStyle = '#FFFFFF';

        //input events
        this.canvas.addEventListener('keydown', function (event) {
            self.keyManager(event);
            //stop event propagation
            event.preventDefault();
            return false;
        });
        this.canvas.addEventListener('keyup', function (event) {
            self.keyManager(event);
            //stop event propagation
            event.preventDefault();
            return false;
        });

        //player, plate and customer objects
        this.plate = new Plate(this.ctx);
        this.player = new Player(this.plate, this.ctx);
        this.customer = new Customer(this.ctx);
        this.cook = new Cook(this.ctx);

        //background and presentation
        this.background = spriteManager.sprites["background"];
        this.presentation = spriteManager.sprites["presentation"];

        //periodically invoke update function
        window.setInterval(function () {
            self.update();
        }, this.FPS);

        //focus canvas to be able to receive keyboard events
        this.canvas.focus();

        soundManager.play("welcome");
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
            default:
                if(this.levelFinished || this.gameOver) {
                    //anyKey is activated on key release
                    this.inputArray.anyKey = !pressed;
                }
        }

        return event.keyCode;
    },

    update: function () {
        if(this.levelFinished) {
            //pause updates and drawing of gaming objects
            if(this.inputArray.anyKey) {
                if(!this.gameOver) {
                    //next level
                    this.levelFinished = false;
                    this.currentLevel++;
                    this.currentGoal = 0;
                    this.score = 0;
                    this.inputArray.anyKey = false;
                }
                else {
                    //return to main screen
                    this.levelFinished = false;
                    //prevent double press
                    this.inputArray.anyKey = false;
                    soundManager.play("welcome");
                }
            }
            return;
        }
        else if(this.gameOver) {
            //we are in the presentation screen
            this.presentation.draw(this.ctx, 320, 114);
            if(this.inputArray.anyKey) {
                this.currentLevel = 0;
                this.currentGoal = 0;
                this.score = 0;
                this.letters.length = 0;
                this.player.reset();
                this.cook.reset();
                this.inputArray.anyKey = false;
                this.gameOver = false;
            }
            return;
        }

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

        //draw background, clearing the scene
        this.background.draw(this.ctx, 320, 114);

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

        if(this.levelFinished) {
            //the game has finished in this update, show score summary
            var targetScore = this.levelsDefinition[this.currentLevel].targetScore;
            this.ctx.fillText('TARGET SCORE: ' + targetScore, 15, 30);
            if(targetScore <= this.score) {
                if(this.currentLevel + 1 == this.levelsDefinition.length) {
                    //there aren't more levels
                    this.ctx.fillText('CONGRATULATIONS!', 15, 45);
                    this.gameOver = true;
                    soundManager.play("level-clear");
                }
                else {
                    this.ctx.fillText('CONTINUE TO THE NEXT LEVEL!', 15, 45);
                    soundManager.play("level-clear");
                }
            }
            else {
                this.ctx.fillText('GAME OVER', 15, 45);
                this.gameOver = true;
                soundManager.play("game-over");
            }
        }

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
        if(this.currentGoal < this.levelsDefinition[this.currentLevel].words.length) {
            return this.levelsDefinition[this.currentLevel].words[this.currentGoal++];
        }
        else {
            this.levelFinished = true;
            return null;
        }
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
