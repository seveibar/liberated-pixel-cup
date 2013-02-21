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

class OverlayManager {
  /*
  This class is responsible for...
  
  - Drawing Lighting
  - Applying filters
  
  */
  final num SUNRISE = 7;
  final num SUNSET = 21;
  final night_dawn = const["#3e3e56","#818fb6","#b2cdec","#cbe3f6"];
  final dusk_night = const["#ebddcb","#d3b7b2","#bb98ad","#806593"];//,"#4b4b75"
  String toColor(num x){
    String string = x.toRadixString(16);
    while(string.length<6){
      string = "0" + string;
    }
    return "#$string";
  }
  void render(html.CanvasRenderingContext2D c,Camera camera){
    num time = world.time;
    //SUNRISE
    if (time > SUNRISE - 1 && time < SUNRISE + 1){
      //Calculate percent of sunrise completion
      num p = 1 - ((SUNRISE + 1) - time) / 2;
      c.globalAlpha = .75 - p*.75;
      //Get which 2 colors to use
      Color color1 = new Color.fromString(night_dawn[(p * (night_dawn.length-1)).floor().toInt()]);
      Color color2 = new Color.fromString(night_dawn[(p * (night_dawn.length-1)).ceil().toInt()]);
      //Weight of color2
      num w = p * (night_dawn.length-1) - (p * (night_dawn.length-1)).floor();
      //Average colors with weight
      color1.blend(color2,w);
      
      color1.subtract(128);
      c.fillStyle = color1.toString();
      c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    //NIGHT
    }else if (time < SUNRISE-1 || time > SUNSET+1){
      if (time < SUNRISE - 1){
        time += 24;
      }
      num ASUNRISE = SUNRISE + 23;
      num ASUNSET = SUNSET + 1;
      //100% = sunrise, 0% = sunset
      num p = (ASUNRISE - time)/(ASUNRISE - ASUNSET);
      c.globalAlpha = .75;
      Color sunset = new Color.fromString(night_dawn[0]);
      Color sunrise = new Color.fromString(dusk_night[dusk_night.length-1]);
      sunset.blend(sunrise,p);
      sunset.subtract(128);
      c.fillStyle = sunset.toString();
      c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    //SUNSET
    }else if (time > SUNSET - 1 && time < SUNSET + 1){
      //100% = night, 0% = dusk
      num p = 1- (SUNSET + 1 - time)/2;
      c.globalAlpha = p * .75;
      Color color1 = new Color.fromString(dusk_night[(p * (dusk_night.length-1)).floor().toInt()]);
      Color color2 = new Color.fromString(dusk_night[(p * (dusk_night.length-1)).ceil().toInt()]);
      
      num w = p * (dusk_night.length-1) - (p * (dusk_night.length-1)).floor();
      
      color1.blend(color2,w);
      color1.subtract(128);
      
      c.fillStyle = color1.toString();
      c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      
    }
    
    c.globalAlpha = 1;
  }
}
