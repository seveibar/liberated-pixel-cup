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
