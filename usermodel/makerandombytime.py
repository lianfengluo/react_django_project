# coding=utf-8
import time
import random
import string
import hashlib
import sys
reload(sys)  
sys.setdefaultencoding('utf8')   

def make_random(img_name):
	salt = str(img_name)
	salt = salt.join(random.sample(string.ascii_letters + string.digits, 8))
	_hash = hashlib.md5()
	_hash.update(salt)
	random_val = _hash.hexdigest()+str(time.time()).split('.')[0]
	# print random_val
	return random_val

# if __name__ == '__main__':
# 	make_random('test')