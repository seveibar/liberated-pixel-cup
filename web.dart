class web {
  static load(String url,callback){
    html.XMLHttpRequest req = new html.XMLHttpRequest();
    req.open("GET",url);
    req.setRequestHeader("Content-type","text/plain");
    req.on.readyStateChange.add((e){
      if (req.readyState == html.XMLHttpRequest.DONE && req.status == 200){
        callback(req.responseText);
      }
    });
    req.send();
  }
}
