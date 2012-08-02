# Splits map into small images
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

#Gotta have 'convert' AKA Image Magick

#loop through tiles
rm -r $2
mkdir $2
convert $1 -crop $3x$3 \
    -set filename:nam "$2/%[fx:page.x/$3]x%[fx:page.y/$3]" \
    "%[filename:nam].png"
