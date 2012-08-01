class Arrow extends GameObject{
  int distance = 0;
  Arrow(Map properties):super(properties,0,0);
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c);
    c.globalAlpha = 1;
    c.strokeStyle = "#fff";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(0,0);
    c.lineTo(prop["direction"].x,prop["direction"].y);
    c.stroke();
    c.closePath();
    c.restore();
  }
}
