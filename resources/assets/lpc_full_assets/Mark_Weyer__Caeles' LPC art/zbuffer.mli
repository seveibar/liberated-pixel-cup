(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

type run

val init : Sdlvideo.surface -> run
val blit : Tilesheet.tilesheet -> int -> int -> int -> int -> int -> int ->
  int -> run -> unit
val finish : run -> unit

