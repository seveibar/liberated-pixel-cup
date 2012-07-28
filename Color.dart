class Color {
  int _r,_g,_b;
  void set r(int x){
    _r = (x > 255) ? 255 : (x < 0) ? 0 : x;
  }
  int get r() => _r;
  void set g(int x){
    _g = (x > 255) ? 255 : (x < 0) ? 0 : x;
  }
  int get g() => _g;
  void set b(int x){
    _b = (x > 255) ? 255 : (x < 0) ? 0 : x;
  }
  int get b() => _b;
  Color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
  }
  Color.fromString(String s){
    List ar = s.splitChars();
    if (s.length == 4){
      r = Math.parseInt("0x${ar[1]}");
      r = (r<<4) + r;
      g = Math.parseInt("0x${ar[2]}");
      g = (g<<4) + g;
      b = Math.parseInt("0x${ar[3]}");
      b = (b<<4) + b;
    }else if (s.length == 7){
      r = Math.parseInt("0x${ar[1]}${ar[2]}");
      g = Math.parseInt("0x${ar[3]}${ar[4]}");
      b = Math.parseInt("0x${ar[5]}${ar[6]}");
    }
  }
  String toString(){
    String s = ((r<<16) | (g<<8) | (b)).toRadixString(16);
    while(s.length<6){
      s = "0$s";
    }
    return "#$s";
  }
  Color multiply(num x){
    r =  (r * x).toInt();
    g =  (g * x).toInt();
    b =  (b * x).toInt();
    return this;
  }
  Color divide(num x){
    r =  (r / x).toInt();
    g =  (g / x).toInt();
    b =  (b / x).toInt();
    return this;
  }
  Color subtract(int x){
    r -= x;
    g -= x;
    b -= x;
    return this;
  }
  void blend(Color color,[num w = .5]){
    r = (r * (1 - w) + color.r * w).toInt();
    g = (g * (1 - w) + color.g * w).toInt();
    b = (b * (1 - w) + color.b * w).toInt();
  }
  Color clone(){
    return new Color(r,g,b);
  }
}
