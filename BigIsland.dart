
// Big Island video game source code file
// Copyright (C) 2012  Severin Ibarluzea
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import 'dart:html' as html;
import 'dart:json' as JSON;
import 'dart:math';
import 'dart:async';

part "web.dart";
part "res.dart";

part "MainMenu.dart";

part "PathNode.dart";
part "Path.dart";
part "GameObject.dart";
part "FloatingText.dart";
part "Arrow.dart";
part "SpawnPoint.dart";
part "Avatar.dart";
part "Item.dart";

part "HiddenCanvas.dart";
part "Vec2.dart";
part "Camera.dart";
part "UIManager.dart";

part "Color.dart";

part "TileManager.dart";
part "OverlayManager.dart";
part "MenuButton.dart";
part "MenuInterface.dart";
part "World.dart";

part "FrameMap.dart";
part "Animation.dart";

part "Notification.dart";

part "AudioManager.dart";

//#resource('main.css');

final int GRAPHIC_BLOCK_SIZE = 32;
final int CHUNK_SIZE = 8;
final int CHUNK_JOIN = 6;

bool DEBUG = false;//TODO make final
bool MOBILE = false;

int patch_size;

num niceFactor;

html.ImageElement BLANK_IMAGE;

var random_number_generator = new Random();
num rng() => random_number_generator.nextDouble();

const pi = PI;

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
final List<String> scaredSpeech = const[
                                       "Ahhhh!",
                                       "Look out!",
                                       "Run!",
                                       "AHHHH!",
                                       "Woah!"
                                    ];

Map<String,Map<String,Function>> tagEvents;

Map<String,bool> removalOnDeath = const{
  "wander":true,
  "nice":true,
  "hostile":true,
  "hostile-wander":true,
  "mean":true,
  "scared":true,
  "citizen":true,
  "guard-attack":true,
  "guard-wander":true,
  "guard":true
};

Map<String,List<GameObject>> tags; //These are the same thing (dirty work around)
Map<String,List<GameObject>> tagMap;// <<<<<
Map<String,Object> classMap;
Map<String,Animation> animationMap;

Dynamic addTag(GameObject object,String tag) => tags[tag] == null ? tags[tag] = new List<GameObject>.from([object]) : tags[tag].add(object);
void rmTag(GameObject object,String tag) {
  int index = tags[tag].indexOf(object);
  if (index!=-1){
    tags[tag].removeRange(index,1);
  }
}

int SCREEN_WIDTH;
int SCREEN_HEIGHT;
final int STATIC_WIDTH = 800;
final int STATIC_HEIGHT = 450;
int RENDER_DISTANCE;

final int GUARD_VIEW_DISTANCE = 256;

num RESOLUTION = 1;

UIManager event;
AudioManager audio;

List<Notification> notifications;

World world;

