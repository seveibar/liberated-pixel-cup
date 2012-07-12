If you want to make a gif from this sprite, use Imagemagick and type:

  convert longcase_clock_32x128.png -crop 32x128 +repage -set dispose background  -loop 0 -set delay 30 longcase_clock.gif
  
Change the delay value if you want a faster or slower pendel animation.
