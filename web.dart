part of BigIsland;
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

class web {
  static load(String url,callback){
    html.HttpRequest req = new html.HttpRequest();
    req.open("GET",url);
    req.setRequestHeader("Content-type","text/plain");
    req.onReadyStateChange.listen((e){
      if (req.readyState == html.HttpRequest.DONE && req.status == 200){
        callback(req.responseText);
      }
    });
    req.send();
  }
}
