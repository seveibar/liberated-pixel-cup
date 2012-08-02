
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

class TileManager {
  Map<int,html.ImageElement> renderChunks;
  Map<int,Vec2> renderChunkCoordinates;
  String location;
  TileManager(this.location){
    renderChunks = new Map<int,html.ImageElement>();
    renderChunkCoordinates = new Map<int,Vec2>();
  }
  void render(html.CanvasRenderingContext2D c,Camera camera){
    //manualTileRender(c,camera);
    
    //Render Chunks
    final num tx_s = (camera.x - SCREEN_WIDTH/2/camera.animatedZoom);
    final num tx =  tx_s - tx_s.toInt()%(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE);
    final num ty_s = (camera.y - SCREEN_HEIGHT/2/camera.animatedZoom);
    final num ty = ty_s - ty_s.toInt()%(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE);
    final int txi = (tx/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)).toInt();
    final int tyi = (ty/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)).toInt();
    
    final num c1 = SCREEN_WIDTH/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)/camera.animatedZoom+1;
    final num c2 = SCREEN_HEIGHT/(CHUNK_SIZE * GRAPHIC_BLOCK_SIZE)/camera.animatedZoom+1;
    
    //Render on-screen chunks
    for(int i = -1;i<c1;i++){
      //TODO an error in dart2js, so this is divided up more than necessary (probably will be fixed)
      for(int u = -1;u<c2;u++){
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
    return res.loadImage("$location/${(sx/CHUNK_SIZE).toInt()}x${(sy/CHUNK_SIZE).toInt()}.png", callback);
  }
}
