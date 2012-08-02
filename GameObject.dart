
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

class GameObject extends Vec2 {
  List<String> tags;
  Map<String,Dynamic> prop;
  String id = "";
  String type = "";
  bool markedForRemoval = false;
  GameObject(a,xx,yy):super(xx,yy){
    tags = new List<String>();
    prop = new Map<String,Dynamic>();
    loadProperties(a);
  }
  void operator []=(String k,Dynamic v){
    this.prop[k] = v;
  }
  Dynamic operator [](String k){
    return this.prop[k];
  }
  void loadProperties(Map<String,Object> properties){
    properties.forEach((String k, v){
      setProperty(k,v);
    }); 
  }
  void setProperty(String k,v){
    switch(k){
      case "x":
        x = v;
        break;
      case "y":
        y = v;
        break;
      case "animation":
        if (v.endsWith("]")){
          List<String> vparts = v.split("[");
          
          List<String> nparts = vparts[1].split("-");
          
          int lowest = Math.parseInt(nparts[0]);
          int highest = Math.parseInt(nparts[1].substring(0,nparts[1].length-1))+1;
          
          v = "${vparts[0]}${(Math.random() * (highest - lowest) + lowest).toInt()}";
          
        }
        animation = animationMap[v];
        break;
      case "type":
        break;
      case "imageIndex":
        this.image = world.getItemImage(v);
        break;
      case "tag":
        v.forEach((v){
         addTag(this,v);
         this.tags.add(v);
        });
        break;
      case "freq":
        this.freq = v;
        this.timeToSpawn = v;
        break;
      case "limit":
        this.limit = v;
        break;
      case "night-only":
        this.nightOnly = v;
        break;
      case "emit":
      case "emission":
        this.emission = v;
      break;
      case "emit-properties":
      case "emission-properties":
        this.emission_properties = v;
      break;
      case "id":
        this.id = v;
        break;
      default:
        this.prop[k] = v;
        break;
    }
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c);
    c.restore();
  }
  void debugRender(html.CanvasRenderingContext2D c,[sep = 80]){
    if (DEBUG){
      c.fillStyle = "#fff";
      String string = "(${(x*10).toInt()/10.0},${(y*10).toInt()/10.0})";
      c.fillText(string, 0 , -.5 * sep+10);
      string = this.tags.toString();
      c.fillText(string,0 , .5 * sep+10);
    }
  }
  GameObject findNearest(String tag){
    num d = 9999;
    GameObject w;
    tagMap[tag].some((GameObject o){
      num a = o.distanceTo(this);
      if (a < d){
        w = o;
        d = a;
      }
    });
    return w;
  }
  void fireTagEvent(String event){
    this.tags.forEach((tag){
      //OPTIMIZE
      if (tagEvents.containsKey(tag) && tagEvents[tag].containsKey(event)){
        tagEvents[tag][event](this);
      }
    });
  }
  void markForRemoval(){
    this.markedForRemoval = true;
    this.tags = [];
    remove();
  }
  void remove(){
    this.tags.forEach((String tag){
      rmTag(this,tag);
    });
    bool found = false; 
    List<GameObject> onscene = world.onscene;
    List<GameObject> offscene = world.offscene;
    List<GameObject> objects = world.objects;
    int index = onscene.indexOf(this);
    if (index != -1){
      onscene.removeRange(index, 1);
    }else{
      index = offscene.indexOf(this);
      if (index != -1){
        offscene.removeRange(index,1);
      }
    }
    index = objects.indexOf(this);
    if (index != -1){
      objects.removeRange(index,1);
    }
  }
  bool hasTag(String tag){
    return this.tags.indexOf(tag) != -1;
  }
  void removeTag(String tag){
    int index = this.tags.indexOf(tag);
    if (index!=-1){
      this.tags.removeRange(index, 1);
    }
  }
}
