#Gotta have 'convert' AKA Image Magick

#loop through tiles
rm -r map
mkdir map
convert $1 -crop $2x$2 \
    -set filename:nam "map/%[fx:page.x/$2]x%[fx:page.y/$2]" \
    "%[filename:nam].png"
