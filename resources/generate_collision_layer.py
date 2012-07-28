
import sys

import json

collision_filler = 65
collision_types = [128]

data = json.loads(open(sys.argv[1],'r').read())

collision_layer_index = [layer_index for layer_index in range(len(data["layers"])) if data["layers"][layer_index]["name"] == "collision"][0]

preserve = data["layers"][collision_layer_index]["data"][:300]
collision_types.extend(preserve)
print preserve

def rev(lst):
    lst.reverse()
    return lst
for i in xrange(len(data["layers"][collision_layer_index]["data"])):
    data["layers"][collision_layer_index]["data"][i] = 0
    layer_values = [data["layers"][layer_index]["data"][i] for layer_index in range(len(data["layers"])) if layer_index != collision_layer_index]
    
    for v in [v for v in layer_values if v != 0]:
        if v in collision_types:
            data["layers"][collision_layer_index]["data"][i] = collision_filler

data["layers"][collision_layer_index]["data"][:300] = preserve

open(sys.argv[1],'w').write(json.dumps(data))
