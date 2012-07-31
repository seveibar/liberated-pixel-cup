class World {
  Map dataTree,mapsTree,currentMapTree;
  TileManager bottomTileManager;
  TileManager topTileManager;
  List<MenuInterface> menuInterfaces;
  OverlayManager overlay;
  Camera camera;
  List<GameObject> objects;
  List<GameObject> onscene,offscene;
  int map_width;
  List<bool> collisionMap; 
  List<html.ImageElement> itemImages;
  List<Path> paths;
  List<PathNode> pathnodes;
  num time = 7;//24:00 clock
  num dayLength = 60 * 60;
  bool night_mode = true;
  int totalPopulation = 200;
  int awakePopulation = 0;
  int dayCount = 0;
  //List<String> dayName = const["The Beginning","Long Night","","","","","","","","","","","","","",""];
  GameObject player;
  
  World(){
    objects = new List<GameObject>();
    onscene = new List<GameObject>();
    offscene = new List<GameObject>();
    camera = new Camera(0,0,1);
    overlay = new OverlayManager();
    menuInterfaces = new List<MenuInterface>();
    paths = new List<Path>();
    pathnodes = new List<PathNode>();
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
    unpackMapPaths(map['paths']);
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
  void unpackMapPaths(List<Map> lst){
    lst.forEach((Map raw){
      //Make vec2
      List<Vec2> points = new List<Vec2>();
      for (int i = 0;i<raw["point_x"].length;i++){
        points.add(new Vec2(raw["point_x"][i],raw["point_y"][i]));
      }
      Path path;
      paths.add(path = new Path(points[0],points[points.length-1],points,raw["startHouse"],raw["endHouse"]));
      pathnodes.add(path.start);
      pathnodes.add(path.end);
    });
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
        case "node":
          classMap[list[i]['name']] = (p){
          GameObject a = new GameObject(list[i]["properties"],0,0);
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
    map_width = Math.sqrt(collisionMap.length).ceil().toInt();
    print("Collision Map Loaded, Size : ${collisionMap.length}");
  }
  bool collisionAt(num x,num y){
    x = (x/GRAPHIC_BLOCK_SIZE).toInt();
    y = (y/GRAPHIC_BLOCK_SIZE+.5).toInt();
    return collisionMap[x + y  * map_width];
  }
  bool collisionAtVec2(Vec2 v){
    return collisionAt(v.x,v.y);
  }
  void addObject(GameObject instance){
    objects.add(instance);
    offscene.add(instance);
  }
  List<PathNode> getClosePathNodes(Vec2 v){
    List<PathNode> cnodes = new List<PathNode>();
    pathnodes.forEach((PathNode node){
      if (node.distanceTo(v) < 256){
        cnodes.add(node);
      }
    });
    return cnodes;
  }
  void startCycle(context){
    //Set camera to player position
    player = tags["player"][0];
    sortScreenObjects();
    camera.set(player.x,player.y);
    
    if (DEBUG){
      List<Vec2> debugPathNodes = new List<Vec2>();
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
                                   "night-only":true,
                                   "emit-properties":{
                                     "tag":[
                                            "ai"
                                      ]
                                   },
                                   "freq":240,
                                   "limit":3,
                                   "x":player.x,
                                   "y":player.y
                                 });
                               }
                             },{
                               "name":"Basic Bee",
                               "func":() => print("Create basic Bee emitter")
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
                                 "x":player.x.toInt(),
                                 "y":player.y.toInt()
                                 
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
                                           "x":player.x.toInt(),
                                           "y":player.y.toInt()
                                         })
                                        }
                              ] 
                           }));
                         }
                       },
                       {
                        "name":"Place Node",
                        "func": () => menuInterfaces.add(new MenuInterface("options",{
                          "options":[
                                     {
                                       "name":"House Node",
                                       "func":() => currentMapTree["objects"].add({
                                         "type":"node",
                                         "tag":["house"],
                                         "x":player.x.toInt(),
                                         "y":player.y.toInt()                                   
                                       })
                                     },
                                     {
                                       "name":"Path Node",
                                       "func":() => debugPathNodes.add(player.clone())
                                       
                                     },
                                     {
                                       "name":"End Path Node",
                                       "func":() {
                                         debugPathNodes.add(player.clone());
                                         List<int> ax = new List<int>();
                                         List<int> ay = new List<int>();
                                         debugPathNodes.forEach((Vec2 node){
                                           ax.add(node.x.toInt());
                                           ay.add(node.y.toInt());
                                         });
                                         
                                         Vec2 end = debugPathNodes[debugPathNodes.length - 1];
                                         Vec2 start = debugPathNodes[0];
                                         
                                         bool endHouse = false;
                                         bool startHouse = false;
                                         
                                         tags["house"].forEach((GameObject house){
                                           if (house.distanceTo(end) < 256){
                                             endHouse = true;
                                           }
                                           if (house.distanceTo(start) < 256){
                                             startHouse = true;
                                           }
                                         });
                                         
                                         currentMapTree["paths"].add({
                                           "type":"path",
                                           "point_x":ax,
                                           "point_y":ay,
                                           "endHouse":endHouse,
                                           "startHouse":startHouse
                                         });
                                         debugPathNodes = new List<Vec2>();
                                       }
                                       
                                     }
                          ]
                        }))
                       }
                       ,{
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
        if (tags.containsKey("item")){
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
        }
      });
    }
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
  void sortScreenObjects(){
    //Find objects that are onscreen in offscene and switch
    for (int iter = (Math.random() * offscene.length).toInt(),times = 0;times < offscene.length/16+1;iter++,times++){
      int i = iter%offscene.length;
      if (offscene[i].distanceTo(player) < RENDER_DISTANCE){
        onscene.add(offscene[i]);
        offscene.removeRange(i, 1);
      }else if (offscene[i].markedForRemoval){
        offscene.removeRange(i, 1);
      }
    }
    //Find objects that are offscreen in onscene and switch
    for (int iter = (Math.random() * onscene.length).toInt(),times = 0;times < onscene.length/16;iter++,times++){
      int i = iter%onscene.length;
      if (onscene[i].distanceTo(player) > RENDER_DISTANCE){
        offscene.add(onscene[i]);
        onscene.removeRange(i, 1);
      }else if (onscene[i].markedForRemoval){
        onscene.removeRange(i, 1);
      }
    }
    
    
    //Objects have to be in the correct order for rendering to work properly;
    //To avoid sorting all the objects every frame, we'll sort a few every frame,
    //and hope they eventually line up right
    //TODO revise this, maybe have a grid-based system
    
    for (int iter = 0;iter < 1 + onscene.length / 4;iter++){
      int i0 = (Math.random() * onscene.length).toInt();
      //It's more likely to switch places if i1 is near i0
      int i1 = (i0 + Math.random() * 6 - 3).toInt() % onscene.length;
      
      if (i0 > i1){
        int a = i0;
        i0 = i1;
        i1 = a;
      }
      if (i0 != i1){
        Vec2 a0 = onscene[i0];
        Vec2 a1 = onscene[i1];
        if (a0.y > a1.y){
          onscene[i0] = a1;
          onscene[i1] = a0;
        }
      }
    }
  }
  void update(){
    
    //Day/Night Cycle Events
    if (night_mode && time>6.5 && time<21){//6:30 is wake up time
      night_mode = false;
      dayCount ++;
      notify("Day $dayCount");
      notify("Total Population : $totalPopulation");
      
      //Lost citizens become unlost during the day
      if (tags.containsKey("lost")){
        tags["lost"].forEach((Avatar a){
          a.removeTag("lost");
          rmTag(a,"lost");
        });
      }
      if (tags.containsKey("following")){
        tags["following"].forEach((Avatar a){
          switchTag(a,"following","wander");
          a.say("Thank you!");
          a.tags.add("nice");
          addTag(a,"nice");
        });
      }
      if (tags.containsKey("zombie")){
        tags["zombie"].forEach((Avatar a){
          a.markForRemoval();
        });
      }
      
    }else if (!night_mode && (time > 21 || time < 6.5)){
      night_mode = true;
      //Send citizens into their houses
      tags["wander"].forEach((Avatar citizen){
        if (citizen.hasTag("ai") && !citizen.hasTag("lost") && citizen.hasTag("citizen")){
          if (Math.random() < .9){
            switchTag(citizen,"wander","homebound");
            tagEvents["homebound"]["init"](citizen);
          }else{
            citizen.tags.add("lost");
            addTag(citizen,"lost");
          }
        }
      });
      notify("Lost Citizens : ${tags['lost'].length}");
    }
    if (!night_mode && time > 16 && rpat(5)){
      Avatar citizen = tags["wander"][(tags["wander"].length * Math.random()).toInt()];
      if (citizen.hasTag("ai") && !citizen.hasTag("lost") && citizen.hasTag("citizen")){
        if (Math.random() < .9){
          switchTag(citizen,"wander","homebound");
          tagEvents["homebound"]["init"](citizen);
        }else{
          citizen.tags.add("lost");
          addTag(citizen,"lost");
        }
      }
    }
    if(!night_mode && time < 12 && awakePopulation < totalPopulation){
      //Get a random house
      GameObject house = tags["house"][(tags["house"].length * Math.random()).toInt()];
      //Spawn a citizen at the house
      spawnObject("citizen",{
        "tag":["friendly",(Math.random()<.5)?"wander":"traveler","ai"],
        "x":house.x,
        "y":house.y,
        "home":house
      });
      awakePopulation ++;
    }
    
    
    
    //Tag events
    
    //The Lost
    if (night_mode && rpat(60) && tags.containsKey("lost") && tags["lost"].length>0){
      tags["lost"][(tags["lost"].length * Math.random()).toInt()].say(lostSpeech[(lostSpeech.length * Math.random()).toInt()]);
    }
    
    //Player Tag
    Avatar player = tags["player"][0];
    Vec2 inc = new Vec2(event.key("d") - event.key("a"),event.key("s") - event.key("w"));
    inc.normalize().multiplyScalar(2 * ( 1 + 4 * event.key("shift")));
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
    
    for (String tag in tags.getKeys()){
      List<GameObject> lst = tags[tag];
      for (int i = (Math.random() * lst.length).toInt(),iter = 0;iter<lst.length/16;iter++,i++){
        int index = i%lst.length;
        if (lst[index].markedForRemoval){
          lst.removeRange(index, 1);
        }
      }
    }
    
    for (int i = (objects.length * Math.random()).toInt(),iter = 0;iter<objects.length/16;iter++,i++){
      int index = i%objects.length;
      if (objects[index].markedForRemoval){
        objects.removeRange(index,1);
      }
    }
    
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
    
    sortScreenObjects();
    
    
    time = (time + 24 / dayLength)%24;
    //print(time);
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
    onscene.forEach((object){
      object.render(c);
    });
    if (DEBUG){
      c.globalAlpha = .5;
      paths.forEach((Path path){
        c.beginPath();
        c.strokeStyle = "#fff";
        c.lineWidth = 5;
        c.lineCap = "round";
        c.fillStyle = "#fff";
        c.moveTo(path.start.x, path.start.y);
        path.points.forEach((Vec2 point){
          c.lineTo(point.x,point.y);
        });
        c.stroke();
        c.closePath();
      });
      topTileManager.render(c,camera);
    }
    c.restore();
    overlay.render(c,camera);
    menuInterfaces.forEach((MenuInterface mi){
      mi.render(c);
    });
    renderNotifications(c);
  }
}
