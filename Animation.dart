class Animation {
  static final int WALKING = 1;
  FrameMap walking;
  Animation(properties){
    loadProperties(properties);
  }
  void loadProperties(properties){
    properties.forEach((k,v){
      switch(k){
        case "walking":
          loadAnimation(v,(animation){
            //TODO set walking animation equal to animation
            walking = animation;
          });
          break;
      }
    });
  }
  void loadAnimation(String path,callback){
    //Load image, split into many images, save groups of images into FrameMaps
    List<html.ImageElement> imgArray;
    res.loadSplitImage(path,(List<html.ImageElement> imgs){
      callback(new FrameMap(4,9,imgs));
    },px:64,py:64);
  }
  void render(html.CanvasRenderingContext2D c,int animation,int orientation,int frame){
    c.save();
    c.translate(-32,-32);
    if (walking!=null){
      walking.render(c, orientation,frame);
    }
    c.restore();
  }
}