void GameOver(html.CanvasRenderingContext2D c){
  world.paused = true;
  Vec2 menu_pos = new Vec2(SCREEN_WIDTH,0);
  html.ImageElement img = new html.ImageElement();
  img.src = game.canvas.toDataUrl('image/png');
  game = null;
  int timePass = 0;
  bool rcycle(int a){
    timePass ++;
    c.globalAlpha = 1;
      //world.render(c);
     c.drawImage(img, 0, 0);
    c.save();
    menu_pos.x -= (menu_pos.x - (SCREEN_WIDTH - 400))/10;
    c.translate(menu_pos.x,menu_pos.y);
    //Okay, draw all menu items
    c.fillStyle = "#000";
    c.globalAlpha = .75;
    c.fillRect(0,0,400,SCREEN_HEIGHT);
    
    //GAME OVER
    c.globalAlpha = 1;
    c.font = "48px Arial";
    c.fillStyle = "#fff";
    c.fillText("Game Over",75,75);
    
    //Stats
    c.font = "18px Arial";
    num ypos = 160;
    [
     ["Village Population","${world.totalPopulation}"],
     ["Zombie Population","${world.zombie_max}"],
     ["Zombies Killed","${world.zombies_killed}"],
     ["Villagers Saved","${world.saved}"],
     ["Days Survived","${world.dayCount}"],
    ].forEach((List<String> not){
      c.textAlign = "left";
      c.fillText(not[0],25,ypos);
      c.textAlign = "right";
      c.fillText(not[1],400-50,ypos);
      ypos += 40;
    });
    
    c.textAlign = "center";
    c.fillText("Click anywhere to play again", 200, ypos);
    c.fillText("Game by Severin Ibarluzea", 200, SCREEN_HEIGHT-50);
    c.fillText("For the Liberated Pixel Cup (2012)", 200, SCREEN_HEIGHT-25);
    
    c.restore();
    if (game == null){
      html.window.requestAnimationFrame(rcycle);
    }
  }
  html.window.requestAnimationFrame(rcycle);
  event.onClick.add((e){
    if (timePass >= 120){
      openMainMenu();
      return true;
    }
  });
}

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
num CANVAS_OFFSETX,CANVAS_OFFSETY;
int rpatCount = 0;
bool rpat(int n){
  return ((rpatCount ++)%n == 0);
}
Game game;
MainMenu menu;
void main() {
  CANVAS_OFFSETX = html.window.innerWidth/2 - STATIC_WIDTH/2;
  CANVAS_OFFSETY = html.window.innerHeight/2 - STATIC_HEIGHT/2;
  if (CANVAS_OFFSETY<0){
    CANVAS_OFFSETY = 0;
  }
  //html.document.query("#canvas").style.position = "absolute";
  html.document.query("#canvas").style.left = "${CANVAS_OFFSETX}px";
  html.document.query("#canvas").style.top = "${CANVAS_OFFSETY}px";
  html.window.onLoad.listen((e){
   openMainMenu();
  });
}
void openMainMenu(){
  menu = new MainMenu();
}
void startGame(){
  menu = null;
  game = new Game();
}
class Game {
  html.CanvasElement canvas;
  html.CanvasRenderingContext2D context;
  
