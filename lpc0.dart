#import('dart:html',prefix:"html");
#import('dart:json');

#source("web.dart");
#source("res.dart");

#source("PathNode.dart");
#source("Path.dart");
#source("GameObject.dart");
#source("SpawnPoint.dart");
#source("Avatar.dart");
#source("Item.dart");

#source("HiddenCanvas.dart");
#source("Vec2.dart");
#source("Camera.dart");
#source("UIManager.dart");

#source("Color.dart");

#source("TileManager.dart");
#source("OverlayManager.dart");
#source("MenuButton.dart");
#source("MenuInterface.dart");
#source("World.dart");

#source("FrameMap.dart");
#source("Animation.dart");

#source("Notification.dart");

#resource('main.css');

final int GRAPHIC_BLOCK_SIZE = 32;
final int CHUNK_SIZE = 8;
final int CHUNK_JOIN = 10;

final bool DEBUG = true;
final bool MOBILE = false;

int AGRO_DISTANCE = 256;
int ZOMBIE_WANDER_DISTANCE = 256;

int patch_size;

num niceFactor = 0;

html.ImageElement BLANK_IMAGE;

final Map binaryHexMap = const{
  "0":const[0,0,0,0],"1":const[0,0,0,1],"2":const[0,0,1,0],"3":const[0,0,1,1],
  "4":const[0,1,0,0],"5":const[0,1,0,1],"6":const[0,1,1,0],"7":const[0,1,1,1],
  "8":const[1,0,0,0],"9":const[1,0,0,1],"a":const[1,0,1,0],"b":const[1,0,1,1],
  "c":const[1,1,0,0],"d":const[1,1,0,1],"e":const[1,1,1,0],"f":const[1,1,1,1]
};

final List<String> friendlySpeech = const[
   "Hi!",
   "Hiya!",
   "Hello!",
   "It's not so scary with you around!",
   "Thanks for the help!"
];
final List<String> lostSpeech = const[
                                      "Help!",
                                      "Where is everyone?",
                                      "Where do I go?",
                                      "Please help me!",
                                      "Where am I?"
                                      ];
final List<String> meanSpeech = const[
                                          "Why don't you just go?",
                                          "Get outta here!",
                                          "Get out!",
                                          "Why won't you help us?",
                                          "It's outsiders like you that caused this!"
                                       ];
final List<String> foundSpeech = const[
                                      "Can you take me somewhere safe?",
                                      "Please help me!",
                                      "Please take me home!"
                                   ];

Map<String,Map<String,Function>> tagEvents;

Map<String,bool> removalOnDeath = const{
  "wander":true,
  "nice":true,
  "hostile":true,
  "hostile-wander":true
};

Map<String,List<GameObject>> tags; //These are the same thing (dirty work around)
Map<String,List<GameObject>> tagMap;// <<<<<
Map<String,Object> classMap;
Map<String,Animation> animationMap;

void addTag(Dynamic object,String tag) => tags[tag] == null ? tags[tag] = new List<GameObject>.from([object]) : tags[tag].add(object);
void rmTag(Dynamic object,String tag) {
  int index = tags[tag].indexOf(object);
  if (index!=-1){
    tags[tag].removeRange(index,1);
  }
}

int SCREEN_WIDTH;
int SCREEN_HEIGHT;
int RENDER_DISTANCE;

num RESOLUTION = 1;

UIManager event;

List<Notification> notifications;

World world;


void renderNotifications(html.CanvasRenderingContext2D c){
  for (int i = notifications.length-1;i>=0;i--){
    if (notifications[i].render(c)){
      notifications.removeRange(i,1);
    }
  }
}
void notify(String text){
  notifications.forEach((Notification note){
    note.y += Notification.HEIGHT;
  });
  notifications.add(new Notification(text));
}
void switchTag(GameObject o,String oldTag,String newTag){
  o.removeTag(oldTag);
  rmTag(o,oldTag);
  o.tags.add(newTag);
  addTag(o,newTag);
}
int rpatCount = 0;
bool rpat(int n){
  return ((rpatCount ++)%n == 0);
}
void main() {
  new Game();
}
class Game {
  html.CanvasElement canvas;
  html.CanvasRenderingContext2D context;
  
