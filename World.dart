class World {
  Map dataTree,mapsTree;
  TileManager tileManager;
  OverlayManager overlay;
  Camera camera;
  List<GameObject> objects;
  
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
    tileManager = new TileManager();
    callback();
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
    inc.normalize().multiplyScalar(4);
    player.velocity.add(inc);
    player.velocity.divideScalar(1.5);
    player.add(player.velocity);
    
    
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
        avatar.add(avatar.velocity);
      });
    }
    
    //Actor Tag
    if (tags.containsKey("actor")){
      tags["actor"].forEach((Avatar actor){
        if (actor.velocity.length() > 0.1){
          actor.currentFrame += actor.velocity.length();
          actor.currentOrientation = actor.velocity.getDirection();
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
  void render(html.CanvasRenderingContext2D c){
    c.setTransform(1,0,0,1,0,0);
    c.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    c.translate(SCREEN_WIDTH/2,SCREEN_HEIGHT/2);
    c.scale(camera.animatedZoom,camera.animatedZoom);
    c.translate(-camera.x,-camera.y);
    tileManager.render(c,camera);
    objects.forEach((object){
      object.render(c);
    });
    overlay.render(c,camera);
  }
}
