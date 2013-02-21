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

class FloatingText extends GameObject{
  int time = 0;
  FloatingText(Map properties):super(properties,0,0);
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c);
    c.globalAlpha = 1 - time/150;
    c.font = "14px Arial";
    c.fillStyle = "yellow";
    c.textAlign = "center";
    c.fillText(prop['text'],0,0);
    c.restore();
  }
  
}