  Game(){
    classMap = {
        "spawn":(p)=>new SpawnPoint(p),
        "avatar":(p)=>new Avatar(p),
        "node":(p)=>new GameObject(p,0,0)
    };
    tagEvents = {
        "citizen":{
          "init":(Avatar avatar){
            num r = Math.random() + niceFactor;
            if (r<.1){
              avatar.tags.add("mean");
              addTag(avatar,"mean");
            }else if (r>1){
              avatar.tags.add("nice");
              addTag(avatar,"nice");
            }
          },
          "die":(Avatar avatar){
            world.totalPopulation --;
            world.awakePopulation --;
          }
        },
        "traveler":{
          "init":(Avatar a){
            List<PathNode> cnodes = world.getClosePathNodes(a);
            if (cnodes.length > 0){
              int ni;
              if (world.time < 16){
                ni = (cnodes.length * Math.random()).toInt();
              }else{
                for (int i = cnodes.length-1;i>=0;i--){
                  if (cnodes[i].start){
                    ni = i;
                    break;
                  }
                }
              }
              a["path"] = cnodes[ni].path;
              a["pathDirection"] = cnodes[ni].start ? 1 : -1;
              a["pathIndex"] = cnodes[ni].start ? 0 : cnodes[ni].path.points.length - 1;
              a["pathPoint"] = cnodes[ni].clone();
              a["pathMove"] = cnodes[ni].clone().sub(a).normalize();
            }else{
              switchTag(a,"traveler","wander");
            }
          },
          "update":(Avatar a){
            a.velocity.add(a["pathMove"]);
            if (a["pathPoint"].distanceTo(a) < 32){
              a["pathIndex"] += a["pathDirection"];
              if (a["pathIndex"] < 0 || a["pathIndex"] >= a["path"].points.length){
                tagEvents["traveler"]["init"](a);
              }else{
                a["pathPoint"] = a["path"].points[a["pathIndex"]].clone();
                num d = a.distanceTo(a["pathPoint"])/4;
                a["pathPoint"].addTo(Math.random() * d - d/2,Math.random() * d - d/2);
                a["pathMove"] = a["pathPoint"].clone().sub(a).normalize();
              }
            }
          }
        },
        "homebound":{
          "init":(Avatar avatar){
            avatar["homeboundDirection"] = avatar["home"].clone().sub(avatar).normalize().divideScalar(2);
          },
          "update":(Avatar avatar){
            avatar.velocity.add(avatar["homeboundDirection"]);
            if (rpat(8) && avatar["home"].distanceTo(avatar)<32){
              avatar.markForRemoval();
              world.awakePopulation --;
            }
          },
          "collide":(Avatar avatar){
            if (avatar["home"].distanceTo(avatar)<256){
              avatar.markForRemoval();
              world.awakePopulation --;
            }else{
              switchTag(avatar,"homebound","lost");
            }
          }
        },
        "lost":{
          "update":(Avatar avatar){
            if (avatar.speaking){
              avatar.sayTime --;
              if (avatar.sayTime < 0){
                avatar.speaking = false;
              }
            }
            if (rpat(8) && avatar.distanceTo(world.player) < 64){
              avatar.say(foundSpeech[(foundSpeech.length * Math.random()).toInt()]);
              switchTag(avatar,"lost","following");
            }else{
              for (int i = (Math.random() * tags["house"].length).toInt(),iter = 0;iter<4;iter++,i++){
                int index = i%tags["house"].length;
                if (tags["house"][index].distanceTo(avatar) < 256){
                  avatar["home"] = tags["house"][index];
                  iter = 9999;
                  switchTag(avatar,"lost","homebound");
                  tagEvents["homebound"]["init"](avatar);
                }
              }
            }
          }
        },
        "corpse":{
          "init":(Avatar avatar){
            avatar["deadTime"] = 0;
          },
          "update":(Avatar avatar){
            avatar["deadTime"] ++;
            if (avatar["deadTime"] > 600){
              avatar.markForRemoval();
            }
          }
        },
        "following":{
          "update":(Avatar avatar){
            if (avatar.distanceTo(world.player)>64){
              avatar.velocity.add(world.player.clone().sub(avatar).normalize());
            }
            //Check if avatar is near any houses
            for (int i = (Math.random() * tags["house"].length).toInt(),iter = 0;iter<4;iter++,i++){
              int index = i%tags["house"].length;
              if (tags["house"][index].distanceTo(avatar) < 256){
                avatar.say("Thank you!");
                avatar["home"] = tags["house"][index];
                iter = 9999;
                niceFactor += .05;
                switchTag(avatar,"following","homebound");
                tagEvents["homebound"]["init"](avatar);
              }
            }
          }
        },
        "wander":{
          "collide":(Avatar avatar){
            avatar.prop["destination"] = avatar.clone().addTo(Math.random() * 100 - 50,Math.random() * 100 - 50);
          },
          "init":(Avatar avatar){
            avatar.prop["destination"] = avatar.clone();
            avatar.prop["waitTime"] = 0;
          },
          "update":(Avatar avatar){
            if (avatar.prop["waitTime"] > 0){
              avatar.prop["waitTime"] --;
            }else if (avatar.prop["destination"].distanceTo(avatar)>2){
              Vec2 destination = avatar.prop["destination"];
              avatar.velocity.add(destination.clone().sub(avatar).normalize().divideScalar(2));
            }else{
              if (Math.random() < .5){
                avatar.prop["destination"] = avatar.clone().addTo(Math.random() * 400 - 200,Math.random() * 400 - 200);
              }else{
                avatar.prop["destination"] = avatar.clone();
                avatar.prop["waitTime"] = Math.random() * 200;
                avatar.currentFrame = 0;
                avatar.velocity.zero();
              }
            }
          }
        },
        "nice":{
          "init":(Avatar avatar){
            avatar.sayTime = Math.random() * 500;
          },
          "update":(Avatar avatar){
            if (avatar.sayTime<0){
              avatar.speaking = false;
              tags["player"].forEach((Avatar player){
                if (player.distanceTo(avatar) < 80){
                  avatar.say(friendlySpeech[(Math.random() * friendlySpeech.length).toInt()]);
                }
              });
              avatar.sayTime = Math.random() * 500;
            }else{
              avatar.sayTime --;
            }
          }
        },
        "mean":{
          "init":(Avatar avatar){
            avatar.sayTime = Math.random() * 500;
          },
          "update":(Avatar avatar){
            if (avatar.sayTime<0){
              avatar.speaking = false;
              tags["player"].forEach((Avatar player){
                if (player.distanceTo(avatar) < 80){
                  avatar.say(meanSpeech[(Math.random() * meanSpeech.length).toInt()]);
                }
              });
              avatar.sayTime = Math.random() * 500;
            }else{
              avatar.sayTime --;
            }
          }
        },
        "hostile-wander":{
          "init":(Avatar zom){
            zom["originalPosition"] = zom.clone();
            tagEvents["wander"]["init"](zom);
          },
          "update":(Avatar zom){
            //Check for nearby enemies
            tags["friendly"].some((Avatar avatar){
              if (avatar.alive && avatar.distanceTo(zom) < AGRO_DISTANCE && rpat(20)){
                rmTag(zom,"hostile-wander");
                zom.removeTag("hostile-wander");
                addTag(zom,"hostile");
                zom.tags.add("hostile");
                tagEvents["hostile"]["init"](zom);
                zom["target"] = avatar;
                return true;
              }
              return false;
            });
            tagEvents["wander"]["update"](zom);
            if (rpat(8) && zom["originalPosition"].distanceTo(zom["destination"])>ZOMBIE_WANDER_DISTANCE){
              zom["destination"] = zom["originalPosition"].clone().addTo(Math.random() * ZOMBIE_WANDER_DISTANCE - ZOMBIE_WANDER_DISTANCE/2,Math.random() * ZOMBIE_WANDER_DISTANCE - ZOMBIE_WANDER_DISTANCE/2);
            }
          }
        },
        "hostile":{
          "init":(Avatar zom){
            zom["target"] = null;
          },
          "update":(Avatar zom){
            if (zom["target"] != null){
              if (zom["target"].alive){
                Avatar target = zom["target"];
                num distance = target.distanceTo(zom);
                
                if (distance < 48){
                  zom.attacking = true;
                  zom.attackDirection = zom.velocity.normalize();
                }else if (distance < AGRO_DISTANCE * 2){
                  zom.attacking = false;
                  zom.velocity.sub(zom.clone().sub(target).normalize().divideScalar(1.5));
                }else{
                  zom.removeTag("hostile");
                  zom.tags.add("hostile-wander");
                  addTag(zom,"hostile-wander");
                  rmTag(zom,"hostile");
                  zom["target"] = null;
                }
              }else{
                zom.fireTagEvent("kill");
              }
            }
          },
          "kill":(Avatar zom){
            if (!zom["target"].alive){
              zom.removeTag("hostile");
              zom.tags.add("hostile-wander");
              addTag(zom,"hostile-wander");
              rmTag(zom,"hostile");
              zom["target"] = null;
              zom.attacking = false;
            }
          }
        },
        "nestbound":{
          "init":(Avatar zom){
            zom["nestDirection"] = zom["originalPosition"].clone().sub(zom).normalize();
          },
          "update":(Avatar zom){
            zom.velocity.add(zom["nestDirection"]);
            if (rpat(4) && zom.distanceTo(zom["originalPosition"])<32){
              zom.markForRemoval();
            }
          }
        }
    };
    notifications = new List<Notification>();
    
    BLANK_IMAGE = new html.ImageElement();
    
    tags = {};
    tagMap = tags;
    
    animationMap = new Map<String,Animation>();
    event = new UIManager();
    canvas = html.document.query("#canvas");
    canvas.width = (html.window.innerWidth/RESOLUTION).toInt();
    canvas.height = (html.window.innerHeight/RESOLUTION).toInt();
    context = canvas.getContext("2d");
    SCREEN_WIDTH = canvas.width;
    SCREEN_HEIGHT = canvas.height;
    RENDER_DISTANCE = ((SCREEN_WIDTH + SCREEN_HEIGHT)*2/4).toInt();
    world = new World();
    print("Loading World");
    web.load("game.json",(data){
      world.load(data,(){
        loadFinish();
      });
    });
  }
  void loadFinish(){
    //Normally we increment a global load variable until all components loaded
    //TODO but there's only one
    //world.render(context);
    world.startCycle(context);
  }
}
