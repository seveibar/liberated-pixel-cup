(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

let speed = 8
let basespeed = 4

class attack length x y z filename = object

  inherit Animation.animation

  val sheet = Tilesheet.load filename
  val mutable time=0

  method step = time<-time+1

  method draw run =
    let length = (speed-basespeed)*min time length  in
    Zbuffer.blit sheet 1 1 15 1 (x+speed*time) y z run;
    for i=1 to length/32 do
      Zbuffer.blit sheet 1 1 1 1 (x+speed*time-i*32) y z run
    done;
    Zbuffer.blit sheet 1 1 (length mod 32/2) 0 (x+speed*time-length/32*32-32) y z run

end

