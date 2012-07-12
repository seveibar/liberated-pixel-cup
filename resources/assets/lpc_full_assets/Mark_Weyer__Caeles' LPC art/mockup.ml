(*
  Copyright 2012 by Mark Weyer
  Licensed under the OINM license version 0
  or (at your option) under the Creative Commons Attribution ShareAlike license version 3.0
  or (at your option) under the GNU General Public License version 3
*)

let w = 17
let h = 8
let path_y = h-2
let post_x = 0
let post_y = h-2
let bath_x = w-1
let bath_y = h-2
let tree1_x = 7
let tree2_x = 11

let quit = ref false

let rec checkquit _ =
  Sdlevent.pump ();
  match Sdlevent.poll () with
  | Some (Sdlevent.KEYDOWN _) -> quit:=true
  | _ -> ()

;;

Sdl.init [`VIDEO; `TIMER];
let screen = Sdlvideo.set_video_mode ~w:(w*32) ~h:(h*32) ~bpp:32 []  in

let dirt = Tilesheet.load "dirt.png"  in
let earth = new Layer.layer w h (-3)  in
for x=0 to w-1 do
  earth#set_tile x path_y dirt 0 ((1+Random.int 3)/2)
done;

let grass = Tilesheet.load "grass.png"  in
let ground = new Layer.layer w h (-4)  in
for x=0 to w-1 do
  for y=0 to h-1 do
    let tx,ty = if Random.bool ()
    then 1,3
    else Random.int 3,5  in
    ground#set_tile x y grass tx ty
  done
done;

let birdbath = Tilesheet.load "birdbath.png"  in
let bath = new Animation.loop birdbath 1 2 [0,0;] (bath_x*32) (bath_y*32) 6  in
let lbird = new Animation.slow 3 (new Animation.loop birdbath 1 1 [1,1; 2,1; 3,1; 4,1;] (bath_x*32) (bath_y*32) 7)  in
let rbird = new Animation.slow 4 (new Animation.loop birdbath 1 1 [7,1; 8,1; 5,1; 6,1;] (bath_x*32) (bath_y*32) 7)  in

let signpost = Tilesheet.load "signpost.png"  in
let pole = new Animation.loop signpost 1 2 [0,0;] (post_x*32) (post_y*32) 6  in
let top = new Animation.loop signpost 1 1
  [1,0; 1,1; 4,0; 2,1; 2,0; 4,1; 3,0; 3,1;] (post_x*32) (post_y*32) 8  in
let mid = new Animation.slow 9 (new Animation.loop signpost 1 1
  [1,0; 1,1; 4,0; 2,1; 2,0; 4,1; 3,0; 3,1;] (post_x*32) (post_y*32+9) 7)  in

let signpost_shadow = Tilesheet.load "signpost_shadow.png"  in
let sps = new Animation.loop signpost_shadow 1 1
  [0,0; 0,7; 0,6; 0,5; 0,4; 0,3; 0,2; 0,1; 0,0;
    7,7; 7,6; 7,5; 7,4; 7,3; 7,2; 7,1; 7,0; 7,7;
    6,6; 6,5; 6,4; 6,3; 6,2; 6,1; 6,0; 6,7; 6,6;
    5,5; 5,4; 5,3; 5,2; 5,1; 5,0; 5,7; 5,6; 5,5;
    4,4; 4,3; 4,2; 4,1; 4,0; 4,7; 4,6; 4,5; 4,4;
    3,3; 3,2; 3,1; 3,0; 3,7; 3,6; 3,5; 3,4; 3,3;
    2,2; 2,1; 2,0; 2,7; 2,6; 2,5; 2,4; 2,3; 2,2;
    1,1; 1,0; 1,7; 1,6; 1,5; 1,4; 1,3; 1,2; 1,1;] (post_x*32) (post_y*32+32) 2  in

