(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

let planes=4

class layer w h z0 =
  let empty = Tilesheet.empty ()  in
  object

  val tiles = Array.init w (fun _ -> Array.init h (fun _ -> empty,0,0))

  method set_tile x y ts sx sy = tiles.(x).(y) <- (ts,sx,sy)
  method draw run = Array.iteri (fun x -> Array.iteri (fun y (ts,sx,sy) ->
      Zbuffer.blit ts 1 1 sx sy (x*32) (y*32)
	(z0+planes*y)
	run))
    tiles

end

