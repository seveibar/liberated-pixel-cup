
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
class res {
  static final int TILE_TYPES = 18;
  static loadImage(name,[callback=null]){
    name = "resources/$name";
    html.ImageElement img = new html.Element.tag("img");
    img.on.load.add((e){
      callback(img);
    });
    img.on.error.add((e){
      //img.src = "resources/error.png";
      callback(new html.ImageElement());
    });
    callback = (callback == null)?(a){}:callback;
    img.src = name;
    return img;
  }
  static loadFile(String name,[callback=null]){
    name = "resources/$name";
    callback = (callback == null)?(a){}:callback;
    web.load(name,callback);
  }
  static List<html.ImageElement> loadSplitImage(name,callback,[int px = 32,int py = 32]){
    name = "resources/$name";
    html.ImageElement img = new html.Element.tag("img");
    img.on.load.add((e){
      HiddenCanvas.split(img,px,py,callback);
    });
    img.src = name;
  }
  /*static List<html.ImageElement> loadSpriteSheet(name,tx,ty,callback){
    List<html.ImageElement> list = new List<html.ImageElement>();
    loadImage(name,(img){
      int tix = img.width;
      int tiy = img.height;
      for (var i = 0;i<tix;i+=tx){
        for (var u = 0;u<tiy;u++){
          HiddenCanvas hc = new HiddenCanvas(tx,ty);
          CanvasRenderingContext2d context = hc.context;
          context.drawImage(img,-i,-u);
          hc.getImage((img){
            list.add(img);
          });
        }
      }
    });
  }*/
  static loadTile(name,callback){
    name = "tiles/$name";
    List ar = new List(TILE_TYPES);
    int loadsCompleted = 0;
    void loadComplete(no){
      return (img){
        ar[no] = img;
        loadsCompleted --;
        if (loadsCompleted <= 0){
          callback(ar);
        }
      };
    }
    loadsCompleted = TILE_TYPES + 1;
    for (int i = 0;i<TILE_TYPES;i++){
      loadImage("${name}_${i}.png",loadComplete(i));
    }
    loadsCompleted -= 1;
  }
  static batchLoadImage(ar,callback_image,callback_complete){
    int completed = 0;
    void loadComplete(name){
      return (img){
        completed ++;
        callback_image(name,img);
        if (completed>=ar.length){
          callback_complete();
        }
      };
    }
    for (var i = 0;i<ar.length;i++){
      loadImage(ar[i],loadComplete(ar[i]));
    }
  }
  static testImage(html.ImageElement img){
    html.window.open(img.src,"Derp");
  }
}
