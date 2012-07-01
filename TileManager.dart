class TilePatch{
  final List<int> data;
  final String type;
  TilePatch(data,type):this.data = TilePatch.decode(data),this.type = type;
  int at(int x,int y){
    int i = y * patch_size + x;
    return (i>=data.length || i<0)? 0 : data[i];
  }
  static decode(String data){
    final List ar = data.splitChars();
    List<int> n = new List<int>();
    for (int i = 0;i<ar.length;i++){
      n.addAll(binaryHexMap[ar[i]]);
    }
    //Now we get the orientations
    for (int x = 1;x<patch_size-1;x++){
      for (int y = 1;y<patch_size-1;y++){
        if (n[x + y*patch_size] != 0){
          int left = (n[x + 1 + y*patch_size] != 0) ? 1 : 0;
          int top = (n[x + (y+1)*patch_size] != 0)? 1 : 0;
          int right = (n[x - 1 + y*patch_size] != 0)? 1 : 0;
          int bottom = (n[x + (y-1)*patch_size] != 0)? 1 : 0;
          n[x+y*patch_size] = TileManager.orientationMap[left + top * 2 + right * 4 + bottom * 8];
        }
      }
    }
    return n;
  }
}

class TileManager {
  String mainTile;
  int seed;
  var tiles;
  Map<String,List<TilePatch>> patches;//TODO way to have tuple key (x,y)
  Map<int,html.ImageElement> renderChunks;
  Map<int,Vec2> renderChunkCoordinates;
  TileManager(main_tile,seed,List<Map> patches,callback){
    mainTile = main_tile;
    this.seed = seed;
    tiles = new Map();
    renderChunks = new Map<int,html.ImageElement>();
    renderChunkCoordinates = new Map<int,Vec2>();
    
    Set<String> patch_types = new Set<String>();
    patches.forEach((v){
      patch_types.add(v["type"]);
    });
    
    int totalToLoad = 2 + patch_types.length;
    int totalLoaded = 0;
    
    void checkDone(){
      totalLoaded ++;
      if (totalLoaded >= totalToLoad){
        callback();
      }
    }
    res.loadTile(main_tile,(imgList){
      tiles[main_tile] = imgList;
      checkDone();
    });
    patch_types.forEach((v){
      res.loadTile(v,(imgList){
        tiles[v] = imgList;
        checkDone();
      });
    });
    
    this.patches = new Map<String,List<TilePatch>>();
    patches.forEach((v){
      int x = v["x"];
      int y = v["y"];
      getPatch(x,y).add(new TilePatch(v["data"],v['type']));
    });
    checkDone();
  }
  void render(html.CanvasRenderingContext2D c,Camera camera){
    //manualTileRender(c,camera);
    
    //Render Chunks
    num tx = (camera.x - SCREEN_WIDTH/2/camera.animatedZoom);
    num ty = (camera.y - SCREEN_HEIGHT/2/camera.animatedZoom);
    tx -= tx.toInt()%(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE);
    ty -= ty.toInt()%(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE);
    int txi = (tx/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)).toInt();
    int tyi = (ty/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)).toInt();
    
    //Render on-screen chunks
    for(int i = -1;i<SCREEN_WIDTH/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)/camera.animatedZoom+1;i++){
      for(int u = -1;u<SCREEN_HEIGHT/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)/camera.animatedZoom+1;u++){
        final int index = ((txi+i)%CHUNK_JOIN) + ((tyi+u)%CHUNK_JOIN)*CHUNK_JOIN;
        if (renderChunkCoordinates[index] != null && renderChunkCoordinates[index].at(txi+i,tyi+u) && renderChunks[index] != null){//TODO fill renderChunkCoordinates beforehand so we dont need to check null
          c.drawImage(renderChunks[index], tx + i * (CHUNK_SIZE * GRAPHIC_BLOCK_SIZE), ty + u * (CHUNK_SIZE * GRAPHIC_BLOCK_SIZE));
        }else{
          renderChunkCoordinates[index] = new Vec2(txi + i,tyi + u);
          renderChunks[index] = generateTileChunk((txi + i)*CHUNK_SIZE,(tyi + u)*CHUNK_SIZE);
        }
      }
    }
  }
  List<TilePatch> getPatch(int x,int y) => patches["${x}x${y}"] != null ? patches["${x}x${y}"] : patches["${x}x${y}"] = new List<TilePatch>();   
  void manualTileRender(html.CanvasRenderingContext2D c,Camera camera){
    num tx = (camera.x - SCREEN_WIDTH/2/camera.animatedZoom);
    num ty = (camera.y - SCREEN_HEIGHT/2/camera.animatedZoom);
    tx -= tx.toInt()%32;
    ty -= ty.toInt()%32;
    int txi = (tx/32).toInt();
    int tyi = (ty/32).toInt();
    for(int i = 0;i<SCREEN_WIDTH/32/camera.animatedZoom+1;i++){
      for(int u = 0;u<SCREEN_HEIGHT/32/camera.animatedZoom+1;u++){
        c.drawImage(tiles[mainTile][SURROUND(txi+i,tyi+u)], tx + i * 32, ty + u * 32);
      }
    }
  }
  html.ImageElement generateTileChunk(int sx,int sy,[callback=null]){
    //TODO OPTIMIZE THIS A LOT! REDO ENTIRELY! EXTREMELY DIRTY
    //Starting at (sx,sy) draw a block (size specified by CHUNK_SIZE)
    //TODO relies on CHUNK_SIZE to be a factor of patch_size
    HiddenCanvas hc = new HiddenCanvas(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE,CHUNK_SIZE * GRAPHIC_BLOCK_SIZE);
    html.CanvasRenderingContext2D c = hc.context;
    int patchx = (sx/patch_size).floor().toInt();
    int patchy = (sy/patch_size).floor().toInt();
    List<TilePatch> patches = getPatch(patchx,patchy);
    for (var x = 0;x<CHUNK_SIZE;x++){
      for (var y = 0;y<CHUNK_SIZE;y++){
        c.drawImage(tiles[mainTile][SURROUND(sx+x,sy+y)], x * GRAPHIC_BLOCK_SIZE, y * GRAPHIC_BLOCK_SIZE);
        for (int i = 0;i<patches.length;i++){
          int tio = patches[i].at(sx+x - (patchx)*patch_size, sy+y - (patchy)*patch_size);//Tile Orientation
          if ( tio != 0){
            c.drawImage(tiles[patches[i].type][tio], x * GRAPHIC_BLOCK_SIZE, y * GRAPHIC_BLOCK_SIZE);
          }
        }
      }
    }
    if (callback == null){
      callback = (img){};
    }
    return hc.getImage(callback);
  }
  int SIDEBOTTOM(int x,int y) => 13;
  int SIDETOP(int x,int y) => 7;
  int SIDELEFT(int x,int y) => 9;
  int SIDERIGHT(int x,int y) => 11;
  int CORNERBOTTOMRIGHT(int x,int y) => 14;
  int CORNERTOPRIGHT(int x,int y) => 8;
  int CORNERBOTTOMLEFT(int x,int y) => 12;
  int CORNERTOPLEFT(int x,int y) => 5;
  int SURROUND(int x,int y) => [10,17][rand.integer(seed,x,y)%2];
  int SPLOTCH(int x,int y) => [0,3][rand.integer(seed,x,y)%2];
  static List orientationMap = const[10,9,7,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10];
}
