class AudioManager {
  Map<String,html.AudioElement> audioElements;
  Map<String,List<String>> audioGroup;
  AudioManager(){
    final List<String> soundList = ['bump', 'shoot1', 'hurt3', 'shoot', 'hurt2', 'hurt', 'hurt1'];
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
      audioElements[audioGroup[soundName][(audioGroup[soundName].length * Math.random()).toInt()]].play();
    }else{
      audioElements[soundName].play();
    }
  }
}
