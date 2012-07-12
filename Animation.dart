class Animation {
  static final int WALK = 1;
  static final int SLASH = 2;
  List<FrameMap> frameMapIndex;
  Animation(properties){
    frameMapIndex = new List<FrameMap>(3);
    loadProperties(properties);
  }
  void loadProperties(properties){
    properties.forEach((k,v){
      switch(k){
        case "walk":
          loadAnimation(v,(animation){
            frameMapIndex[WALK] = animation;
          });
          break;
        case "slash":
          loadAnimation(v,(animation){
            frameMapIndex[SLASH] = animation;
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
    FrameMap fmap = frameMapIndex[animation];
    if (fmap!=null){
      fmap.render(c, orientation,frame);
    }
    c.restore();
  }
}
