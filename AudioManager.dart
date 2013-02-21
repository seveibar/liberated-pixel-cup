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

class AudioManager {
  Map<String,html.AudioElement> audioElements;
  Map<String,List<String>> audioGroup;
  AudioManager(){
    final List<String> soundList = ['bump', 'shoot1', 'hurt3', 'shoot', 'hurt2', 'hurt', 'hurt1','coin'];
    audioElements = new Map<String,html.AudioElement>();
    soundList.forEach((String soundName){
      audioElements[soundName] = html.document.query("#audio_$soundName");
    });
    audioGroup = new Map<String,List<String>>();
    audioGroup["shoot"] = ["shoot","shoot1"];
    audioGroup["hurt"] = ["hurt","hurt1","hurt2","hurt3"];
  }
  void play(String soundName){
    if (audioGroup.containsKey(soundName)){
      audioElements[audioGroup[soundName][(audioGroup[soundName].length * rng()).toInt()]].play();
    }else{
      audioElements[soundName].play();
    }
  }
}
