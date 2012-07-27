class Notification {
  static final int HEIGHT = 32;
  String text;
  int timeLeft = 300;
  num y = HEIGHT;
  num ay = 0;
  Notification(this.text);
  bool render(html.CanvasRenderingContext2D c){
    c.globalAlpha = .5 * (timeLeft < 60 ? timeLeft/60 : 1);
    c.fillStyle = "#000";
    c.font = "18px Arial";
    c.fillRect(0,SCREEN_HEIGHT - ay,c.measureText(text).width + 20,HEIGHT);
    c.fillStyle = "#fff";
    c.fillText(text,10,SCREEN_HEIGHT - ay + 20);
    ay -= (ay - y)/10;
    c.globalAlpha = 1;
    return timeLeft--<=0;
  }
}
