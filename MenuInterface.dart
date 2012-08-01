class MenuInterface {
  String type;
  Map<String,Dynamic> data;
  Function renderFunction;
  List<MenuButton> buttons;
  num ax;
  MenuInterface(this.type,this.data){
    buttons = new List<MenuButton>();
    ax = -SCREEN_WIDTH;
    switch(type){
      case "options":
        renderFunction = renderOptionsMenu;
        List<Map> options = data["options"];
        for (int i = 0;i<options.length;i++){
          String name = options[i]["name"];
          Function func = options[i]["func"];
          
          buttons.add(new MenuButton(name,func,SCREEN_WIDTH/8,SCREEN_HEIGHT/8 + i * 40));
        }
        buttons.add(new MenuButton("Exit",(){},SCREEN_WIDTH/8,SCREEN_HEIGHT/8 + options.length * 40));
        break;
      case "confirm":
        renderFunction = renderConfirmMenu;
        num cx = SCREEN_WIDTH/2;
        num cy = SCREEN_HEIGHT/2;
        buttons.add(new MenuButton("Cancel",(){},cx - 200,cy + 200));
        buttons.add(new MenuButton("Confirm",data["func"],cx + 200,cy + 200));
        break;
      case "broke":
        renderFunction = renderConfirmMenu;
        num cx = SCREEN_WIDTH/2;
        num cy = SCREEN_HEIGHT/2;
        buttons.add(new MenuButton("Cancel",(){},cx - 200,cy + 200));
        buttons.add(new MenuButton("Not Enough Coin",(){},cx + 200,cy + 200));
        break;
    }
  }
  bool clickAt(num x,num y){
    bool returner = false;
    buttons.some((MenuButton button){
      if (button.clickAt(x,y)){
        returner = true;
        button.action();
        return true;
      }
      return false;
    });
    return returner;
  }
  void render(html.CanvasRenderingContext2D c){
    c.save();
    c.translate(ax,0);
    ax /= 1.5;
    renderFunction(c);
    c.restore();
  }
  void renderOptionsMenu(html.CanvasRenderingContext2D c){
    buttons.forEach((MenuButton button) => button.render(c));
  }
  void renderConfirmMenu(html.CanvasRenderingContext2D c){
    num cx = SCREEN_WIDTH/2;
    num cy = SCREEN_HEIGHT/2;
    List<html.ImageElement> ui = world.uiImages;
    var pattern = c.createPattern(ui[16], "repeat");
    c.beginPath();
    c.fillStyle = pattern;
    c.rect(cx-300+32+10, cy-300+32, 600-84, 600-88);
    c.fill();
    c.closePath();
    c.drawImage(ui[8],cx-300+12, cy-300);
    for (int i = 0;i<16;i++){
      c.drawImage(ui[9],cx-300+12 + 32 + i * 32, cy-300);
      c.drawImage(ui[15],cx-300+12, cy-300 + 32 + i * 32);
      c.drawImage(ui[17],cx+300-12-32, cy-300+ 32 + i * 32);
      c.drawImage(ui[23],cx-300+12 + 32 + i * 32,cy+300-64);
      /*for (int u = 0;u<16;u++){
        c.drawImage(ui[16],cx-300+12 + 32 + i * 32, cy-300 + 32 + u * 32);
      }*/
    }
    c.drawImage(ui[10],cx+300-32-12, cy-300);
    c.drawImage(ui[22], cx-300+12, cy+300-64);
    c.drawImage(ui[24], cx+300-32-12, cy+300-64);
    
    //Draw Text
    c.font = "18px Arial";
    c.fillStyle = "#ab7d10";
    c.textAlign = "center";
    c.fillText(data["text"], cx, cy);
    
    buttons.forEach((MenuButton button) => button.render(c));
  }
}
