(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

type run =
  (Sdlvideo.surface *
  (Tilesheet.tilesheet * int * int * int * int * int * int * int) list) ref

let init surface = ref (surface,[])

let blit ts w h sx sy dx dy z run =
  let surface,blits = !run  in
  run := surface, (ts,w,h,sx,sy,dx,dy,z)::blits

let finish run =
  let surface,blits = !run  in
  List.iter
    (fun (ts,w,h,sx,sy,dx,dy,_) -> Tilesheet.blit ts w h sx sy surface dx dy)
    (List.sort
      (fun (_,_,_,_,_,_,_,z1) (_,_,_,_,_,_,_,z2) -> compare z1 z2)
      blits)

