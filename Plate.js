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
    plateW: 80,

    init: function(ctx) {

        //store plate half width, to speed calculations
        this.plateHW = Math.floor(this.plateW / 2);

        //setup letter placeholders taking into account plate width
        var letterW = 16;
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
            y -= letterW;
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
});
