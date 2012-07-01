#Gotta have 'convert' AKA Image Magick

#loop through tiles
for f in tile_*.png
do convert $f -crop 32x32 "tiles/${f%\.*}_%d.png"
done
