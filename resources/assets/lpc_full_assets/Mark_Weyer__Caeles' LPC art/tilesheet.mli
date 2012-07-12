(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

type tilesheet

val empty : ?tilesize:int -> unit -> tilesheet
val load : ?tilesize:int -> string -> tilesheet
val blit : tilesheet -> int -> int -> int -> int ->
    Sdlvideo.surface -> int -> int -> unit
  (* The int are: w,h,x,y of the tile, x,y on the surface. *)

