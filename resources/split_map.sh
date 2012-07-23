#Gotta have 'convert' AKA Image Magick

#loop through tiles
rm -r $2
mkdir $2
convert $1 -crop $3x$3 \
    -set filename:nam "$2/%[fx:page.x/$3]x%[fx:page.y/$3]" \
    "%[filename:nam].png"
