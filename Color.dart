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
class Color {
  int _r,_g,_b;
  void set r(int x){
    _r = (x > 255) ? 255 : (x < 0) ? 0 : x;
  }
  int get r => _r;
  void set g(int x){
    _g = (x > 255) ? 255 : (x < 0) ? 0 : x;
  }
  int get g => _g;
  void set b(int x){
    _b = (x > 255) ? 255 : (x < 0) ? 0 : x;
  }
  int get b => _b;
  Color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
  Color.fromString(String s){
    List ar = s.splitChars();
    if (s.length == 4){
      r = int.parse("0x${ar[1]}");
      r = (r<<4) + r;
      g = int.parse("0x${ar[2]}");
      g = (g<<4) + g;
      b = int.parse("0x${ar[3]}");
      b = (b<<4) + b;
    }else if (s.length == 7){
      r = int.parse("0x${ar[1]}${ar[2]}");
      g = int.parse("0x${ar[3]}${ar[4]}");
      b = int.parse("0x${ar[5]}${ar[6]}");
    }
  }
  String toString(){
    String s = ((r<<16) | (g<<8) | (b)).toRadixString(16);
    while(s.length<6){
      s = "0$s";
    }
    return "#$s";
  }
  Color multiply(num x){
    r =  (r * x).toInt();
    g =  (g * x).toInt();
    b =  (b * x).toInt();
    return this;
  }
  Color divide(num x){
    r =  (r / x).toInt();
    g =  (g / x).toInt();
    b =  (b / x).toInt();
    return this;
  }
  Color subtract(int x){
    r -= x;
    g -= x;
    b -= x;
    return this;
  }
  void blend(Color color,[num w = .5]){
    r = (r * (1 - w) + color.r * w).toInt();
    g = (g * (1 - w) + color.g * w).toInt();
    b = (b * (1 - w) + color.b * w).toInt();
  }
  Color clone(){
    return new Color(r,g,b);
  }
}
