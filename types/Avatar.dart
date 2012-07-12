class Avatar extends GameObject {
  //Animation animation;
  int currentAnimation = Animation.WALK;
  int currentOrientation = 0;
  //0 - forward,1 - left, 2 - down, 3 - right
  num currentFrame = 0;
  Vec2 velocity;
  Animation animation;
  Avatar(properties):super(properties,0,0){
    velocity = new Vec2(0,0);
    this.tags.add("avatar");
    addTag(this,"avatar");
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c);
    animation.render(c,currentAnimation,currentOrientation,(currentFrame/30).toInt());
    c.restore();
  }
}
