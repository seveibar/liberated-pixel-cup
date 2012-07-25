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
