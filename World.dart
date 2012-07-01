class World {
  Map dataTree,mapsTree;
  TileManager tileManager;
  Camera camera;
  List<GameObject> objects;
  
  World(){
    objects = new List<GameObject>();
    camera = new Camera(0,0,1);
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
    var tile = map["tile"];
    var tile_seed = tile["seed"];
    patch_size = tile["patch_size"];
    unpackMapObjects(map["objects"]);
    tileManager = new TileManager(tile["main"],tile_seed,tile["patches"],(){
      callback();
    });
  }
  void unpackMapObjects(rol){//Raw Object List
    for (var i = 0;i<rol.length;i++){
      GameObject ob = classMap[rol[i]["type"]](rol[i]);
      addObject(ob);
    }
  }
  void unpackObjects(list){
    for (int i = 0;i<list.length;i++){
      switch(list[i]["type"]){
        case "animation":
          animationMap[list[i]["name"]] = new Animation({
            "walking":list[i]["walking"]
          });
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
    Avatar player = tags["player"][0];
    Vec2 inc = new Vec2(event.key("d") - event.key("a"),event.key("s") - event.key("w"));
    inc.normalize().multiplyScalar(4);
    player.velocity.add(inc);
    player.velocity.divideScalar(1.5);
    player.add(player.velocity);
    if (event.key("d") + event.key("a") + event.key("s") + event.key("w")>0){
      player.currentFrame += player.velocity.length();
      player.currentOrientation = player.velocity.getDirection();
    }
    
    camera.x -= (camera.x - (player.x+player.velocity.x * 5))/5;
    camera.y -= (camera.y - (player.y+player.velocity.y * 5))/5;
    
    camera.zoom += (event.key("up") - event.key("down"))/10.0;
    camera.update();
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
  }
}
