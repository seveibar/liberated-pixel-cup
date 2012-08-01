import os
ar = []
for dir,subdir,files in os.walk("./"):
    for fi in files:
        if fi.split(".")[1] == "ogg":
            ar.append(fi.split('.')[0])
            print "<audio id='audio_"+fi.split('.')[0]+"' src='resources/sounds/"+fi+"'  style='display:none;'></audio>"
print ar
