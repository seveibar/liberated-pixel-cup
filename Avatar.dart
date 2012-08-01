class Avatar extends GameObject {
  int currentAnimation = Animation.WALK;
  int currentOrientation = 2;
  //0 - forward,1 - left, 2 - down, 3 - right
  num currentFrame = 0;
  Vec2 velocity;
  bool _attacking = false;
  Vec2 attackDirection;
  
  num damage=25,armor=1;
  int attackType = 0;
  int attackTime = 12;
  int currentAttackTime = 0;
  int timeSinceHealthChange = 0;
  num health = 100;
  bool alive = true;
  num speed = 1;
  
  bool speaking = false;
  num sayTime = 0;
  String speech = "";
  
  num attackRadius = 32;
  void set attacking(bool b){
    _attacking = b;
    currentAnimation = b ? Animation.AnimationTypes[attackType] : Animation.WALK;
  }
  bool get attacking() => _attacking;
  Animation animation;
  Animation weaponAnimation;
  Avatar(properties):super(properties,0,0){
    velocity = new Vec2(0,0);
    //this.tags.add("avatar");
    //addTag(this,"avatar");
  }
  
  void hurt(int damage,Vec2 direction){
    fireTagEvent("hit");
    health -= damage * armor;
    if (damage > 10){
      this.velocity.add(direction.multiplyScalar(damage/2));
    }
    timeSinceHealthChange = 120;
    if (alive && health <= 0){
      currentFrame = 0;
      currentAnimation = Animation.DEATH;
      currentOrientation = 0;
      tagEvents["corpse"]["init"](this);
      this.tags.add("corpse");
      addTag(this,"corpse");
      fireTagEvent("die");
      tagEvents["corpse"]["init"](this);
      alive = false;
      for (int i = this.tags.length-1;i>=0;i--){
        String tag = this.tags[i];
        if (removalOnDeath.containsKey(tag) && removalOnDeath[tag]){
          this.tags.removeRange(i, 1);
          for (int u = tagMap[tag].length-1;u>=0;u--){
            if (tagMap[tag][u] == this){
              tagMap[tag].removeRange(u,1);
              break;
            }
          }
        }
      }
    }
  }
  void say(String text){
    speaking = true;
    speech = text;
    sayTime = 600;
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c);
    animation.render(c,currentAnimation,currentOrientation,(currentFrame/5).toInt());
    if (weaponAnimation!=null){
      weaponAnimation.render(c,currentAnimation,currentOrientation,(currentFrame/5).toInt());
    }
    //Draw Health Bar
    //OPTIMIZE
    if (timeSinceHealthChange>=0){
      timeSinceHealthChange--;
      c.globalAlpha = timeSinceHealthChange/120;
      final num healthBarSize = 50.0;
      c.fillStyle = "#f00";
      c.fillRect(-healthBarSize/2, -25, healthBarSize, 5);
      c.fillStyle = "#0f0";
      c.fillRect(-healthBarSize/2, -25, health / 100.0 * healthBarSize, 5);
    }
    if (speaking){
      c.globalAlpha *= .75;
      c.font = "14px Arial";
      var bubbleWidth = c.measureText(speech).width + 20;
      c.strokeStyle = "#000";
      c.fillStyle = "#fff";
      c.fillRect(8, -12 - 30, bubbleWidth, 30);
      c.strokeRect(8, -12 - 30, bubbleWidth, 30);
      c.fillStyle = "#000";
      c.fillText(speech, 16, -22);
      c.globalAlpha /= .75;
    }
    c.restore();
  }
}
