class MenuInterface {
  String type;
  Map<String,Dynamic> data;
  Function renderFunction;
  List<MenuButton> buttons;
  MenuInterface(this.type,this.data){
    buttons = new List<MenuButton>();
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
    renderFunction(c);
    c.restore();
  }
  void renderOptionsMenu(html.CanvasRenderingContext2D c){
    buttons.forEach((MenuButton button) => button.render(c));
  }
}