  Game(){
    niceFactor = 0;
    rpatCount = (rng() * 64).toInt();
    classMap = {
        "spawn":(p)=>new SpawnPoint(p),
        "avatar":(p)=>new Avatar(p),
        "node":(p)=>new GameObject(p,0,0),
        "arrow":(p)=>new Arrow(p),
        "floating_text":(p)=>new FloatingText(p)
    };
    tagEvents = {
        "citizen":{
          "init":(Avatar avatar){
            if (avatar.damage == null){
              avatar.armor = 1;
              avatar.damage = 0;
            }
            avatar.speed = .5 + rng() * 1.5;
            avatar["destination"] = avatar.clone();//DIRTY FIX
            avatar["waitTime"] = 0;
            num r = rng() + niceFactor;
            if (r<.1){
              avatar.tags.add("mean");
              addTag(avatar,"mean");
            }else if (r>1){
              avatar.tags.add("nice");
              addTag(avatar,"nice");
            }
            avatar["followOffset"] = new Vec2(rng() * 128 - 64,rng() * 128 - 64);
          },
          "update":(Avatar citizen){
            if (!citizen.hasTag("scared")){
              List<Avatar> zoms =  tags["zombie"];
              for (int i = (rng() * zoms.length).toInt(),iter = 0;iter<zoms.length / 16;iter++,i++){
                int index = i%zoms.length;
                if (zoms[index].alive && zoms[index].distanceTo(citizen) < 96){
                  ["wander","traveler","lost","following","homebound"].forEach((String tag){
                    if (citizen.hasTag(tag)){
                      citizen.removeTag(tag);
                      rmTag(citizen,tag);
                    }
                  });
                  citizen.say(scaredSpeech[(scaredSpeech.length * rng()).toInt()],100);
                  citizen.tags.add("scared");
                  addTag(citizen,"scared");
                  citizen["scaredOf"] = zoms[index];
                  tagEvents["scared"]["init"](citizen);
                  return;
                  
                }
              }
              //Basically the exact same thing with corpses
              zoms = tags["corpse"];
              for (int i = (rng() * zoms.length).toInt(),iter = 0;iter<zoms.length / 16;iter++,i++){
                int index = i%zoms.length;
                if (!zoms[index].hasTag("zombie") && zoms[index].distanceTo(citizen) < 96){
                  ["wander","traveler","lost","following","homebound"].forEach((String tag){
                    if (citizen.hasTag(tag)){
                      citizen.removeTag(tag);
                      rmTag(citizen,tag);
                    }
                  });
                  citizen.say(scaredSpeech[(scaredSpeech.length * rng()).toInt()]);
                  citizen.tags.add("scared");
                  addTag(citizen,"scared");
                  citizen["scaredOf"] = zoms[index];
                  tagEvents["scared"]["init"](citizen);
                  return;
                  
                }
              }
            }
          },
          "hit":(Avatar citizen){
            if (citizen.distanceTo(world.player) < 256){
              audio.play("hurt");
            }
            if (world.player.attacking){
              niceFactor -= .005;
              ["wander","traveler","lost","following","homebound","scared"].forEach((String tag){
                if (citizen.hasTag(tag)){
                  citizen.removeTag(tag);
                  rmTag(citizen,tag);
                }
              });
              citizen.say(scaredSpeech[(scaredSpeech.length * rng()).toInt()]);
              citizen.tags.add("scared");
              addTag(citizen,"scared");
              citizen["scaredOf"] = world.player;
              tagEvents["scared"]["init"](citizen);
            }
          },
          "die":(Avatar avatar){
            world.totalPopulation --;
            world.awakePopulation --;
            world.zombie_max ++;
            niceFactor -= .01;
            if (world.player.attacking && world.player.distanceTo(avatar)<256){
              niceFactor -= .05;
              world.giveCoin(avatar,(10 * rng() + 2).toInt());
            }
          },
          "collide":(Avatar citizen){
            if (rpat(120)){
              citizen.add(citizen.velocity);
            }
          }
        },
        "player":{
          "init":(Avatar player){
            player.damage = 25;
            player.armor = .5;
            player.speed = 1;
          },
          "die":(Avatar player){
            notify("You have died, please wait");
            player["deadTime"] = 540;
          },
          "decomposed":(Avatar player){
            GameOver(context); 
          },
          "update":(Avatar player){
            player.health = (player.health < world.player_max_health) ? player.health + .2 : world.player_max_health;
            if (world.collisionAtVec2(player)){
              player.add(player.velocity);
            }
          }
        },
        "scared":{
          "init":(Avatar citizen){
            citizen["runDirection"] = citizen.clone().sub(citizen["scaredOf"]).normalize().multiplyScalar(citizen.speed);
          },
          "update":(Avatar citizen){
            citizen.velocity.add(citizen["runDirection"]);
            if (rpat(8)){
              Avatar zom = citizen["scaredOf"];
              if (zom.distanceTo(citizen) > world.AGRO_DISTANCE + 32){
                switchTag(citizen,"scared","lost");
                citizen.tags.add("wander");
                addTag(citizen,"wander");
              }
            }
          }
        },
        "traveler":{
          "init":(Avatar a){
            List<PathNode> cnodes = world.getClosePathNodes(a);
            if (cnodes.length > 0){
              int ni;
              if (world.time < 16){
                ni = (cnodes.length * rng()).toInt();
                a["path"] = cnodes[ni].path;
                a["pathDirection"] = cnodes[ni].start ? 1 : -1;
                a["pathIndex"] = cnodes[ni].start ? 0 : cnodes[ni].path.points.length - 1;
                a["pathPoint"] = cnodes[ni].clone();
                a["pathMove"] = cnodes[ni].clone().sub(a).normalize().multiplyScalar(a.speed);
              }else{
                for (int i = cnodes.length-1;i>=0;i--){
                  if (cnodes[i].house){
                    tags["house"].any((GameObject house){
                      if (house.distanceTo(a) < 256){
                        a["home"] = house;
                        return true;
                      }
                      return false;
                    });
                    switchTag(a,"traveler","homebound");
                    tagEvents["homebound"]["init"](a);
                    return;
                  }
                }
                switchTag(a,"traveler","wander");
                tagEvents["wander"]["init"](a);
                return;
              }
            }else{
              switchTag(a,"traveler","wander");
              tagEvents["wander"]["init"](a);
            }
          },
          "collide":(Avatar a){
            a["pathPoint"] = a["path"].points[a["pathIndex"]];
            a["pathMove"] = a["pathPoint"].clone().sub(a).normalize().multiplyScalar(a.speed);
            a.add(a["pathMove"]);
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
                a["pathPoint"].addTo(rng() * d - d/2,rng() * d - d/2);
                a["pathMove"] = a["pathPoint"].clone().sub(a).normalize().multiplyScalar(a.speed);
              }
            }
          }
        },
        "guard-wander":{
          //A guard will walk around and attack any hostile creatures he sees
          "init":(Avatar guard){
            guard["positionOffset"] = new Vec2(rng() * 64-32,rng() * 64-32);
            world.setGuardPath(guard);
          },
          "update":(Avatar guard){
            //Check for nearby zombies
            //TODO if there are other enemies change to evil
            List<Avatar> zombies = tags["zombie"];
            if (zombies.length > 0){
              for (int i = (rng() * zombies.length).toInt()-1,iter = 0;iter < zombies.length/30 + 1;iter++,i++){
                Avatar zom = zombies[i%zombies.length];
                if (zom.distanceTo(guard) < GUARD_VIEW_DISTANCE){
                  switchTag(guard,"guard-wander","guard-attack");
                  guard["target"] = zom;
                  return;
                }
              }
            }
            guard.velocity.add(guard["destination"].clone().sub(guard).normalize().multiplyScalar(guard.speed));
            if (guard["destination"].distanceTo(guard)<32){
              guard["pathIndex"] += guard["pathDirection"];
              if (guard["pathIndex"] < 0 || guard["pathIndex"] >= guard["path"].points.length){
                if (rpat(2)){
                  guard.currentFrame = 0;
                  guard["waitTime"] = 120 + (rng() * 360).toInt();
                  switchTag(guard,"guard-wander","guard-wait");
                  return;
                }else{
                  world.setGuardPath(guard);
                  return;
                }
                
              }else{
                guard["destination"] = guard["path"].points[guard["pathIndex"]].clone().add(guard["positionOffset"]);
              }
            }
            
            if (guard.health < 100){
              guard.health += .005;
            }
          },
          "collide":(Avatar guard){
            if (guard["collideTime"]++>120){
              guard["collideTime"] = 0;
              guard.set(guard["destination"].x,guard["destination"].y);
            }
          },
          "die":(Avatar guard){
          }
        },
        "guard-wait":{
          "update":(Avatar guard){
            List<Avatar> zombies = tags["zombie"];
            if (zombies.length > 0){
              for (int i = (rng() * zombies.length).toInt()-1,iter = 0;iter < zombies.length/30 + 1;iter++,i++){
                Avatar zom = zombies[i%zombies.length];
                if (zom.distanceTo(guard) < GUARD_VIEW_DISTANCE){
                  switchTag(guard,"guard-wait","guard-attack");
                  guard["target"] = zom;
                  return;
                }
              }
            }
            guard["waitTime"]--;
            if (guard["waitTime"] <= 0){
              world.setGuardPath(guard);
              switchTag(guard,"guard-wait","guard-wander");
            }
          }
        },
        "guard-attack":{
          "init":(Avatar guard){
            
          },
          "update":(Avatar guard){
            Avatar zom = guard["target"];
            if (zom != null && zom.alive){
              if (guard.distanceTo(zom) > guard.attackRadius){
                guard.velocity.add(zom.clone().sub(guard).normalize().multiplyScalar(guard.speed));
                guard.attacking = false;
              }else{
                guard.attacking = true;
                guard.attackDirection = zom.clone().sub(guard).normalize();
              }
            }else{
              guard.attacking = false;
              switchTag(guard,"guard-attack","guard-wander");
            }
          },
          "die":(Avatar guard){
          }
        },
        "guard":{
          "init":(Avatar guard){
            guard["collideTime"] = 0;
            guard.armor = .25;
            guard.speed = .8 + rng() * 1.2;
            world.equipWeapon(guard,(rng() * world.weaponName.length).toInt());
          },
          "die":(Avatar guard){
            world.spawnGuard();
          }
        },
        "homebound":{
          "init":(Avatar avatar){
            avatar["collisionCount"] = 0;
            //TODO SIMPLIFY
            GameObject home = avatar["home"];
            avatar["homeboundDirection"] = home.clone().sub(avatar).normalize().multiplyScalar(avatar.speed);
          },
          "update":(Avatar avatar){
            avatar.velocity.add(avatar["homeboundDirection"]);
            if (rpat(8)){
              num d = avatar["home"].distanceTo(avatar);
              if (d>256){
                bool found = false;
                tags["house"].any((GameObject house){
                  if (house.distanceTo(avatar)<256){
                    avatar["home"] = house;
                    found = true;
                    return true;
                  }
                  return false;
                });
                if (found){
                  avatar["collisionCount"] = 0;
                  avatar["homeboundDirection"] = avatar["home"].clone().sub(avatar).normalize().multiplyScalar(avatar.speed);
                }else{
                  switchTag(avatar,"homebound","lost");
                  avatar.tags.add("wander");
                  addTag(avatar,"wander");
                }
              }else if (d<32){
                avatar.markForRemoval();
                world.awakePopulation --;
              }
            }
          },
          "collide":(Avatar avatar){
            avatar["collisionCount"] ++;
            if (avatar["collisionCount"] > 120){
              switchTag(avatar,"homebound","lost");
              avatar.tags.add("wander");
              addTag(avatar,"wander");
            }else if (avatar.distanceTo(avatar["home"])<256){
              avatar.markForRemoval();
              world.awakePopulation --;
            }
            /*if (avatar["home"].distanceTo(avatar)<256){
              avatar.markForRemoval();
              world.awakePopulation --;
            }else{
              tags["house"].any((GameObject house){
                if (house.distanceTo(avatar) < 256){
                  avatar.markForRemoval();
                  world.awakePopulation --;
                  return true;
                }
                return false;
              });
              if (!avatar.markedForRemoval){
                switchTag(avatar,"homebound","lost");
                avatar.tags.add("wander");
                addTag(avatar,"wander");
              }
            }*/
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
              avatar.say(foundSpeech[(foundSpeech.length * rng()).toInt()],120);
              switchTag(avatar,"lost","following");
              avatar.removeTag("wander");
              rmTag(avatar,"wander");
            }else{
              for (int i = (rng() * tags["house"].length).toInt(),iter = 0;iter<4;iter++,i++){
                int index = i%tags["house"].length;
                if (tags["house"][index].distanceTo(avatar) < 256){
                  avatar["home"] = tags["house"][index];
                  iter = 9999;
                  switchTag(avatar,"lost","homebound");
                  tagEvents["homebound"]["init"](avatar);
                  avatar.removeTag("wander");
                  rmTag(avatar,"wander");
                }
              }
            }
          }
        },
        "corpse":{
          "init":(Avatar avatar){
            avatar["deadTime"] = 0;
            avatar.speaking = false;
          },
          "update":(Avatar avatar){
            avatar["deadTime"] ++;
            if (avatar["deadTime"] > 600){
              avatar.fireTagEvent("decomposed");
              avatar.markForRemoval();
            }
          }
        },
        "following":{
          "update":(Avatar avatar){
            if (avatar.speaking){
              avatar.sayTime --;
              if (avatar.sayTime < 0){
                avatar.speaking = false;
              }
            }
            if (avatar.distanceTo(world.player)>64){
              avatar.velocity.add(world.player.clone().add(avatar["followOffset"]).sub(avatar).normalize().multiplyScalar(2));
            }
            //Check if avatar is near any houses
            for (int i = (rng() * tags["house"].length).toInt(),iter = 0;iter<4;iter++,i++){
              int index = i%tags["house"].length;
              if (tags["house"][index].distanceTo(avatar) < 256){
                avatar.say(rpat(2) ? "Thank you!" : "Thanks!",100 );
                avatar["home"] = tags["house"][index];
                world.giveCoin(avatar,((rng() * 20 + 5) * world.dayCount).toInt());
                iter = 9999;
                niceFactor += .05;
                world.saved ++;
                switchTag(avatar,"following","homebound");
                tagEvents["homebound"]["init"](avatar);
              }
            }
          }
        },
        "wander":{
          "collide":(Avatar avatar){
            avatar.prop["destination"] = avatar.clone().addTo(rng() * 100 - 50,rng() * 100 - 50);
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
              avatar.velocity.add(destination.clone().sub(avatar).normalize().multiplyScalar(avatar.speed));
            }else{
              if (rng() < .75){
                avatar.prop["destination"] = avatar.clone().addTo(rng() * 400 - 200,rng() * 400 - 200);
              }else{
                avatar.prop["destination"] = avatar.clone();
                avatar.prop["waitTime"] = rng() * 200;
                avatar.currentFrame = 0;
                avatar.velocity.zero();
              }
            }
          }
        },
        "nice":{
          "init":(Avatar avatar){
            avatar.sayTime = rng() * 500;
          },
          "update":(Avatar avatar){
            if (avatar.sayTime<0){
              avatar.speaking = false;
              tags["player"].forEach((Avatar player){
                if (player.distanceTo(avatar) < 80){
                  avatar.say(friendlySpeech[(rng() * friendlySpeech.length).toInt()]);
                }
              });
              avatar.sayTime = rng() * 500;
            }else{
              avatar.sayTime --;
            }
          }
        },
        "mean":{
          "init":(Avatar avatar){
            avatar.sayTime = rng() * 500;
          },
          "update":(Avatar avatar){
            if (avatar.sayTime<0){
              avatar.speaking = false;
              tags["player"].forEach((Avatar player){
                if (player.distanceTo(avatar) < 80){
                  avatar.say(meanSpeech[(rng() * meanSpeech.length).toInt()]);
                }
              });
              avatar.sayTime = rng() * 500;
            }else{
              avatar.sayTime --;
            }
          }
        },
        "salesman":{
          "update":(Avatar avatar){
            if (avatar.sayTime<0){
              avatar.speaking = false;
              if (rpat(2)){
                avatar.say(avatar["calls"][(avatar["calls"].length * rng()).toInt()]);
              }
              avatar.sayTime = 100+rng() * 200;
            }else{
              avatar.sayTime --;
            }
            if (world.player.distanceTo(avatar) < 128 && notifications.length == 0){
              notify("Press Space to Interact");
            }
          }
        },
        "arrow":{
          "update":(Arrow arrow){
            arrow.add(arrow["direction"].divideScalar(1.5));
            if (world.damageBubble(arrow, 32, arrow["damage"], arrow["direction"].clone().normalize()).length>0 || world.collisionAtVec2(arrow) || arrow.distance++ > 12){
              arrow.remove();
            }
          }
        },
        "zombie":{
          "init":(Avatar zom){
            zom.speed = .5 + rng();
          },
          "die":(Avatar a){
            if (world.player.distanceTo(a) < 256 && world.player.attacking){
              world.zombies_killed ++;
              world.zombie_out --;
              world.addMultiplier();
              world.giveCoin(a,((rng() * 7 + 3) * (1 + world.dayCount/4)).toInt());
            }
          }
        },
        "hostile-wander":{
          "init":(Avatar zom){
            zom["originalPosition"] = zom.clone();
            zom.damage = world.ZOMBIE_DAMAGE;
            zom.armor = world.ZOMBIE_ARMOR;
            tagEvents["wander"]["init"](zom);
          },
          "update":(Avatar zom){
            //Check for nearby enemies
            if (zom.prop["waitTime"] > 0){
              zom.prop["waitTime"] --;
            }else if (zom.prop["destination"].distanceTo(zom)>2){
              Vec2 destination = zom.prop["destination"];
              zom.velocity.add(destination.clone().sub(zom).normalize().multiplyScalar(zom.speed * world.ZOMBIE_SPEED));
            }else{
              if (rng() < .75){
                zom.prop["destination"] = zom.clone().addTo(rng() * 400 - 200,rng() * 400 - 200);
              }else{
                zom.prop["destination"] = zom.clone();
                zom.prop["waitTime"] = rng() * 200;
                zom.currentFrame = 0;
                zom.velocity.zero();
              }
            }
            tags["friendly"].any((Avatar avatar){
              if (avatar.alive && avatar.distanceTo(zom) < world.AGRO_DISTANCE){
                rmTag(zom,"hostile-wander");
                zom.removeTag("hostile-wander");
                addTag(zom,"hostile");
                zom.tags.add("hostile");
                zom["target"] = avatar;
                return true;
              }
              return false;
            });
          },
          "collide":(Avatar zom){
            zom.prop["destination"] = zom.clone().addTo(rng() * 100 - 50,rng() * 100 - 50);
          },
          "hit":(Avatar zom){
            tags["friendly"].any((Avatar avatar){
              if (avatar.alive && avatar.attacking && avatar.distanceTo(zom) < world.AGRO_DISTANCE*2 ){
                rmTag(zom,"hostile-wander");
                zom.removeTag("hostile-wander");
                addTag(zom,"hostile");
                zom.tags.add("hostile");
                zom["target"] = avatar;
                return true;
              }
              return false;
            });
          }
        },
        "hostile":{
          "update":(Avatar zom){
            if (zom["target"] != null && zom["target"].alive && !zom["target"].markedForRemoval){
              Avatar target = zom["target"];
              num distance = target.distanceTo(zom);
              
              if (distance < 32){
                zom.attacking = true;
                zom.attackDirection = target.clone().sub(zom).normalize();
              }else if (distance < world.AGRO_DISTANCE * 2){
                zom.attacking = false;
                zom.velocity.sub(zom.clone().sub(target).normalize().multiplyScalar(world.ZOMBIE_SPEED*zom.speed));
              }else{
                switchTag(zom,"hostile","hostile-wander");
                zom["target"] = null;
              }
            }else{
              switchTag(zom,"hostile","hostile-wander");
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
          },
          "hit":(Avatar zom){
            tags["friendly"].any((Avatar friend){
              if (friend.attacking && friend.distanceTo(zom) < 96){
                zom["target"] = friend;
                return true;
              }
              return false;
            });
          }
        },
        "nestbound":{
          "init":(Avatar zom){
            zom["nestDirection"] = zom["originalPosition"].clone().sub(zom).normalize();
            zom["collisionCount"] = 0;
          },
          "update":(Avatar zom){
            zom.velocity.add(zom["nestDirection"]);
            if (rpat(4) && zom.distanceTo(zom["originalPosition"])<32){
              world.zombie_out --;
              zom.markForRemoval();
            }
          },
          "collide":(Avatar zom){
            zom["collisionCount"] ++;
            if (zom["collisionCount"] > 120){
              world.zombie_out --;
              zom.markForRemoval();
            }
          }
        },
        "floating_text":{
          "update":(FloatingText ftext){
            ftext.time++;
            ftext.y -= .5;
            if (ftext.time > 150){
              ftext.remove();
            }
          }
        },
        "avatar":{},
        "actor":{},
        "ai":{},
        "friendly":{},
        "uninit":{},
        "house":{},
        "node":{},
        "zombie-spawn":{}
    };
    
    List<String> tagEventIndex = ["init","update","collide","die","decomposed","hit","kill"];
    tagEventIndex.forEach((String i){
      for (String key in tagEvents.keys){
        if (!tagEvents[key].containsKey(i)){
          tagEvents[key][i] = (a){};
        }
      }
    });
    
    notifications = new List<Notification>();
    
    BLANK_IMAGE = new html.ImageElement();
    
    tags = {"zombie":new List<Avatar>(),"corpse":new List<Avatar>(),"wander":new List<Avatar>(),"lost":new List<Avatar>(),
            "item":new List<Item>(),"salesman":new List<Avatar>(),"zombie":new List<Avatar>(),
            "uninit":new List<GameObject>(),"actor":new List<Avatar>(),"spawn":new List<SpawnPoint>(),"following":new List<Avatar>()};
    tagMap = tags;
    
    audio = new AudioManager();
    
    animationMap = new Map<String,Animation>();
    canvas = html.document.query("#canvas");
    
    canvas.width  = STATIC_WIDTH;
    canvas.height = STATIC_HEIGHT;
    //Uncomment for fullscreen
    //canvas.width = (html.window.innerWidth/RESOLUTION).toInt();
    //canvas.height = (html.window.innerHeight/RESOLUTION).toInt();
    context = canvas.getContext("2d");
    SCREEN_WIDTH = canvas.width;
    SCREEN_HEIGHT = canvas.height;
    event = new UIManager();
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
    world.startCycle(context);
  }
}
