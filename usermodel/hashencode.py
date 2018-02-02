import hashlib
import random
import string

# make hash salt
def make_salt(length = 5):
    return ''.join(random.choice(string.ascii_letters) for x in range(length))

# hash the password
def make_pw_hash(name, pw,salt=None):
    if not salt:
        salt = make_salt()
    h = hashlib.sha256((name + pw + salt).encode('utf-8')).hexdigest()
    h = hashlib.sha256(h.encode('utf-8')).hexdigest()
    return '%s,%s' % (salt, h)

# valide the password
def valid_pw(name, password, h):
    salt = h.split(',')[0]
    return h == make_pw_hash(name, password, salt)