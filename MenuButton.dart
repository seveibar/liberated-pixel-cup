class MenuButton extends Vec2{
  String text;
  Function action;
  num width,height = 32;
  MenuButton(this.text,this.action,num x,num y):super(x,y){
    
  }
  bool clickAt(num px,num py){
    return (px - x).abs() < width/2 && (py - y).abs() < height/2;
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.font = "18px Arial";
    if (width == null){
      width = c.measureText(text).width + 20; 
    }
    c.translate(x,y);
    c.fillStyle = "#fff";
    c.fillRect(-width/2,-height/2,width,height);
    c.fillStyle = "#000";
    c.fillText(text,-width/2 + 10,0);
    c.restore();
  }
}
