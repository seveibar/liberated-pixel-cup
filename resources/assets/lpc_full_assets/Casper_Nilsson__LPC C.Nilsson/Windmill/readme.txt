If you want to make a gif from this sprite, use Imagemagick and type:

convert windmill.png -crop 224x320 +repage -set dispose background  -loop 0 -set delay 6 windmill.gif
