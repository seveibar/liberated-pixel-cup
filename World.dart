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
  num dayLength = 60 * 60 * 5;
  bool night_mode = false;
  int totalPopulation = 200;
  int saved = 0;
  int awakePopulation = 0;
  int dayCount = 0;
  int zombie_max = 50;
  int zombie_out = 0;
  Animation player_animation;
  
  bool intro = true;
  int slideTime = 0;
  int currentSlide = 0;
  final List<String> slides = const["This is the island of Dartia",
                                    "At day, all is peaceful",
                                    "But come night, horrific monsters of the black appear",
                                    "The ever-curious villagers often stray into the darkness",
                                    "Do you have what it takes to defend them?"];
  final List<num> slidex_pos = const[2400,4581,4329,2324,8221];
  final List<num> slidey_pos = const[1000,5251,6819,8114,6860];
  final List<num> slide_dir = const[2,2,3,-2,-2];
  
  bool paused;
  //List<String> dayName = const["The Beginning","Long Night","","","","","","","","","","","","","",""];
  Avatar player;
  
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
    if (intro){
      player_animation = player.animation;
      player.animation = new Animation({});
    }
    player.removeTag("citizen");
    sortScreenObjects();
    camera.set(player.x,player.y);
    paused = false;
    
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
                               "name":"Zombie Node",
                               "func":() {
                                 currentMapTree["objects"].add({
                                   "type":"node",
                                   "tag":["zombie-spawn"],
                                   "x":player.x,
                                   "y":player.y
                                 });
                               }
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
                       },{
                         "name":"Advance time one hour",
                         "func":()=>time+=1
                       },
                       {
                         "name":"Toggle Debug Mode",
                         "func":(){DEBUG=!DEBUG;}
                       },
                       {
                         "name":"Simulate 2 hours",
                         "func":(){
                           for (int i = 0;i<dayLength/12;i++){
                             update();
                           }
                         }
                       },
                       {
                         "name":"Dump Trace",
                         "func":(){
                           print("Player : Health : ${player.health} : Damage : ${player.damage} : Armor : ${player.armor}");
                         }
                       },
                       {
                        "name":"Game Over",
                        "func":()=>GameOver(game.context)
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
          if (menuInterfaces[i].clickAt(event.mouse_position.x,event.mouse_position.y)){
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
      if (!paused){
        html.window.requestAnimationFrame(cycle);
        update();
        if (event.key("T")==1){
          update();
          update();
          update();
        }
        render(context);
      }
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
    if (onscene.length >= 1){
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
  }
  void update(){
    
    rpatCount += (Math.random() * 64).toInt();
    //Day/Night Cycle Events
    if (night_mode && time>6.5 && time<21){//6:30 is wake up time
      night_mode = false;
      dayCount ++;
      notify("Day $dayCount");
      notify("Total Population : $totalPopulation");
      
      if (dayCount > 1){
        //ON DAY INCREMENT
        ZOMBIE_WANDER_DISTANCE = (ZOMBIE_WANDER_DISTANCE * 1.5).toInt();
        ZOMBIE_SPEED += .2;
        zombie_max += 10;
      }
      
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
    
    //Release Zombies (if night)
    if (night_mode){
      if (time < 4 || time > 21){
        if (zombie_out < zombie_max && rpat(32)){
          zombie_out ++;
          List<GameObject> zs_list = tags["zombie-spawn"];
          GameObject zs = zs_list[(zs_list.length * Math.random()).toInt()];
          Avatar a = spawnObject("zombie",{"x":zs.x,"y":zs.y});
        }
      }else if (zombie_out > 0 && rpat(16)){
        Avatar zom = tags["zombie"][(tags["zombie"].length * Math.random()).toInt()];
        if (!zom.hasTag("nestbound")){
          zom.removeTag("hostile");
          rmTag(zom,"hostile");
          zom.removeTag("hostile-wander");
          rmTag(zom,"hostile-wander");
          zom.tags.add("nestbound");
          addTag(zom,"nestbound");
          tagEvents["nestbound"]["init"](zom);
        }
      }
    }
    
    
    
    //Tag events
    
    //The Lost
    if (night_mode && rpat(60) && tags.containsKey("lost") && tags["lost"].length>0){
      tags["lost"][(tags["lost"].length * Math.random()).toInt()].say(lostSpeech[(lostSpeech.length * Math.random()).toInt()]);
    }
    
    if (!intro){
      //Player Tag
      Avatar player = tags["player"][0];
      Vec2 inc = new Vec2(event.key("d") - event.key("a"),event.key("s") - event.key("w"));
      inc.normalize().multiplyScalar(2 * ( 1 + 4 * event.key("shift")));
      player.velocity.add(inc);
    }else{
      slideTime ++;
      camera.x = slidex_pos[currentSlide] + slideTime * slide_dir[currentSlide];
      camera.y = slidey_pos[currentSlide] ;
      player.set(camera.x, camera.y);
      if (slideTime >= 300){
        slideTime = 0;
        currentSlide++;
        if (currentSlide>=slides.length){
          intro = false;
          notify("Day $dayCount");
          notify("Total Population : $totalPopulation");
          player.set(4793,4342);
          player.animation = player_animation;
        }
      }
    }
    
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
              List<Avatar> attacked = damageBubble(actor.clone().add(actor.attackDirection.clone().multiplyScalar(actor.attackRadius)),actor.attackRadius/2,actor.damage);
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
            }
            if (collisionAtVec2(actor.clone().addTo(0, actor.velocity.y))){
              actor.add(actor.velocity.negateY());
            }
            actor.fireTagEvent("collide");
          }else if (collisionAtVec2(actor.clone().addTo(actor.velocity.x, 0))){
            actor.add(actor.velocity.negateX());
            actor.fireTagEvent("collide");
          }else if (collisionAtVec2(actor.clone().addTo(0, actor.velocity.y))){
            actor.add(actor.velocity.negateY());
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
  int lastSaved = 0;
  void renderSaved(html.CanvasRenderingContext2D c){
    if (lastSaved != saved){
      lastSaved = saved;
      notify("Saved : $saved");
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
    if (camera.x - SCREEN_WIDTH/2 < 0){
      camera.x = SCREEN_WIDTH/2;
    }else if (camera.x + SCREEN_WIDTH/2 > map_width*32){
      camera.x = map_width*32-SCREEN_WIDTH/2;
    }
    //Note that the map is square, map_width = map_height
    if (camera.y - SCREEN_HEIGHT/2 < 0){
      camera.y = SCREEN_HEIGHT/2;
    }else if (camera.y + SCREEN_HEIGHT/2 > map_width*32){
      camera.y = map_width*32 - SCREEN_HEIGHT/2;
    }
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
    }
    topTileManager.render(c,camera);
    c.restore();
    overlay.render(c,camera);
    menuInterfaces.forEach((MenuInterface mi){
      mi.render(c);
    });
    renderNotifications(c);
    renderSaved(c);
    if (intro){
      c.globalAlpha = 1;
      c.fillStyle = "#000";
      c.fillRect(0,SCREEN_HEIGHT-50,SCREEN_WIDTH,50);
      c.fillStyle = "#fff";
      c.font = "24px Arial";
      c.fillText(slides[currentSlide], 50, SCREEN_HEIGHT - 20);
      c.fillStyle = "#000";
      c.globalAlpha = Math.pow((slideTime - 150)/150,2);
      c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      c.globalAlpha = 1;
    }
  }
}
