
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
class HiddenCanvas {
  html.CanvasElement canvas;
  html.CanvasRenderingContext2D context;
  HiddenCanvas(int width,int height){
    canvas = new html.Element.tag("canvas");
    canvas.width = width;
    canvas.height = height;
    context = canvas.getContext("2d");
  }
  //Get image from canvas
  html.ImageElement getImage(callback){
    html.ImageElement img = new html.Element.tag("img");
    String dataURL = canvas.toDataURL("image/png");
    img.on.load.add((e){
      callback(img);    
    });
    img.src = dataURL;
    return img;
  }
  //Split provided image into many images
  static List<html.ImageElement> split(html.ImageElement img,int px,int py,Function callback){
    //TODO we shouldn't be drawing the entire image for every image split
    HiddenCanvas hc = new HiddenCanvas(px,py);
    html.CanvasRenderingContext2D c = hc.context;
    int n = 0;
    int amt = 0;
    
    List<html.ImageElement> list = new List<html.ImageElement>();
    //TODO better way to fill list with null?
    while(list.length<(img.width/px) * (img.height/py)){list.add(null);}
    
    void addToList(int n){
      hc.getImage((img){
        list[n] = img;
        amt ++;
        if (amt >= list.length){
          callback(list);
        }
      });
    }
    
    for(int y = 0;y>-img.height;y-=py){
      for (int x = 0;x>-img.width;x-=px){
        c.clearRect(0, 0, px, py);
        c.drawImage(img, x, y);
        addToList(n++);
      }
    }
    
  }
}
