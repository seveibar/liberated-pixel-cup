# Big Island video game source code file
# Copyright (C) 2012  Severin Ibarluzea
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
echo "---------------------------------"
echo "First, export your tmx map file to NAME.json"
echo "Now save everything *below* the player on the map as NAME_bottom.png"
echo "Now save everything *above* the player on the map as NAME_top.png"
echo "---------------------------------"
echo "What is the NAME?"
read NAME
echo "---------------------------------"
echo "Now we'll slice up the map image so the game can load it"
echo "This is going to take a bit, get a snack"
echo "---------------------------------"
sh split_map.sh "${NAME}_bottom.png" "map_bottom" 256
sh split_map.sh "${NAME}_top.png" "map_top" 256
echo "---------------------------------"
echo "Now we'll create a binary collision map in hex for the game to load"
echo "---------------------------------"
python extract_collision.py "$NAME.json"
echo "All set! Run the game!"
