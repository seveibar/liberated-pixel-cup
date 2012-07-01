class FrameMap {
  final int orientations;
  final int positions;
  final List<html.ImageElement> frames;
  FrameMap(int orientations_,int positions_,List<html.ImageElement> list):orientations = orientations_,positions = positions_,frames = list{
    //Orient frames if necessary, (unnecesary ATM)
  }
  void render(html.CanvasRenderingContext2D c,int orientation,int position){
    c.drawImage(getImage(orientation,position),0,0);
  }
  html.ImageElement getImage(int orientation,int position) => frames[positions * orientation + (position%positions)];
}
