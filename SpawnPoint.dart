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
