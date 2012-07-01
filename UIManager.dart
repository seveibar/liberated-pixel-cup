class UIManager {
  List<int> keyList;
  final Map keyMap = const {"backspace":8,"enter":13,"shift":16,"ctrl":17,"alt":18,"capslock":20,"esc":27,"space":32,"_0":48,"zero":48,"_1":49,"one":49,"_2":50,"two":50,"_3":51,"three":51,"_4":52,"four":52,"_5":53,"five":53,"_6":54,"six":54,"_7":55,"seven":55,"_8":56,"eight":56,"_9":57,"nine":57,"a":65,"b":66,"c":67,"d":68,"e":69,"f":70,"g":71,"h":72,"i":73,"j":74,"k":75,"l":76,"m":77,"n":78,"o":79,"p":80,"q":81,"r":82,"s":83,"t":84,"u":85,"v":86,"w":87,"x":88,"y":89,"z":90,"semicolon":186,"equal":187,"comma":188,"hyphen":189,"dash":189,"minus":189,"period":190,"dot":190,"slash":191,"forwardslash":191,"grave":192,"backtick":192,"bracketleft":219,"backslash":220,"bracketright":221,"singlequote":222,"space":48,"exclamation":49,"at":50,"ampersat":50,"pound":51,"dollar":52,"mod":53,"modulo":53,"percent":53,"caret":54,"ampersand":55,"asterisk":56,"nine":57,"A":65,"B":66,"C":67,"D":68,"E":69,"F":70,"G":71,"H":72,"I":73,"J":74,"K":75,"L":76,"M":77,"N":78,"O":79,"P":80,"Q":81,"R":82,"S":83,"T":84,"U":85,"V":86,"W":87,"X":88,"Y":89,"Z":90,"colon":186,"plus":187,"pointbracketleft":188,"trianglebracketleft":188,"underscore":189,"pointbracketright":190,"trianglebracketright":190,"question":191,"questionmark":191,"approx":192,"tilde":192,"curleybraceleft":219,"pipe":220,"curleybraceright":221,"doublequote":222,"left":37,"up":38,"right":39,"down":40,"F1":112,"F2":113,"F3":114,"F4":115,"F5":116,"F6":117,"F7":118,"F8":119,"F9":120,"F10":121,"F11":122,"F12":123};
  UIManager(){
    keyList = new List<int>(255);
    for (var i = 0;i<255;i++){
      keyList[i] = 0;
    }
    html.window.on.keyDown.add((e){
      setKey(e.keyCode,1);
    });
    html.window.on.keyUp.add((e){
      setKey(e.keyCode,0);
    });
  }
  void setKey(keyCode,value){
    keyList[keyCode] = value;
  }
  int key(String identifier){
    return keyList[keyMap[identifier]];
  }
}
