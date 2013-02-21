part of BigIsland;
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

class Vec2 {
  num x,y;
  Vec2([num x=0.0,num y=0.0]){
    this.x = x;
    this.y = y;
  }
  Vec2 set (num x,num y){
    this.x = x;
    this.y = y;
    return this;
  }
  Vec2 copy (Vec2 v){
    this.x = v.x;
    this.y = v.y;
    return this;
  }
  Vec2 add(Vec2 v){
    x += v.x;
    y += v.y;
    return this;
  }
  Vec2 addTo(num a,num b){
    x += a;
    y += b;
    return this;
  }
  Vec2 subTo(num a,num b){
    x -= a;
    y -= b;
    return this;
  }
  Vec2 sub(Vec2 v){
    x -= v.x;
    y -= v.y;
    return this;
  }
  Vec2 multiplyScalar(num a){
    x *= a;
    y *= a;
    return this;
  }
  Vec2 multiplyX(num a){
    x *= a;
    return this;
  }
  Vec2 multiplyY(num a){
    y *= a;
    return this;
  }
  Vec2 divideScalar(num a){
    a=a==0?.0001:a;
    x/=a;
    y/=a;
    return this;
  }
  Vec2 negate(){
    multiplyScalar(-1);
    return this;
  }
  Vec2 negateX(){
    multiplyX(-1);
    return this;
  }
  Vec2 negateY(){
    multiplyY(-1);
    return this;
  }
  num dot(Vec2 v){
    return x * v.x + y * v.y;
  }
  num lengthSq(){
    return x*x+y*y;
  }
  num length(){
    return sqrt(lengthSq()); 
  }
  Vec2 normalize(){
    return divideScalar(length());
  }
  num distanceToSquared(Vec2 v){
    num dx = v.x - x;num dy = v.y - y;
    return dx*dx+dy*dy;
  }
  num distanceTo(Vec2 v){
    return sqrt(distanceToSquared(v));
  }
  Vec2 setLength(num a){
    return normalize().multiplyScalar(a);
  }
  bool equals(Vec2 v){
    return (v.x == x && v.y == y);
  }
  Vec2 clone(){
    return new Vec2(x,y);
  }
  Vec2 zero(){
    this.multiplyScalar(0);
    return this;
  }
  Vec2 zeroX(){
    this.x = 0;
    return this;
  }
  Vec2 zeroY(){
    this.y = 0;
    return this;
  }
  bool isZero([approx=0.0001]){
    return (lengthSq() < approx);
  }
  bool at(num tx,num ty){
    return x == tx && y == ty;
  }
  String toString(){
    return "($x,$y)";
  }
  //returns direction 0-up,1-left,2-down,3-right
  int getDirection() => y==0 ? 0 : x.abs()>y.abs() ? x==0? 0 : ((x/x.abs()).round()+2).toInt() : ((y/y.abs()).round()+1).toInt();
  
}
