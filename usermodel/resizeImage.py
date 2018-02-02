import shutil  
import os
from PIL import Image
def fixed_size(data, width = 200, height = 200):  
	img = Image.open(data)
	out = img.resize((width, height),Image.ANTIALIAS)  
	return out 

if __name__ == '__main__':
	# print f.width,f.height
	new_img = fixed_size('./test.png')
	new_img.save('./test2.png')
	print new_img
	print 'done'