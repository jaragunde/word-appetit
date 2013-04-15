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
 * Sprites manager object definition
 */
var SpriteManager = Class.extend({

    //route to the game resources
    route: "resources/",

    //sprite definition file
    definitionFile: "sprite-definition.json",

    //parsed definitions
    definitions: null,

    //sprite objects, ready to use
    sprites: {},

    //Image objects for the sheets
    sheets: {},

    //ready state
    ready: false,

    init: function () {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.route + this.definitionFile, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    self.definitions = JSON.parse(this.responseText);
                    self.createSprites();
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
            console.error(xhr.statusText);
        };
        xhr.send();
    },
    createSprites: function () {
        for(var i in this.definitions) {
            var def = this.definitions[i];
            if(!this.sheets[def.sheet]) {
                //the sheets is not yet loaded
                this.sheets[def.sheet] = new Image();
                this.sheets[def.sheet].src = this.route + def.sheet;
                //FIXME: async load can cause trouble. Use onload callbacks.
            }
            this.sprites[i] = new Sprite({
                x: def.x,
                y: def.y,
                w: def.w,
                h: def.h,
                sheet: this.sheets[def.sheet]
            });
        }
        this.ready = true;
    }
});

/**
 * Globally-accessible instance of the sprite manager
 */
var spriteManager = new SpriteManager();
