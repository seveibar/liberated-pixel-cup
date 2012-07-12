(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

class animation : object
  method step : unit
  method draw : Zbuffer.run -> unit
  method drawstep : Zbuffer.run -> unit
end

class once : Tilesheet.tilesheet -> int -> int -> (int*int) list ->
  int -> int -> int -> animation

class loop : Tilesheet.tilesheet -> int -> int -> (int*int) list ->
  int -> int -> int -> animation

class delay : int -> animation -> animation
class slow : int -> animation -> animation

