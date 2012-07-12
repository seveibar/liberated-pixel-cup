class SpawnPoint extends GameObject {
  int freq = -1;
  int timeToSpawn = 0;
  String emission;//Type name of object you want to spawn
  Map<String,Dynamic> emission_properties;
  SpawnPoint(a):super(a,0,0){
  }
  void update(){
    if (freq > 0){
      timeToSpawn --;
      if (timeToSpawn <= 0){
        Vec2 ob = world.spawnObject(emission,(emission_properties != null) ? emission_properties : {});
        ob.x = x;
        ob.y = y;
        timeToSpawn = freq;
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
