(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

val planes : int

class layer : int -> int -> int -> object

  method set_tile : int -> int -> Tilesheet.tilesheet -> int -> int -> unit
  method draw : Zbuffer.run -> unit

end

