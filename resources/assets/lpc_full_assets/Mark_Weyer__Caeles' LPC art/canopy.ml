(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

let border = (16,24,32)
let inner_sep = (0,48,35)

let clip_top = ref 0
let clip_bottom = ref 10000
let clip_left = ref 0
let clip_right = ref 10000

let growx dir = match dir with
  | "south" | "north" -> 0
  | "east" -> 4
  | "west" -> -4

let growy dir = match dir with
  | "south" -> 2
  | "north" -> -2
  | "east" | "west" -> 0

let put_leaf leaves sx sy surface dx dy =
  Sdlvideo.lock leaves;
  Sdlvideo.lock surface;
  for i=0 to 31 do
    for j=0 to 31 do
      let sc,sa = Sdlvideo.get_RGBA leaves
        (Sdlvideo.get_pixel leaves ~x:(sx*32+i) ~y:(sy*32+j))  in
      let dx' = dx+i  in
      let dy' = dy+j  in
      if dx'>= !clip_left && dx'< !clip_right
          && dy'>= !clip_top && dy'< !clip_bottom then (
        let dc = Sdlvideo.get_pixel_color surface ~x:dx' ~y:dy'  in
        let dc' = if sa=0
        then dc
        else if dc=(0,0,0) || sc<>border
          then sc
  	  else inner_sep  in
        Sdlvideo.put_pixel_color surface ~x:dx' ~y:dy' dc')
    done
  done;
  Sdlvideo.unlock leaves;
  Sdlvideo.unlock surface

let stack dir size leaves start topx surface x y xytop =
  let row = match dir with
  | "south" -> 0
  | "north" -> 1
  | "west" -> 2
  | "east" -> 3  in
  let vertical = growx dir=0  in
  let start' = start+1-start mod 2  in
  for i=0 to size-1 do
    put_leaf leaves ((1600-2*i + if i=0 then start else start') mod 16) row
      surface (x-growx dir*i) (y-growy dir*i)
  done;
  put_leaf leaves topx 4 surface
    (if vertical then x else xytop)
    (if vertical then xytop else y)

let grow_stacks dir minsize leaves topx surface xy xytop =
  let vertical = growx dir=0  in
  for i=0 to 15 do
    stack dir (minsize+i/2) leaves i topx
      surface
      ((if vertical then 32*i else xy)+i/2*growx dir)
      ((if vertical then xy else 32*i)+i/2*growy dir)
      xytop
  done

let grow_south leaves topx surface y =
  clip_top:=y;
  grow_stacks "south" (-4) leaves topx surface (y-26) (y-16);
  clip_top:=y+32;
  grow_stacks "south" 4 leaves topx surface (y+22) (y+16)

let grow_north leaves topx surface y =
  clip_bottom:=y+32;
  grow_stacks "north" (-5) leaves topx surface (y+18) (y+16);
  clip_bottom:=y+80;
  grow_stacks "north" 3 leaves topx surface (y+50) (y+64)

let grow_west leaves topx surface x =
  clip_right:=x+64;
  grow_stacks "west" (-4) leaves topx surface (x+48) (x+32);
  clip_right:=x+160;
  grow_stacks "west" 4 leaves topx surface (x+112) (x+128)

let grow_east leaves topx surface x =
  clip_left:=x;
  grow_stacks "east" (-4) leaves topx surface (x-16) x;
  clip_left:=x+64;
  grow_stacks "east" 4 leaves topx surface (x+80) (x+64)

let grow_bla topxs factor grow leaves surface =
  Array.iteri (fun i topx -> grow leaves topx surface ((3+5*i)*factor)) topxs

let grow_sn = grow_bla [|1;4;5;7;10;11|] 16
let grow_we = grow_bla [|1;2;3;6;8;9|] 32

;;

let dir = Sys.argv.(1)  in
let w,h = match dir with
| "south" | "north" -> 512,544
| "east" | "west" -> 1056,512
| "base" -> 512,160  in

Sdl.init [`VIDEO];
let screen = Sdlvideo.set_video_mode ~w:w ~h:h ~bpp:32 []  in

let leaves = Sdlloader.load_image
  (if dir="base" then "leaves.png" else "canopy_base.png")  in

(match dir with
| "base" -> (
  for i=0 to 15 do
    for j=0 to 4 do
      put_leaf leaves i j screen (i*32) (j*32)
    done
  done;
  clip_top:=128;
  clip_bottom:=160;
  clip_left:=64;
  clip_right:=96;
  stack "south" 32 leaves 1 0 screen 64 150 0;
  clip_left:=96;
  clip_right:=128;
  stack "north" 32 leaves 1 0 screen 96 98 0;
  clip_left:=128;
  clip_right:=160;
  stack "west" 24 leaves 1 0 screen 80 128 0;
  clip_left:=160;
  clip_right:=192;
  stack "east" 24 leaves 1 0 screen 208 128 0;
  clip_left:=192;
  clip_right:=224;
  stack "south" 19 leaves 15 0 screen 192 164 128;
  stack "north" 10 leaves 15 1 screen 192 100 128;
  clip_left:=224;
  clip_right:=256;
  stack "west" 11 leaves 15 0 screen 180 128 224;
  stack "east" 11 leaves 15 1 screen 268 128 224;
  clip_left:=256;
  clip_right:=288;
  stack "south" 24 leaves 15 0 screen 256 132 0;
  clip_left:=288;
  clip_right:=320;
  stack "north" 24 leaves 15 0 screen 288 116 0;
  clip_left:=320;
  clip_right:=352;
  stack "west" 24 leaves 15 0 screen 308 128 0;
  clip_left:=352;
  clip_right:=384;
  stack "east" 24 leaves 15 0 screen 364 128 0;
  )
| "south" -> (
  grow_stacks dir 16 leaves 0 screen (-10) 0;
  grow_sn grow_south leaves screen;
  )
| "north" -> (
  clip_bottom:=48;
  grow_stacks dir 16 leaves 0 screen 18 0;
  grow_sn grow_north leaves screen;
  )
| "west" -> (
  clip_right:=96;
  grow_stacks dir 16 leaves 0 screen 48 0;
  grow_we grow_west leaves screen;
  )
| "east" -> (
  grow_stacks dir 16 leaves 0 screen 16 0;
  grow_we grow_east leaves screen;
  )
);

Ppm.grab_ppm ("canopy_"^dir^".ppm");

if dir<>"base" then (
  Sdlvideo.lock screen;
  for x=0 to w-1 do
    for y=0 to h-1 do
      let c = Sdlvideo.get_pixel_color screen ~x:x ~y:y  in
      let c' = if c=border || c=(0,0,0)
      then (0,0,0)
      else (153,0,0)  in
      Sdlvideo.put_pixel_color screen ~x:x ~y:y c'
    done
  done;
  Sdlvideo.unlock screen;
  Ppm.grab_pgm ("canopy_"^dir^"_shadow.pgm");
);


Sdl.quit ();

