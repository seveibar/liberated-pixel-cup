class TileManager {
  Map<int,html.ImageElement> renderChunks;
  Map<int,Vec2> renderChunkCoordinates;
  TileManager(){
    renderChunks = new Map<int,html.ImageElement>();
    renderChunkCoordinates = new Map<int,Vec2>();
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
  html.ImageElement generateTileChunk(int sx,int sy,[callback=null]){
    return res.loadImage("map/${(sx/CHUNK_SIZE).toInt()}x${(sy/CHUNK_SIZE).toInt()}.png", callback);
  }
}
