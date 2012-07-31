class PathNode extends Vec2{
  Path path;
  bool house,start;
  PathNode(num x,num y,this.path,this.house,this.start):super(x,y);
  PathNode.fromVec2(Vec2 v,this.path,this.house,this.start):super(v.x,v.y);
}
