(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

let grab_ppm filename =
  let file = open_out filename  in
  output_string file "P6\n";
  let s = Sdlvideo.get_video_surface ()  in
  let w,h,_ = Sdlvideo.surface_dims s  in
  output_string file (string_of_int w ^ "\n");
  output_string file (string_of_int h ^ "\n");
  output_string file "255\n";
  Sdlvideo.lock s;
  for y = 0 to h-1 do
    for x = 0 to w-1 do
      let r,g,b = Sdlvideo.get_pixel_color s ~x:x ~y:y  in
      output_byte file r;
      output_byte file g;
      output_byte file b;
    done
  done;
  Sdlvideo.unlock s;
  close_out file

let grab_pgm filename =
  let file = open_out filename  in
  output_string file "P5\n";
  let s = Sdlvideo.get_video_surface ()  in
  let w,h,_ = Sdlvideo.surface_dims s  in
  output_string file (string_of_int w ^ "\n");
  output_string file (string_of_int h ^ "\n");
  output_string file "255\n";
  Sdlvideo.lock s;
  for y = 0 to h-1 do
    for x = 0 to w-1 do
      let r,_,_ = Sdlvideo.get_pixel_color s ~x:x ~y:y  in
      output_byte file r;
    done
  done;
  Sdlvideo.unlock s;
  close_out file

