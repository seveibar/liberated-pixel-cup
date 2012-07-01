class GameObject extends Vec2 {
  GameObject(a,xx,yy):super(xx,yy){
    loadProperties(a);
  }
  void loadProperties(Map<String,Object> properties){
    properties.forEach((String k,Object v){
      setProperty(k,v);
    }); 
  }
  void setProperty(String k,Object v){
    switch(k){
      case "x":
        x = v;
        break;
      case "y":
        y = v;
        break;
      case "animation":
        animation = animationMap[v];
        break;
      case "type":
        
        break;
      case "tag":
        v.forEach((v){
         addTag(this,v);
        });
        break;
      default:
        print("Unidentified Key : $k");
        break;
    }
  }
}
