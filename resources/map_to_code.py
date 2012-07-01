import json
import sys

fi = open(sys.argv[1],'r')
con = fi.read()
fi.close()

tile_width = int(sys.argv[2].split("x")[0])
tile_height = int(sys.argv[2].split("x")[1])

j = json.loads(con)

layers = j["layers"]
a_width = j["width"]
a_height = j["height"]

bits = 4

def toCode(data,sx=0,sy=0,szx=a_width,szy=a_height):
    #trim data to desired region
    ndata = []
    for y in range(sy,sy+szy):
        for x in range(sx,sx+szx):
            ndata.append(data[y*a_width+x])
    
    bar = [i!=0 for i in ndata]
    far = ""
    for i in range(0,len(bar),bits):
        x = 0
        for q in range(bits):
            x*=2
            if (len(bar) > i+q):
                x += bar[i+q]
        far += hex(x)[2:]
    return far
def toMap(map_string,w,h):
    bar = []
    for i in map_string:
        dec = int(i,16)
        tar = []
        tar.append(dec%2)
        dec/=2
        tar.append(dec%2)
        dec/=2
        tar.append(dec%2)
        dec/=2
        tar.append(dec%2)
        dec/=2
        tar.reverse()
        bar.extend(tar)
    string = ""
    for x in range(w):
        for y in range(h):
            string += str(bar[x*h+y])
        string += "\n"
    return string
def toMap2(map_string,w,h):
    return toMap(map_string,w,h).replace("0"," ").replace("1","0")
layer = layers[int(raw_input("Which Layer?\n" + "\n".join([str(l) + " : " + layers[l]["name"] for l in range(len(layers))]) + "\n-> "))]

map_tiles_x = a_width/tile_width
map_tiles_y = a_height/tile_height

patches = []
for xi in range(map_tiles_x):
    for yi in range(map_tiles_y):
        if (len(sys.argv)>3 and sys.argv[3] == "-vv"):
            print toMap2(toCode(layer["data"],xi*tile_width,yi * tile_height,tile_width,tile_height),tile_width,tile_height)
        patches.append((layer["name"],xi,yi,toCode(layer["data"],xi*tile_width,yi * tile_height,tile_width,tile_height)))

#Make JSON
js = {
    "patch_size":tile_width
}
ar = []
for patch in patches:
    jn = {}#also json
    jn["type"] = patch[0]
    jn["x"] = patch[1]
    jn["y"] = patch[2]
    jn["data"] = patch[3]
    ar.append(jn)
js["patches"] = ar
print json.dumps(js,indent=4)

if len(sys.argv) > 3 and (sys.argv[3] == "-v" or sys.argv[3] == "-vv"):
    print toMap2(toCode(layer["data"],0,0,a_width,a_height),a_width,a_height)
