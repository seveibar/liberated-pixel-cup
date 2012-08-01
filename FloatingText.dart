class FloatingText extends GameObject{
  int time = 0;
  FloatingText(Map properties):super(properties,0,0);
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c);
    c.globalAlpha = 1 - time/150;
    c.font = "14px Arial";
    c.fillStyle = "yellow";
    c.textAlign = "center";
    c.fillText(prop['text'],0,0);
    c.restore();
  }
  
}
