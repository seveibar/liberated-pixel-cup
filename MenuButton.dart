
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
class MenuButton extends Vec2{
  String text;
  Function action;
  static final scale = 1.5;
  final num width = 128 * scale,height = 32 * scale;
  MenuButton(this.text,this.action,num x,num y):super(x,y){
    
  }
  bool clickAt(num px,num py){
    return (px - x).abs() < width/2 && (py - y).abs() < height/2;
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    c.scale(1.5,1.5);
    c.drawImage(world.uiImages[25], -64, -16);
    c.drawImage(world.uiImages[26], -32, -16);
    c.drawImage(world.uiImages[26], 0, -16);
    c.drawImage(world.uiImages[27], 32, -16);
    c.globalAlpha = .75;
    c.font = "12px Arial";
    c.textAlign = "center";
    c.fillStyle = "#fff";
    c.fillText(text, 0, 4);
    c.restore();
  }
}
