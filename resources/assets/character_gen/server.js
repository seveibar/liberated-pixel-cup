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
var express = require('express');
var app = express.createServer();



function saveImage(name,data){
    fs = require('fs');
    var buf = new Buffer(data.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    fs.writeFile(name + '.png', buf);
}
app.use(express.bodyParser());
app.post("/save",function(req,res){
    var nam = req.param("name","blank");
    fs = require("fs");
    fs.mkdir("./generated/" + nam);
    saveImage("./generated/" + nam + "/walkcycle",req.param("walkcycle",""));
    saveImage("./generated/" + nam + "/hurt",req.param("hurt",""));
    saveImage("./generated/" + nam + "/bow",req.param("bow",""));
    saveImage("./generated/" + nam + "/slash",req.param("slash",""));
    saveImage("./generated/" + nam + "/spellcast",req.param("spellcast",""));
    saveImage("./generated/" + nam + "/thrust",req.param("thrust",""));
});
app.use(express.static(__dirname));
app.listen(3000);
