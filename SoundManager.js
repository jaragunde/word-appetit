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
 * Sound manager object definition
 */
var SoundManager = Class.extend({

    //route to the game resources
    route: "resources/sound/",

    //sprite definition file
    definitionFile: "sound-definition.json",

    //parsed definitions
    definitions: null,

    //sound clips, ready to use
    clips: {},

    //webaudio objects
    _context: null,
    _mainNode: null,

    init: function () {
        this.initWebAudio();

        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.route + this.definitionFile, true);
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    self.definitions = JSON.parse(this.responseText);
                    self.loadSounds();
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

    initWebAudio: function () {
        try {
            this._context = new webkitAudioContext();
            this._mainNode = this._context.createGainNode(0);
            this._mainNode.connect(this._context.destination);
        }
        catch(e) {
            alert('Web Audio API is not supported in this browser');
        }
    },

    loadSounds: function () {
        for(var i in this.definitions) {
            var def = this.definitions[i];
            if(!this.clips[def.file]) {
                loadSoundAsync(new String(i), new String(def.file), this);
                //new strings are created to avoid passing by reference
            }
        }
    },

    play: function (sound) {
        var buffer = this.clips[this.definitions[sound].file];
        var currentClip = this._context.createBufferSource();
        currentClip.buffer = buffer;
        currentClip.gain.value = 0.2;
        currentClip.connect(this._mainNode);
        currentClip.loop = false;
        currentClip.noteOn(0);
    },
});

function loadSoundAsync(name, file, soundManager) {
    var request = new XMLHttpRequest();
    request.open('GET', soundManager.route + file, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        soundManager._context.decodeAudioData(request.response,
                function (buffer) {
                    soundManager.clips[file] = buffer;
                },
                function (data) {
                    console.log(data);
                });
    };
    request.send();
};

/**
 * Globally-accessible instance of the sound manager
 */
var soundManager = new SoundManager();
