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
function BlankAnimation(){
    return {
            "head":new Image(),
            "feet":new Image(),
            "belt":new Image(),
            "legs":new Image(),
            "torso":new Image(),
            "body":new Image(),
            "hands":new Image()
        };
}

var setSource,createImage;

var source = {
        "head":-1,
        "legs":-1,
        "feet":-1,
        "body":-1,
        "torso":-1,
        "belt":-1,
        "hands":-1
    };

window.onload = function(){
    var animations = {
        "walkcycle":BlankAnimation(),
        "hurt":BlankAnimation(),
        "bow":BlankAnimation(),
        "slash":BlankAnimation(),
        "spellcast":BlankAnimation(),
        "thrust":BlankAnimation()
    };
    
    
    var sources = {
        "head":["HEAD_hair_blonde","HEAD_chain_armor_helmet",
                "HEAD_chain_armor_hood","HEAD_leather_armor_hat",
                "HEAD_plate_armor_helmet","HEAD_robe_hood"],
        "legs":["LEGS_pants_greenish","LEGS_plate_armor_pants","LEGS_robe_skirt"],
        "feet":["FEET_plate_armor_shoes","FEET_shoes_brown"],
        "body":["BODY_male","BODY_skeleton"],
        "torso":["TORSO_chain_armor_jacket_purple","TORSO_leather_armor_bracers",
        "TORSO_leather_armor_shirt_white","TORSO_leather_armor_shoulders",
        "TORSO_leather_armor_torso","TORSO_plate_armor_torso","TORSO_robe_shirt_brown"],
        "belt":["BELT_leather","BELT_rope"],
        "hands":["HANDS_plate_armor_gloves"]
        
    };
    
    setSource = function(layer,no){
        for (var animationType in animations){
            var anim = animations[animationType];
            if (no == -1){
                anim[layer] = new Image();
            }else{
                anim[layer].src = "assets/johan/" + animationType + "/" + sources[layer][((no%sources[layer].length) + sources[layer].length)%sources[layer].length] + ".png";
            }
        }
        source[layer] = no;
    };
    
    createImage = function(){
        var data = {name:document.getElementById("name").value};
        for (var animationType in animations){
            canvas.width = animations[animationType].body.width;
            canvas.height = animations[animationType].body.height;
            context.clearRect(0,0,canvas.width,canvas.height);
            context.drawImage(animations[animationType].body,0,0);
            context.drawImage(animations[animationType].feet,0,0);
            context.drawImage(animations[animationType].legs,0,0);
            context.drawImage(animations[animationType].torso,0,0);
            context.drawImage(animations[animationType].belt,0,0);
            context.drawImage(animations[animationType].head,0,0);
            context.drawImage(animations[animationType].hands,0,0);
            data[animationType] = canvas.toDataURL();
        }
        
        
        $.post("/save",data);
        canvas.width = 384;
        canvas.height = 256;
    };
        
    var canvas = document.getElementById("canvas");
    canvas.width = 384;
    canvas.height = 256;
    var context = canvas.getContext("2d");
    
    setSource("body",0);
    
    var frm = 0;
    setInterval(function(){
        context.fillStyle = "#ccc;"
        context.fillRect(0,0,canvas.width,canvas.height);
        frm += 64;
        var displacement = 0;
        for (var animationType in animations){
            var frame = frm % (animations[animationType].body.width);
            var fh = animations[animationType].body.height;
            context.drawImage(animations[animationType].body,frame,0,64,fh,displacement,0,64,fh);
            context.drawImage(animations[animationType].feet,frame,0,64,fh,displacement,0,64,fh);
            context.drawImage(animations[animationType].legs,frame,0,64,fh,displacement,0,64,fh);
            context.drawImage(animations[animationType].torso,frame,0,64,fh,displacement,0,64,fh);
            context.drawImage(animations[animationType].belt,frame,0,64,fh,displacement,0,64,fh);
            context.drawImage(animations[animationType].head,frame,0,64,fh,displacement,0,64,fh);
            context.drawImage(animations[animationType].hands,frame,0,64,fh,displacement,0,64,fh);
            displacement += 64;
        }
    },1000/10);
}
