class MenuButton extends Vec2{
  String text;
  Function action;
  static final scale = 1.5;
  final num width = 128 * scale,height = 32 * scale;
  MenuButton(this.text,this.action,num x,num y):super(x,y){
    
  }
  bool clickAt(num px,num py){
    return (px - x).abs() < width/2 && (py - y).abs() < height/2;
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    c.scale(1.5,1.5);
    c.drawImage(world.uiImages[25], -64, -16);
    c.drawImage(world.uiImages[26], -32, -16);
    c.drawImage(world.uiImages[26], 0, -16);
    c.drawImage(world.uiImages[27], 32, -16);
    c.globalAlpha = .75;
    c.font = "12px Arial";
    c.textAlign = "center";
    c.fillStyle = "#fff";
    c.fillText(text, 0, 4);
    c.restore();
  }
}
