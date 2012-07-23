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
