(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

let speed = 4

class vehicle x0 y0 z0 dir0 moves' = object (self)

  inherit Animation.animation

  val sheet = Tilesheet.load "vehicle_all.png"
  val mutable x=x0
  val mutable y=y0
  val mutable dir=dir0
  val mutable ddir=0
  val mutable phase=0
  val mutable moves = moves'

  initializer self#step

  method step =
    phase <- (phase+1) mod 8;
    match moves with
    | [] -> ()
    | (dir',steps)::t -> if dir=dir'
      then (
        x <- x + speed*(match dir with
        | 0 | 1 | 2 -> -2
        | 3 | 7 -> 0
        | 4 | 5 | 6 -> 2);
        y <- y + speed*(match dir with
        | 0 | 6 | 7 -> -1
        | 1 | 5 -> 0
        | 2 | 3 | 4 -> 1);
	ddir <- 0;
        moves <- if steps>0  then (dir,steps-1)::t  else t)
      else if (dir'-dir+8) mod 8>4
        then (
	  dir <- (dir+7) mod 8;
	  ddir <- 1)
	else (
	  dir <- (dir+1) mod 8;
	  ddir <- 2)

  method draw run = Zbuffer.blit sheet 2 3 (2*(phase+8*ddir)) (3*dir)
    (x-32) (y-64) (z0+y/32*Layer.planes) run

end

