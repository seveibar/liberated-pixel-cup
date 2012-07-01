class Camera extends Vec2{
  num tweenSpeed = 10.0;
  num _targetZoom;
  num _actualZoom;
  Camera([num x = 0.0,num y = 0.0,num zoom = 1]){
    this.x = x;
    this.y = y;
    _targetZoom = _actualZoom = zoom;
  }
  set zoom(value){
    _targetZoom = value;
  }
  get zoom() => _targetZoom;
  get animatedZoom() => _actualZoom;
  void update(){
    _actualZoom -= (_actualZoom - _targetZoom)/tweenSpeed;
  }
}
