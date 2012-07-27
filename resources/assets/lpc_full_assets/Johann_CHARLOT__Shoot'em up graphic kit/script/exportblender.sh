#!/bin/sh

rm -f /tmp/*.png
blender -b $1 -a
montage /tmp/*.png -geometry +0+0 -tile 16x -background none tmp.png
