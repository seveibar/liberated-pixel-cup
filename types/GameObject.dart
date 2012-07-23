class GameObject extends Vec2 {
  List<String> tags;
  Map<String,Dynamic> prop;
  GameObject(a,xx,yy):super(xx,yy){
    tags = new List<String>();
    prop = new Map<String,Dynamic>();
    loadProperties(a);
  }
  void loadProperties(Map<String,Object> properties){
    properties.forEach((String k, v){
      setProperty(k,v);
    }); 
  }
  void setProperty(String k,v){
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
         this.tags.add(v);
        });
        break;
      case "freq":
        this.freq = v;
        this.timeToSpawn = v;
        break;
      case "limit":
        this.limit = v;
        break;
      case "emit":
      case "emission":
        this.emission = v;
      break;
      case "emit-properties":
      case "emission-properties":
        this.emission_properties = v;
      break;
      default:
        this.prop[k] = v;
        break;
    }
  }
  void debugRender(html.CanvasRenderingContext2D c,[sep = 80]){
    if (DEBUG){
      c.fillStyle = "#fff";
      String string = "(${(x*10).toInt()/10.0},${(y*10).toInt()/10.0})";
      c.fillText(string,-.5 * c.measureText(string).width , -.5 * sep+10);
      string = this.tags.toString();
      c.fillText(string,-.5 * c.measureText(string).width , .5 * sep+10);
    }
  }
}
