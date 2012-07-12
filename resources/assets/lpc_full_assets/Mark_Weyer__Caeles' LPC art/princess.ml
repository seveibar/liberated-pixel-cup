(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

let speed = 4
let grav = 3

class princess x0 y0 z0 moves' = object (self)

  inherit Animation.animation

  val sheet = Tilesheet.load "princess.png"
  val mutable x=x0
  val mutable y=y0
  val mutable jump=false
  val mutable dx=0
  val mutable dy=0
  val mutable phase=0
  val mutable moves = moves'
  val mutable steps=0

  initializer self#step

  method step =
    phase <- (phase+1) mod 8;
    (if steps=0
    then match moves with
    | [] -> (dx<-0; dy<-0; jump<-false)
    | (dir,steps')::t -> (
      steps <- steps';
      moves <- t;
      match abs dir with
      | 1 -> (dx <- dir; jump <- false; dy <- 0)
      | 2-> (dx <- dir/2; jump <- true; dy <- -32/speed*grav)
      | 3 -> (dx <- dir/3; jump <- true; dy <- 0))
    else steps<-steps-1);
    x <- x + speed*dx;
    (if jump then (y <- y+dy; dy <- dy+grav))

  method draw run = Zbuffer.blit sheet 2 2 (2*(phase+1)) (4+2*dx)
    (x-32) (y-48) (z0-y/32*Layer.planes) run

end

