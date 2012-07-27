class World {
  Map dataTree,mapsTree,currentMapTree;
  TileManager bottomTileManager;
  TileManager topTileManager;
  List<MenuInterface> menuInterfaces;
  OverlayManager overlay;
  Camera camera;
  List<GameObject> objects;
  List<bool> collisionMap; 
  List<html.ImageElement> itemImages;
  
  World(){
    objects = new List<GameObject>();
    camera = new Camera(0,0,1);
    overlay = new OverlayManager();
    menuInterfaces = new List<MenuInterface>();
  }
  void load(String json,callback){
    print("Beginning Parse");
    dataTree = JSON.parse(json);
    List objectList = dataTree["objects"];
    mapsTree = dataTree["maps"];
    print("Unpacking Game");
    unpackObjects(objectList);
    print("Data Parsed, Loading Test Map");
    res.loadSplitImage("items.png",(List<html.ImageElement> imgs){
      itemImages = imgs;
      loadMap("test",callback); //TODO remove
    });
  }
  void loadMap(name,callback){
    var map = currentMapTree = mapsTree[name];
    unpackMapObjects(map["objects"]);
    bottomTileManager = new TileManager("map_bottom");
    topTileManager = new TileManager("map_top");
    res.loadFile(map["collision-map"],(data){
      fmtCollisionMap(data);
      callback();
    });
  }
  GameObject spawnObject(String type,Map props){
    GameObject ob = classMap[type](props);
    ob.type = type;
    ob.tags.add(type);
    ob.tags.add("uninit");
    addTag(ob,type);
    addTag(ob,"uninit");
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
        case "item":
          classMap[list[i]['name']] = (p){
            Item a = new Item(list[i]["properties"]);
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
    //Set camera to player position
    camera.set(tags["player"][0].x, tags["player"][0].y);
    
    if (DEBUG){
      event.onKeyPress.add((e){
        if (event.key("space")==1 && menuInterfaces.length == 0){
          String prompt(String s,[String def = ""]){
            return html.window.prompt(s, def);
          }
          menuInterfaces.add(new MenuInterface("options",{
            "options":[{
                         "name":"Place Spawn",
                         "func":(){
                           //What kind of spawn?
                           menuInterfaces.add(new MenuInterface("options",{
                             "options":[{
                               "name":"Basic Zombie",
                               "func":() {
                                 currentMapTree["objects"].add({
                                   "type":"spawn",
                                   "emit":"zombie",
                                   "emit-properties":{
                                     "tag":[
                                            "ai"
                                      ]
                                   },
                                   "freq":240,
                                   "limit":3,
                                   "x":tags["player"][0].x,
                                   "y":tags["player"][0].y
                                 });
                                 notify("Basic Zombie Created");
                               }
                             },{
                               "name":"Basic Bee",
                               "func":() => print("Create basic Bee emitter")
                             },{
                               "name":"Night Zombie",
                               "func":() => print("Create Night Zombie emitter")
                             },{
                               "name":"Custom Emitter",
                               "func":() => currentMapTree["objects"].add({
                                 "type":"spawn",
                                 "emit":prompt("Emit Type"),
                                 "emit-properties":{
                                   "tag":prompt("Emit Properties (',' delimited)").split(",")
                                 },
                                 "freq":Math.parseInt(prompt("Freq (60 = 1 second)")),
                                 "limit":Math.parseInt(prompt("Limit")),
                                 "x":tags["player"][0].x.toInt(),
                                 "y":tags["player"][0].y.toInt()
                                 
                               })
                             }
                             ]
                           }));
                           
                         }
                       },{
                         "name":"Place Object",
                         "func":(){
                           menuInterfaces.add(new MenuInterface("options",{
                             "options":[
                                        {
                                         "name":"Custom Object",
                                         "func":()=>currentMapTree["objects"].add({
                                           "type":prompt("Type"),
                                           "tag":prompt("Tags, delimit with ','").split(","),
                                           "x":tags["player"][0].x.toInt(),
                                           "y":tags["player"][0].y.toInt()
                                         })
                                        }
                              ] 
                           }));
                         }
                       },{
                         "name":"Get JSON",
                         "func":() => print(html.window.open("javascript:document.body.innerHTML='${JSON.stringify(dataTree)}';", "JSON Data",'height=300,width=300'))
                       }]
          }));
        }
      });
      event.onClick.add((e){
        //Do menu stuff
        if (menuInterfaces.length != 0){
          event.mouseDown = false;
        }
        for (int i = menuInterfaces.length-1;i>=0;i--){
          if (menuInterfaces[i].clickAt(e.pageX,e.pageY)){
            menuInterfaces.removeRange(i, 1);
          }
        }
        //Check if player is near items
        Avatar player = tags["player"][0];
        tags["item"].some((Item item){
          if (player.distanceTo(item) < 32){
            event.mouseDown = false;
            notify("You found ${item.prop.containsKey('properName')?item['properName']:item.type}");
            pickUpItem(item);
            return true;
          }
          return false;
        });
      });
    }
    notify("Game Started");
    bool cycle(int a){
      html.window.requestAnimationFrame(cycle);
      update();
      render(context);
    }
    cycle(0);
  }
  html.ImageElement getItemImage(int index){
    if (itemImages != null){
      return itemImages[index];
    }else{
      return BLANK_IMAGE;
    }
  }
  void pickUpItem(Item item){
    print("TODO : MAKE PICK UP ITEM");
  }
  void update(){
    
    //Tag events
    
    //Player Tag
    Avatar player = tags["player"][0];
    Vec2 inc = new Vec2(event.key("d") - event.key("a"),event.key("s") - event.key("w"));
    inc.normalize().multiplyScalar(10);
    player.velocity.add(inc);
    
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
    
    //Uninit Tag (newly spawns)
    if (tags.containsKey("uninit")){
      tags["uninit"].forEach((GameObject ob){
        ob.fireTagEvent("init");
        ob.removeTag("uninit");
      });
      tags["uninit"] = new List<GameObject>();
    }
    
    //Update All Tags
    
    objects.forEach((GameObject g) => g.fireTagEvent("update"));
    
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
              List<Avatar> attacked = damageBubble(actor.clone().add(actor.attackDirection.clone().multiplyScalar(actor.attackRadius)),actor.attackRadius/2,100);
              for (int i = 0;i<attacked.length;i++){
                if (!attacked[i].alive){
                  actor.fireTagEvent("kill");
                }
              }
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
          actor.velocity.divideScalar(1.5 * (actor.attacking ? 2 : 1));
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
  List<Avatar> damageBubble(point,radius,damage){
    List<Avatar> attacked = new List<Avatar>();
    tags["actor"].forEach((Avatar actor){
      if (actor.alive && actor.distanceTo(point) < radius){
        attacked.add(actor);
        actor.hurt(damage);
      }
    });
    return attacked;
  }
  void render(html.CanvasRenderingContext2D c){
    c.setTransform(1,0,0,1,0,0);
    c.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    c.save();
    c.translate(SCREEN_WIDTH/2,SCREEN_HEIGHT/2);
    c.scale(camera.animatedZoom,camera.animatedZoom);
    c.translate(-camera.x,-camera.y);
    c.font = "12px Arial";
    bottomTileManager.render(c,camera);
    objects.forEach((object){
      object.render(c);
    });
    topTileManager.render(c,camera);
    overlay.render(c,camera);
    c.restore();
    menuInterfaces.forEach((MenuInterface mi){
      mi.render(c);
    });
    renderNotifications(c);
  }
}
