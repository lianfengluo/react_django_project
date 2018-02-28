# coding=utf-8
import smtplib
from email.mime.text import MIMEText
from email.header import Header
import random

_letter_cases = "abcdefghjkmnpqrstuvwxy"
_upper_cases = _letter_cases.upper()
_numbers = ''.join(map(str, range(3, 10)))
init_chars = ''.join((_letter_cases, _upper_cases, _numbers))


def send_mail_server(send_to):
	_user = "1014646056@qq.com"
	_pwd  = "lvboncpdeawvbajc"
	_to   = send_to

	length = 6
	verify_sample = random.sample(init_chars, length)
	verify_code = ''.join(verify_sample)

	subject = 'Your Email verification code!'

	msg = MIMEText('''<p>Your verification code is:%s</p><br/><br/><br/>
<p style='font-weight:bold'>from:Lianfeng's Website</p>
		'''%verify_code, 'html', 'utf-8')
	msg["Subject"] = Header(subject, 'utf-8')
	msg["From"]    = _user
	msg["To"]      = _to

	try:
	    s = smtplib.SMTP_SSL("smtp.qq.com", 465)
	    s.login(_user, _pwd)
	    s.sendmail(_user, _to, msg.as_string())
	    s.quit()
	    return verify_code
	except smtplib.SMTPException:
		raise("send mail failed")

# if __name__ == '__main__':
# 	send_mail_server("1014646056@qq.com")