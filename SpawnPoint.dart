
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

class SpawnPoint extends GameObject {
  int freq = -1;
  int limit = 5;
  int amountSpawned = 0;
  int timeToSpawn = 0;
  bool nightOnly = false;
  String emission;//Type name of object you want to spawn
  Map<String,Dynamic> emission_properties;
  SpawnPoint(a):super(a,0,0){
  }
  void update(){
    if ((!nightOnly || (nightOnly && (world.time>21 || world.time<5))) && freq > 0 && amountSpawned < limit){
      timeToSpawn --;
      if (timeToSpawn <= 0){
        Vec2 ob = world.spawnObject(emission,(emission_properties != null) ? emission_properties : {});
        ob.x = x;
        ob.y = y;
        timeToSpawn = freq;
        amountSpawned ++;
      }
    }
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(x,y);
    debugRender(c,20);
    c.restore();
  }
}
