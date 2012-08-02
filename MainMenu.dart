
// Big Island video game source code file
// Copyright (C) 2012  Severin Ibarluzea
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

class MainMenu {
  html.CanvasElement canvas;
  html.CanvasRenderingContext2D context;
  html.ImageElement title,background,creditsImage;
  Function fin;
  bool active = true;
  MainMenu(){
    //Draw loading screen
    canvas = html.document.query("#canvas");
    canvas.width = 800;
    canvas.height = 600;
    context = canvas.getContext('2d');
    context.save();
    context.fillStyle = "#000";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = "#fff";
    context.font = "36px Arial";
    context.textAlign = "center";
    context.fillText("Loading Big Island", canvas.width/2, canvas.height/2);
    context.restore();
    
    //Load assets
    title = res.loadImage("big_island_lpc.png",(img){
      background = res.loadImage("mainMenuBackground.png",(img){
        creditsImage = res.loadImage("attribution.png",(img){
          event = new UIManager();
          anim = [0,0,0,0,0];
          cycle(0);
        });
      });
    });
    
    //cycle(0);
  }
  bool cycle(int a){
    if (active){
      html.window.requestAnimationFrame(cycle);
      render();
    }else{
      fin();
    }
  }
  num dx=0,dy=0;
  List<num> anim;
  bool credits = false;
  void render(){
    context.save();
    dx -= (dx - ((event.mouse_position.x - canvas.width/2)/(canvas.width) * (background.width - canvas.width) - (background.width - canvas.width)/2))/10;
    dy -= (dy - ((event.mouse_position.y - canvas.height/2)/(canvas.height) * (background.height - canvas.height) - (background.height - canvas.height)/2))/10;
    context.drawImage(background,dx , dy);
    context.drawImage(title,400 - title.width/2,100);
    
    int ypos = 350;
    final int buttonWidth = 240;
    final int buttonHeight = 50;
    
    int i = 0;
    html.document.body.style.cursor = "default";
    
    
    
    if (credits){
      context.globalAlpha = anim[4];
      anim[4] = anim[4]<1?anim[4]+=.1:1;
      context.drawImage(creditsImage,200,250);
      if (event.mouseDown){
        credits = false;
        event.mouseDown = false;
      }
    }else{
      anim[4] = anim[4]>0?anim[4]-=.1:0;
    }
    
    context.globalAlpha = 1 - anim[4];
    
    ["Play","Dev Mode","Long Night","Credits"].forEach((String s){
      context.save();
      
      context.fillStyle = "#000";
      
      if ((event.mouse_position.x - canvas.width/2).abs() < buttonWidth/2 && (event.mouse_position.y - ypos).abs() < buttonHeight/2){
        anim[i] = anim[i]<1?anim[i]+=.1:1;
        if (event.mouseDown){
          switch(s){
            case "Credits":
              credits = true;
              event.mouseDown = false;
              break;
            case "Play":
              active = false;
              fin = ()=>startGame();
              break;
            case "Dev Mode":
              active = false;
              fin = (){
                DEBUG = true;
                startGame();
                world.intro = false;
              };
              break;
            case "Long Night":
              active = false;
              int count = 1;
              fin = (){
                startGame();
                world.intro = false;
                world.dayLength = 60 * 60 * 120;//2 hour nights
                world.time = 21;
                var interval;
                interval = html.window.setInterval((){
                  if (count % 120 == 0){
                    world.dayCount ++;
                    world.increaseDifficulty();
                    notify("Difficulty Increased (Night ${world.dayCount})");
                    if (game == null || world.paused){
                      html.window.clearInterval(interval);
                    }
                  }
                  count++;
                }, 500);
              };
              break;
          }
        }else{
          html.document.body.style.cursor = "pointer";
        }
      }else{
        anim[i] = anim[i]>0?anim[i]-=.1:0;
      }
      
      context.globalAlpha *= .5 + anim[i]/2;
      
      num bw = buttonWidth + anim[i] * 20;
      num bh = buttonHeight + anim[i] * 10;
      
      context.fillRect(canvas.width/2 - bw/2, ypos - bh/2, bw, bh);
      
      context.globalAlpha /= .5 + anim[i]/2;
      
      context.fillStyle = "white";
      context.font = "24px Arial";
      context.textAlign = "center";
      
      context.fillText(s, canvas.width/2, ypos-buttonHeight/2 + 32);
      
      ypos += buttonHeight + 10;
      
      context.restore();
      i++;
    });
    context.restore();
  }
}
