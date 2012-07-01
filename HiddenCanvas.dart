class HiddenCanvas {
  html.CanvasElement canvas;
  html.CanvasRenderingContext2D context;
  HiddenCanvas(int width,int height){
    canvas = new html.Element.tag("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
  }
  //Get image from canvas
  html.ImageElement getImage(callback){
    html.ImageElement img = new html.Element.tag("img");
    String dataURL = canvas.toDataURL("image/png");
    img.on.load.add((e){
      callback(img);    
    });
    img.src = dataURL;
    return img;
  }
  //Split provided image into many images
  static List<html.ImageElement> split(html.ImageElement img,int px,int py,Function callback){
    //TODO we shouldn't be drawing the entire image for every image split
    HiddenCanvas hc = new HiddenCanvas(px,py);
    html.CanvasRenderingContext2D c = hc.context;
    int n = 0;
    int amt = 0;
    
    List<html.ImageElement> list = new List<html.ImageElement>();
    //TODO better way to fill list with null?
    while(list.length<(img.width/px) * (img.height/py)){list.add(null);}
    
    void addToList(int n){
      hc.getImage((img){
        list[n] = img;
        amt ++;
        if (amt >= list.length - 1){
          callback(list);
        }
      });
    }
    
    for(int y = 0;y>-img.height;y-=py){
      for (int x = 0;x>-img.width;x-=px){
        c.clearRect(0, 0, px, py);
        c.drawImage(img, x, y);
        addToList(n++);
      }
    }
    
  }
}
