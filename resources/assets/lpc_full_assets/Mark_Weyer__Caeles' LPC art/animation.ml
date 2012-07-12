(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

class animation = object (self)
  method step = ()
  method draw _ = ()
  method drawstep (run:Zbuffer.run) = self#draw run; self#step
end

class loop tilesheet w h poses_ x y z = object
  inherit animation

  val length = List.length poses_
  val poses = Array.of_list poses_
  val mutable t = 0

  method step = t <- (t+1) mod length
  method draw run =
    let sx,sy = poses.(t)  in
    if sx>=0
    then Zbuffer.blit tilesheet w h sx sy x y (z+y/32*Layer.planes) run

end


class once tilesheet w h poses x y z = object
  inherit loop tilesheet w h poses x y z

  method step = t <- min (t+1) (length-1)
end


class delay delay (anim:animation) = object
  inherit animation

  val mutable clock = delay

  method step = if clock>0
  then clock <- clock-1
  else anim#step

  method draw run = if clock>0
  then ()
  else anim#draw run

end


class slow factor (anim:animation) = object
  inherit animation

  val mutable clock = 0

  method step =
    clock <- (clock+1) mod factor;
    if clock=0 then anim#step

  method draw run = anim#draw run

end

