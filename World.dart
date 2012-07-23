class World {
  Map dataTree,mapsTree;
  TileManager bottomTileManager;
  TileManager topTileManager;
  OverlayManager overlay;
  Camera camera;
  List<GameObject> objects;
  List<bool> collisionMap; 
  
  World(){
    objects = new List<GameObject>();
    camera = new Camera(0,0,1);
    overlay = new OverlayManager();
  }
  void load(String json,callback){
    print("Beginning Parse");
    dataTree = JSON.parse(json);
    List objectList = dataTree["objects"];
    mapsTree = dataTree["maps"];
    print("Unpacking Game");
    unpackObjects(objectList);
    print("Data Parsed, Loading Test Map");
    loadMap("test",callback); //TODO remove
  }
  void loadMap(name,callback){
    var map = mapsTree[name];
    unpackMapObjects(map["objects"]);
    bottomTileManager = new TileManager("map_bottom");
    topTileManager = new TileManager("map_top");
    res.loadFile(map["collision-map"],(data){
      fmtCollisionMap(data);
      callback();
    });
  }
  void spawnObject(String type,Map props){
    GameObject ob = classMap[type](props);
    ob.tags.add(type);
    addTag(ob,type);
    addObject(ob);
    return ob;
  }
  void unpackMapObjects(rol){//Raw Object List
    for (var i = 0;i<rol.length;i++){
      spawnObject(rol[i]["type"],rol[i]);
    }
  }
  void unpackObjects(list){
    for (int i = 0;i<list.length;i++){
      switch(list[i]["type"]){
        case "animation":
          animationMap[list[i]["name"]] = new Animation(list[i]);
          break;
        case "avatar":
          classMap[list[i]['name']] = (p){
            Avatar a = new Avatar(list[i]["properties"]);
            a.loadProperties(p);
            return a;
          };
          break;
        default:
          print("Type not found: ${list[i]['type']}");
          break;
      }
    }
  }
  void fmtCollisionMap(String data){
    collisionMap = new List<bool>();
    List<String> chars = data.splitChars();
    for (int cir = 0;cir<data.length * 4;cir++){
      int ci = (cir/4).toInt();
      int bseq = cir%4;
      List<int> hexMap = binaryHexMap[chars[ci]];
      if (hexMap!=null){
        collisionMap.add((hexMap[bseq] == 1)?true:false);
      }
    }
    print("Collision Map Loaded, Size : ${collisionMap.length}");
  }
  bool collisionAt(num x,num y){
    x = (x/GRAPHIC_BLOCK_SIZE).toInt();
    y = (y/GRAPHIC_BLOCK_SIZE+.5).toInt();
    return collisionMap[x + y  * 200];//TODO replace 200 with width
  }
  bool collisionAtVec2(Vec2 v){
    return collisionAt(v.x,v.y);
  }
  void addObject(GameObject instance){
    objects.add(instance);
  }
  void startCycle(context){
    bool cycle(int a){
      html.window.requestAnimationFrame(cycle);
      update();
      render(context);
    }
    cycle(0);
  }
  void update(){
    
    //Tag events
    
    //Player Tag
    Avatar player = tags["player"][0];
    Vec2 inc = new Vec2(event.key("d") - event.key("a"),event.key("s") - event.key("w"));
    inc.normalize().multiplyScalar(2);
    player.velocity.add(inc);
    player.velocity.divideScalar(1.5 * (player.attacking ? 2 : 1));
    
    //Check if player is trying to attack
    if (event.mouseDown){
      player.attacking = true;
      player.attackDirection = event.mouse_position.clone().subTo(SCREEN_WIDTH/2,SCREEN_HEIGHT/2).normalize();
    }else{
      player.attacking = false;
    }
    
    
    camera.x -= (camera.x - (player.x+player.velocity.x * 5))/5;
    camera.y -= (camera.y - (player.y+player.velocity.y * 5))/5;
    
    camera.zoom += (event.key("up") - event.key("down"))/10.0;
    camera.update();
    
    //Wander Tag
    if (tags.containsKey("wander")){
      tags["wander"].forEach((Avatar avatar){
        if (avatar.prop.containsKey("destination") && avatar.prop["destination"].distanceTo(avatar)>2){
          Vec2 destination = avatar.prop["destination"];
          avatar.velocity = destination.clone().sub(avatar).normalize();
        }else{
          avatar.prop["destination"] = avatar.clone().addTo(Math.random() * 100 - 50,Math.random() * 100 - 50);
        }
      });
    }
    
    //Actor Tag
    if (tags.containsKey("actor")){
      tags["actor"].forEach((Avatar actor){
        if (actor.alive){
          if (actor.attacking){
            actor.currentAttackTime = actor.currentAttackTime + 1;
            if (actor.currentAttackTime > actor.attackTime){
              //Assume melee
              actor.currentAttackTime = 0;
              //print(actor.attackDirection.clone().multiplyScalar(actor.attackRadius).toString());
              //print(actor.clone().add(actor.attackDirection.clone().multiplyScalar(actor.attackRadius)).toString());
              damageBubble(actor.clone().add(actor.attackDirection.clone().multiplyScalar(actor.attackRadius)),actor.attackRadius/2,100);
            }
            int timeToAttack = actor.currentAttackTime - actor.attackTime + 6;
            actor.currentFrame += (timeToAttack > 0) ? timeToAttack : 0;
            actor.currentOrientation = actor.attackDirection.getDirection();
          }else{
            if (actor.velocity.length() > 0.1){
              actor.currentFrame += actor.velocity.length();
              actor.currentOrientation = actor.velocity.getDirection();
            }
          }
          if (collisionAtVec2(actor.clone().add(actor.velocity))){
            //Figure out if it's on the left or right side
            if (collisionAtVec2(actor.clone().addTo(actor.velocity.x, 0))){
              actor.add(actor.velocity.negateX());
            }else if (collisionAtVec2(actor.clone().addTo(0, actor.velocity.y))){
              actor.add(actor.velocity.negateY());
            }else{
              actor.add(actor.velocity.negate());
            }
            actor.fireTagEvent("collide");
          }else{
            actor.add(actor.velocity);
          }
        }else{
          //If actor is dead
          if (actor.currentFrame < 25){
            actor.currentFrame ++;
          }
        }
      });
    }
    
    //Spawn Tag
    if (tags.containsKey("spawn")){
      tags["spawn"].forEach((SpawnPoint spawn){
        spawn.update();
      });
    }
    
    
    //Sort Objects
    
    //Objects have to be in the correct order for rendering to work properly;
    //To avoid sorting all the objects every frame, we'll sort a few every frame,
    //and hope they eventually line up right
    //TODO revise this, maybe have a grid-based system
    
    for (int iter = 0;iter < 1 + objects.length / 4;iter++){
      int i0 = (Math.random() * objects.length).toInt();
      //It's more likely to switch places if i1 is near i0
      int i1 = (i0 + Math.random() * 6 - 3).toInt() % objects.length;
      
      if (i0 > i1){
        int a = i0;
        i0 = i1;
        i1 = a;
      }
      if (i0 != i1){
        Vec2 a0 = objects[i0];
        Vec2 a1 = objects[i1];
        if (a0.y > a1.y){
          objects[i0] = a1;
          objects[i1] = a0;
        }
      }
    }
  }
  void damageBubble(point,radius,damage){
    tags["actor"].forEach((Avatar actor){
      if (actor.alive && actor.distanceTo(point) < radius){
        actor.hurt(damage);
      }
    });
  }
  void render(html.CanvasRenderingContext2D c){
    c.setTransform(1,0,0,1,0,0);
    c.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    c.translate(SCREEN_WIDTH/2,SCREEN_HEIGHT/2);
    c.scale(camera.animatedZoom,camera.animatedZoom);
    c.translate(-camera.x,-camera.y);
    bottomTileManager.render(c,camera);
    objects.forEach((object){
      object.render(c);
    });
    topTileManager.render(c,camera);
    overlay.render(c,camera);
  }
}