let tree = Tilesheet.load "platformtree.png"  in
let canopy_s = Tilesheet.load ~tilesize:16 "canopy_south.png"  in
let canopy_n = Tilesheet.load ~tilesize:16 "canopy_north.png"  in
let canopy_w = Tilesheet.load "canopy_west.png"  in
let canopy_e = Tilesheet.load "canopy_east.png"  in
let treelayers = Array.init 5 (fun i -> new Layer.layer w h (2+i*4))  in
treelayers.(0)#set_tile tree1_x (path_y-1) tree 1 3;
treelayers.(1)#set_tile tree1_x (path_y-2) tree 0 2;
treelayers.(2)#set_tile tree1_x (path_y-3) tree 0 2;
treelayers.(3)#set_tile tree1_x (path_y-4) tree 0 2;
treelayers.(4)#set_tile tree1_x (path_y-5) tree 0 0;
treelayers.(0)#set_tile tree2_x (path_y+1) tree 1 3;
treelayers.(1)#set_tile tree2_x (path_y) tree 0 2;
treelayers.(2)#set_tile tree2_x (path_y-1) tree 0 0;
let canopy = [
  new Animation.loop tree 1 1 [1,2] (tree1_x*32) (path_y*32-96) 11;
  new Animation.loop tree 1 1 [1,1] (tree1_x*32) (path_y*32-160) 19;
  new Animation.loop tree 1 1 [1,0] (tree1_x*32) (path_y*32-160) 21;

  new Animation.once canopy_s 2 2
    [0,3; 2,3; 4,3; 6,3; 8,3; 10,3; 12,3; 14,3; 
      16,3; 18,3; 20,3; 22,3; 24,3; 26,3; 28,3; 30,3; -1,0]
    (tree1_x*32) (path_y*32-80) 12;
  new Animation.delay 16 (new Animation.once canopy_s 2 3
    [0,5; 2,5; 4,5; 6,5; 8,5; 10,5; 12,5; 14,5; 
      16,5; 18,5; 20,5; 22,5; 24,5; 26,5; 28,5; 30,5; -1,0]
    (tree1_x*32) (path_y*32-80) 12);
  new Animation.delay 32 (new Animation.once canopy_s 2 1 [30,5]
    (tree1_x*32) (path_y*32-80) 12);
  new Animation.delay 32 (new Animation.once canopy_s 2 3
    [0,0; 2,0; 4,0; 6,0; 8,0; 10,0; 12,0; 14,0; 
      16,0; 18,0; 20,0; 22,0; 24,0; 26,0; 28,0; 30,0; -1,0]
    (tree1_x*32) (path_y*32-64) 12);
  new Animation.delay 48 (new Animation.once canopy_s 2 1 [30,2]
    (tree1_x*32) (path_y*32-32) 12);

  new Animation.delay 48 (new Animation.once canopy_w 2 1
    [23,0; 23,1; 23,2; 23,3; 23,4; 23,5; 23,6; 23,7;
      23,8; 23,9; 23,10; 23,11; 23,12; 23,13; 23,14; 23,15; -1,0]
    (tree1_x*32-32) (path_y*32-64) 12);
  new Animation.delay 64 (new Animation.once canopy_w 3 1
    [25,0; 25,1; 25,2; 25,3; 25,4; 25,5; 25,6; 25,7;
      25,8; 25,9; 25,10; 25,11; 25,12; 25,13; 25,14; 25,15; -1,0]
    (tree1_x*32-64) (path_y*32-64) 12);
  new Animation.delay 80 (new Animation.once canopy_w 1 1 [27,15]
    (tree1_x*32) (path_y*32-64) 12);
  new Animation.delay 80 (new Animation.once canopy_w 3 1
    [0,0; 0,1; 0,2; 0,3; 0,4; 0,5; 0,6; 0,7;
      0,8; 0,9; 0,10; 0,11; 0,12; 0,13; 0,14; 0,15; -1,0]
    (tree1_x*32-96) (path_y*32-64) 12);
  new Animation.delay 96 (new Animation.once canopy_w 1 1 [2,15]
    (tree1_x*32-32) (path_y*32-64) 12);
  new Animation.delay 96 (new Animation.once canopy_w 3 1
    [0,0; 0,1; 0,2; 0,3; 0,4; 0,5; 0,6; 0,7;
      0,8; 0,9; 0,10; 0,11; 0,12; 0,13; 0,14; 0,15; -1,0]
    (tree1_x*32-128) (path_y*32-64) 12);
  new Animation.delay 112 (new Animation.once canopy_w 1 1 [2,15]
    (tree1_x*32-64) (path_y*32-64) 12);
  new Animation.delay 112 (new Animation.once canopy_w 3 1
    [0,0; 0,1; 0,2; 0,3; 0,4; 0,5; 0,6; 0,7;
      0,8; 0,9; 0,10; 0,11; 0,12; 0,13; 0,14; 0,15]
    (tree1_x*32-160) (path_y*32-64) 12);

  new Animation.once canopy_s 2 2
    [0,3; 2,3; 4,3; 6,3; 8,3; 10,3; 12,3; 14,3; 
      16,3; 18,3; 20,3; 22,3; 24,3; 26,3; 28,3; 30,3; -1,0]
    (tree1_x*32) (path_y*32-144) 20;
  new Animation.delay 16 (new Animation.once canopy_s 2 3
    [0,5; 2,5; 4,5; 6,5; 8,5; 10,5; 12,5; 14,5; 
      16,5; 18,5; 20,5; 22,5; 24,5; 26,5; 28,5; 30,5; -1,0]
    (tree1_x*32) (path_y*32-144) 20);
  new Animation.delay 32 (new Animation.once canopy_s 2 1 [30,5]
    (tree1_x*32) (path_y*32-144) 20);
  new Animation.delay 32 (new Animation.once canopy_s 2 3
    [0,0; 2,0; 4,0; 6,0; 8,0; 10,0; 12,0; 14,0; 
      16,0; 18,0; 20,0; 22,0; 24,0; 26,0; 28,0; 30,0; -1,0]
    (tree1_x*32) (path_y*32-128) 20);
  new Animation.delay 48 (new Animation.once canopy_s 2 1 [30,2]
    (tree1_x*32) (path_y*32-96) 20);

  new Animation.delay 48 (new Animation.once canopy_e 2 1
    [23,0; 23,1; 23,2; 23,3; 23,4; 23,5; 23,6; 23,7;
      23,8; 23,9; 23,10; 23,11; 23,12; 23,13; 23,14; 23,15; -1,0]
    (tree1_x*32) (path_y*32-128) 20);
  new Animation.delay 64 (new Animation.once canopy_e 3 1
    [25,0; 25,1; 25,2; 25,3; 25,4; 25,5; 25,6; 25,7;
      25,8; 25,9; 25,10; 25,11; 25,12; 25,13; 25,14; 25,15; -1,0]
    (tree1_x*32) (path_y*32-128) 20);
  new Animation.delay 80 (new Animation.once canopy_e 1 1 [25,15]
    (tree1_x*32) (path_y*32-128) 20);
  new Animation.delay 80 (new Animation.once canopy_e 3 1
    [0,0; 0,1; 0,2; 0,3; 0,4; 0,5; 0,6; 0,7;
      0,8; 0,9; 0,10; 0,11; 0,12; 0,13; 0,14; 0,15; -1,0]
    (tree1_x*32+32) (path_y*32-128) 20);
  new Animation.delay 96 (new Animation.once canopy_e 1 1 [0,15]
    (tree1_x*32+32) (path_y*32-128) 20);
  new Animation.delay 96 (new Animation.once canopy_e 3 1
    [0,0; 0,1; 0,2; 0,3; 0,4; 0,5; 0,6; 0,7;
      0,8; 0,9; 0,10; 0,11; 0,12; 0,13; 0,14; 0,15]
    (tree1_x*32+64) (path_y*32-128) 20);

  new Animation.loop tree 1 1 [1,1] (tree2_x*32) (path_y*32-32) 11;
  new Animation.loop tree 1 1 [1,0] (tree2_x*32) (path_y*32-32) 13;

  new Animation.once canopy_n 2 2
    [0,3; 2,3; 4,3; 6,3; 8,3; 10,3; 12,3; 14,3; 
      16,3; 18,3; 20,3; 22,3; 24,3; 26,3; 28,3; 30,3; -1,0]
    (tree2_x*32) (path_y*32-48) 12;
  new Animation.delay 16 (new Animation.once canopy_n 2 3
    [0,5; 2,5; 4,5; 6,5; 8,5; 10,5; 12,5; 14,5; 
      16,5; 18,5; 20,5; 22,5; 24,5; 26,5; 28,5; 30,5; -1,0]
    (tree2_x*32) (path_y*32-64) 12);
  new Animation.delay 32 (new Animation.once canopy_n 2 1 [30,7]
    (tree2_x*32) (path_y*32-32) 12);
  new Animation.delay 32 (new Animation.once canopy_n 2 3
    [0,0; 2,0; 4,0; 6,0; 8,0; 10,0; 12,0; 14,0; 
      16,0; 18,0; 20,0; 22,0; 24,0; 26,0; 28,0; 30,0; -1,0]
    (tree2_x*32) (path_y*32-80) 12);
  new Animation.delay 48 (new Animation.once canopy_n 2 1 [30,0]
    (tree2_x*32) (path_y*32-80) 12);

  new Animation.delay 48 (new Animation.once canopy_e 2 1
    [28,0; 28,1; 28,2; 28,3; 28,4; 28,5; 28,6; 28,7;
      28,8; 28,9; 28,10; 28,11; 28,12; 28,13; 28,14; 28,15; -1,0]
    (tree2_x*32) (path_y*32-64) 12);
  new Animation.delay 64 (new Animation.once canopy_e 3 1
    [30,0; 30,1; 30,2; 30,3; 30,4; 30,5; 30,6; 30,7;
      30,8; 30,9; 30,10; 30,11; 30,12; 30,13; 30,14; 30,15; -1,0]
    (tree2_x*32) (path_y*32-64) 12);
  new Animation.delay 80 (new Animation.once canopy_e 1 1 [30,15]
    (tree2_x*32) (path_y*32-64) 12);
  new Animation.delay 80 (new Animation.once canopy_e 3 1
    [0,0; 0,1; 0,2; 0,3; 0,4; 0,5; 0,6; 0,7;
      0,8; 0,9; 0,10; 0,11; 0,12; 0,13; 0,14; 0,15; -1,0]
    (tree2_x*32+32) (path_y*32-64) 12);
  new Animation.delay 96 (new Animation.once canopy_e 1 1 [0,15]
    (tree2_x*32+32) (path_y*32-64) 12);
  new Animation.delay 96 (new Animation.once canopy_e 3 1
    [0,0; 0,1; 0,2; 0,3; 0,4; 0,5; 0,6; 0,7;
      0,8; 0,9; 0,10; 0,11; 0,12; 0,13; 0,14; 0,15]
    (tree2_x*32+64) (path_y*32-64) 12);
  ]  in

