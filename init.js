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

var engine;
//start setup on windows load
window.onload = function () {
    var timeoutId = window.setTimeout(function () {
        if(spriteManager.ready) {
            //start game engine when the sprites are ready
            engine = new GameEngine();
            //remove this timeout
            window.clearTimeout(timeoutId);
        }
    }, 100);
};
