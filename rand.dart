class rand {
  static int integer(int seed,[int a = 0,int b = 0]){
    return ((seed*761)%31)
        + (((a-b)*897)%43) 
        + ((b*157)%170) 
        + ((a*a*71)%55)
        + (((b*b-a)*61)%24)
        + (((b*b*b-a*a)*459)%171)
        + (((a*a*a*a-b*b)*713)%1717);
  }
}