let princess = new Princess.princess 32 (path_y*32+16) (path_y*8+2)
  [1,16; 2,16; -1,24; 1,16; 2,12; 2,13; 1,27; 3,6; 1,26; 3,6; 1,20]  in

let vehicle = new Vehicle.vehicle 336 (h*32+48) 3 0
  [0,36; 7,4; 6,4; 5,8; 4,4; 3,20; 1,8; 5,36; 1,36; 5,12;]  in

let attacks = [
  new Animation.delay 8 (new Attack.attack 8 80 184 50 "water_attack.png");
  new Animation.delay 100 (new Attack.attack 16 256 40 50 "water_attack.png");
  new Animation.delay 136 (new Attack.attack 16 400 108 50 "water_attack.png");
  ]  in

for i=1 to 200 do
  let run=Zbuffer.init screen  in
  earth#draw run;
  ground#draw run;
  bath#drawstep run;
  lbird#drawstep run;
  rbird#drawstep run;
  pole#drawstep run;
  mid#drawstep run;
  top#drawstep run;
  sps#drawstep run;
  vehicle#drawstep run;
  princess#drawstep run;
  Array.iter (fun layer -> layer#draw run) treelayers;
  List.iter (fun anim -> anim#drawstep run) (canopy@attacks);

  Zbuffer.finish run;
  Sdlvideo.update_rect screen;
  Ppm.grab_ppm ("mockup"^string_of_int (i+10000)^".ppm");
done;

Sdl.quit ();

