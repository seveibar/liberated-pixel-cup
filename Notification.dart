
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
class Notification {
  static final int HEIGHT = 32;
  String text;
  int timeLeft = 300;
  num y = HEIGHT;
  num ay = 0;
  Notification(this.text);
  bool render(html.CanvasRenderingContext2D c){
    c.globalAlpha = .5 * (timeLeft < 60 ? timeLeft/60 : 1);
    c.fillStyle = "#000";
    c.font = "18px Arial";
    c.fillRect(0,SCREEN_HEIGHT - ay,c.measureText(text).width + 20,HEIGHT);
    c.fillStyle = "#fff";
    c.fillText(text,10,SCREEN_HEIGHT - ay + 20);
    ay -= (ay - y)/10;
    c.globalAlpha = 1;
    return timeLeft--<=0;
  }
}
