(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

type tilesheet = int * Sdlvideo.surface

let empty ?(tilesize=32) _ =
  let surface = Sdlvideo.create_RGB_surface [] ~w:tilesize ~h:tilesize ~bpp:32
    ~rmask:0xff000000l ~gmask:0x00ff0000l ~bmask:0x0000ff00l
    ~amask:0x000000ffl  in
  Sdlvideo.fill_rect ~rect:(Sdlvideo.rect 0 0 tilesize tilesize) surface 0l;
  tilesize,surface

let load ?(tilesize=32) filename = tilesize, Sdlloader.load_image filename

let blit (tilesize,t) w h xs ys s xd yd = Sdlvideo.blit_surface
  ~src:t
  ~src_rect:(Sdlvideo.rect
    (xs*tilesize) (ys*tilesize) (w*tilesize) (h*tilesize))
  ~dst:s ~dst_rect:(Sdlvideo.rect xd yd 0 0)
  ()

