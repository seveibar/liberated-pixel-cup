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

#source("types/GameObject.dart");
#source("types/SpawnPoint.dart");
#source("types/Avatar.dart");

#resource('main.css');

final int GRAPHIC_BLOCK_SIZE = 32;
final int CHUNK_SIZE = 8;
final int CHUNK_JOIN = 10;

final bool DEBUG = true;

int patch_size;

final Map binaryHexMap = const{
  "0":const[0,0,0,0],"1":const[0,0,0,1],"2":const[0,0,1,0],"3":const[0,0,1,1],
  "4":const[0,1,0,0],"5":const[0,1,0,1],"6":const[0,1,1,0],"7":const[0,1,1,1],
  "8":const[1,0,0,0],"9":const[1,0,0,1],"a":const[1,0,1,0],"b":const[1,0,1,1],
  "c":const[1,1,0,0],"d":const[1,1,0,1],"e":const[1,1,1,0],"f":const[1,1,1,1]
};

Map<String,List<GameObject>> tags;
Map<String,Object> classMap;
Map<String,Animation> animationMap;

void addTag(object,String tag) => tags[tag] == null ? tags[tag] = new List<GameObject>.from([object]) : tags[tag].add(object);

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
    tags = {};
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
