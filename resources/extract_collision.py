# Big Island video game source code file
# Copyright (C) 2012  Severin Ibarluzea
# 
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
# 
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
# 
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
import json
import sys

#Map name is first argument

data = json.loads(open(sys.argv[1],'r').read())

string = ""
trace = ""
check = ""

def is_collision(tile_data):
    if (tile_data == 0):
        return 0
    else:
        return 1

for layer in data["layers"]:
    if layer["name"] == "collision":
        for i in range(len(layer["data"])/4):
            b =         is_collision(layer["data"][i*4+0])
            b = b * 2 + is_collision(layer["data"][i*4+1])
            b = b * 2 + is_collision(layer["data"][i*4+2])
            b = b * 2 + is_collision(layer["data"][i*4+3])
            string += hex(b)[2:]
        for i in range(len(layer["data"])):
            if i%200 == 0:
                trace += "\n"
            trace += is_collision(layer["data"][i]) and "@" or " "

for cir in range(len(string) * 4):
    ci = int(cir/4)
    bseqi = cir % 4
    a = bin(int(string[ci],16))[2:]
    a = (4 - len(a)) * '0' + a
    if cir%200==0:
        check += "\n"
    if (a[bseqi] == "1"):
        check += "@"
    else:
        check += " "
    

open("collision.txt",'w').write(string);
