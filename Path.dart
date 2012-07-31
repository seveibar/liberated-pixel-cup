class Path {
  PathNode start,end;
  List<Vec2> points;
  Path(Vec2 s,Vec2 e,this.points,bool houseStart,bool houseEnd){
    start = new PathNode.fromVec2(s, this, houseStart,true);
    end = new PathNode.fromVec2(e, this, houseEnd,false);
  }
}
