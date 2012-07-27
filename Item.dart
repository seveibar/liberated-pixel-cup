class Item extends GameObject{
  html.ImageElement image;
  Item(properties):super(properties,0,0){
    
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c);
    c.drawImage(image,-16,-16);
    c.restore();
  }
}
