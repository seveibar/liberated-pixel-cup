part of BigIsland;
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

class MenuInterface {
  String type;
  Map<String,Dynamic> data;
  Function renderFunction;
  List<MenuButton> buttons;
  num ax;
  MenuInterface(this.type,this.data){
    buttons = new List<MenuButton>();
    ax = -SCREEN_WIDTH;
    switch(type){
      case "options":
        renderFunction = renderOptionsMenu;
        List<Map> options = data["options"];
        for (int i = 0;i<options.length;i++){
          String name = options[i]["name"];
          Function func = options[i]["func"];
          
          buttons.add(new MenuButton(name,func,SCREEN_WIDTH/8 + (i%2)*200,SCREEN_HEIGHT/8 + (i/2).toInt() * 50));
        }
        buttons.add(new MenuButton("Exit",(){},SCREEN_WIDTH/8 + (options.length%2)*200,SCREEN_HEIGHT/8 + (options.length/2).toInt() * 50));
        break;
      case "confirm":
        renderFunction = renderConfirmMenu;
        num cx = SCREEN_WIDTH/2;
        num cy = SCREEN_HEIGHT/2;
        buttons.add(new MenuButton("Cancel",(){},cx - 150,cy + 100));
        buttons.add(new MenuButton("Confirm",data["func"],cx + 150,cy + 100));
        break;
      case "broke":
        renderFunction = renderConfirmMenu;
        num cx = SCREEN_WIDTH/2;
        num cy = SCREEN_HEIGHT/2;
        buttons.add(new MenuButton("Cancel",(){},cx - 150,cy + 100));
        buttons.add(new MenuButton("Not Enough Coin",(){},cx + 150,cy + 100));
        break;
    }
  }
  bool clickAt(num x,num y){
    bool returner = false;
    buttons.any((MenuButton button){
      if (button.clickAt(x,y)){
        returner = true;
        button.action();
        return true;
      }
      return false;
    });
    return returner;
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(ax,0);
    ax /= 1.5;
    renderFunction(c);
    c.restore();
  }
  void renderOptionsMenu(html.CanvasRenderingContext2D c){
    buttons.forEach((MenuButton button) => button.render(c));
  }
  void renderConfirmMenu(html.CanvasRenderingContext2D c){
    num cx = SCREEN_WIDTH/2;
    num cy = SCREEN_HEIGHT/2;
    List<html.ImageElement> ui = world.uiImages;
    var pattern = c.createPattern(ui[16], "repeat");
    c.beginPath();
    c.fillStyle = pattern;
    c.rect(cx-300+32+10, cy-200+32, 600-84, 400-88);
    c.fill();
    c.closePath();
    c.drawImage(ui[8],cx-300+12, cy-200);
    for (int i = 0;i<16;i++){
      c.drawImage(ui[9],cx-300+12 + 32 + i * 32, cy-200);
      c.drawImage(ui[23],cx-300+12 + 32 + i * 32,cy+200-64);
    }
    for (int i = 0;i<10;i++){
      c.drawImage(ui[15],cx-300+12, cy-200 + 32 + i * 32);
      c.drawImage(ui[17],cx+300-12-32, cy-200+ 32 + i * 32);
    }
    c.drawImage(ui[10],cx+300-32-12, cy-200);
    c.drawImage(ui[22], cx-300+12, cy+200-64);
    c.drawImage(ui[24], cx+300-32-12, cy+200-64);
    
    //Draw Text
    c.font = "18px Arial";
    c.fillStyle = "#ab7d10";
    c.textAlign = "center";
    c.fillText(data["text"], cx, cy);
    
    buttons.forEach((MenuButton button) => button.render(c));
  }
}
