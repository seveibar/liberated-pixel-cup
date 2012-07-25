#import('dart:html',prefix:"html");
#import('dart:json');

#source("HiddenCanvas.dart");
#source("Vec2.dart");
#source("Camera.dart");
#source("UIManager.dart");
#source("web.dart");
#source("res.dart");
#source("TileManager.dart");
#source("OverlayManager.dart");
#source("World.dart");
#source("rand.dart");

#source("FrameMap.dart");
#source("Animation.dart");

#source("GameObject.dart");
#source("SpawnPoint.dart");
#source("Avatar.dart");

#resource('main.css');

final int GRAPHIC_BLOCK_SIZE = 32;
final int CHUNK_SIZE = 8;
final int CHUNK_JOIN = 10;

final bool DEBUG = true;

int AGRO_DISTANCE = 256;

int patch_size;

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
void rmTag(Dynamic object,String tag) => tags[tag].removeRange(tags[tag].indexOf(object),1);

int SCREEN_WIDTH;
int SCREEN_HEIGHT;

num RESOLUTION = 1;

UIManager event;

World world;

void main() {
  new Game();
}
class Game {
  html.CanvasElement canvas;
  html.CanvasRenderingContext2D context;
  Game(){
    classMap = {
        "spawn":(p)=>new SpawnPoint(p),
        "avatar":(p)=>new Avatar(p)
    };
    tagEvents = {
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
        "hostile-wander":{
          "init":(Avatar zom){
            zom["originalPosition"] = zom.clone();
            tagEvents["wander"]["init"](zom);
          },
          "update":(Avatar zom){
            //Check for nearby enemies
            tags["friendly"].some((Avatar avatar){
              if (avatar.alive && avatar.distanceTo(zom) < AGRO_DISTANCE && Math.random() < .05){
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
            if (zom["originalPosition"].distanceTo(zom["destination"])>AGRO_DISTANCE){
              zom["destination"] = zom["originalPosition"].clone().addTo(Math.random() * AGRO_DISTANCE - AGRO_DISTANCE/2,Math.random() * AGRO_DISTANCE - AGRO_DISTANCE/2);
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
        }
    };
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
