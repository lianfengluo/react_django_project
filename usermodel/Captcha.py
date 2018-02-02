#-*- coding=utf-8 -*-
import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter
from entry_file import settings
_letter_cases = "abcdefghjkmnpqrstuvwxy"
_upper_cases = _letter_cases.upper()
_numbers = ''.join(map(str, range(3, 10)))
init_chars = ''.join((_letter_cases, _upper_cases, _numbers))



def CreatePPCaptcha(size=(180, 50),
                         chars=init_chars,
                         img_type="JPG",
                         mode="RGB",
                         # bg_color=(255, 255, 255),
                         font_size=(28, 40),
                         font_type=None,
                         length=4,
                         draw_lines=True,
                         n_line=(4, 8),
                         draw_points=False,
                         point_chance=2):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    size=(180,40)
    fonts=[settings.BASE_DIR+r'\systemfonts\ALGER.TTF',BASE_DIR+r'\systemfonts\AGENCYR.TTF',settings.BASE_DIR+r'\systemfonts\ANTQUABI.TTF',settings.BASE_DIR+r'\systemfonts\ANTQUAI.TTF',settings.BASE_DIR+r'\systemfonts\ARIALBD.TTF',settings.BASE_DIR+r'\systemfonts\ARIALNB.TTF',settings.BASE_DIR+r'\systemfonts\ARIALNI.TTF',settings.BASE_DIR+r'\systemfonts\ARIBLK.TTF',settings.BASE_DIR+r'\systemfonts\ARLRDBD.TTF',settings.BASE_DIR+r'\systemfonts\BAUHS93.TTF',settings.BASE_DIR+r'\systemfonts\BELL.TTF',settings.BASE_DIR+r'\systemfonts\BELLI.TTF',settings.BASE_DIR+r'\systemfonts\BERNHC.TTF',
    settings.BASE_DIR+r'\systemfonts\BKANT.TTF',settings.BASE_DIR+r'\systemfonts\BOD_CR.TTF',settings.BASE_DIR+r'\systemfonts\BRADHITC.TTF',settings.BASE_DIR+r'\systemfonts\BROADW.TTF',settings.BASE_DIR+r'\systemfonts\BRUSHSCI.TTF',settings.BASE_DIR+r'\systemfonts\CASTELAR.TTF',settings.BASE_DIR+r'\systemfonts\CHILLER.TTF',settings.BASE_DIR+r'\systemfonts\COLONNA.TTF',settings.BASE_DIR+r'\systemfonts\COPRGTL.TTF']
    # fonts=[BASE_DIR+r'\systemfonts\ALGER.TTF',BASE_DIR+r'\systemfonts\AGENCYR.TTF',BASE_DIR+r'\systemfonts\ANTQUABI.TTF',BASE_DIR+r'\systemfonts\ANTQUAI.TTF',BASE_DIR+r'\systemfonts\ARIALBD.TTF',BASE_DIR+r'\systemfonts\ARIALNB.TTF',BASE_DIR+r'\systemfonts\ARIALNI.TTF',BASE_DIR+r'\systemfonts\ARIBLK.TTF',BASE_DIR+r'\systemfonts\ARLRDBD.TTF',BASE_DIR+r'\systemfonts\BAUHS93.TTF',BASE_DIR+r'\systemfonts\BELL.TTF',BASE_DIR+r'\systemfonts\BELLI.TTF',BASE_DIR+r'\systemfonts\BERNHC.TTF',
    # BASE_DIR+r'\systemfonts\BKANT.TTF',BASE_DIR+r'\systemfonts\BOD_CR.TTF',BASE_DIR+r'\systemfonts\BRADHITC.TTF',BASE_DIR+r'\systemfonts\BROADW.TTF',BASE_DIR+r'\systemfonts\BRUSHSCI.TTF',BASE_DIR+r'\systemfonts\CASTELAR.TTF',BASE_DIR+r'\systemfonts\CHILLER.TTF',BASE_DIR+r'\systemfonts\COLONNA.TTF',BASE_DIR+r'\systemfonts\COPRGTL.TTF']
    # font_type=BASE_DIR+r'\systemfonts\ELEPHNTI.TTF'
    font_type=random.choice(fonts)
    # bg_color=(random.randint(157,255), random.randint(157,255), random.randint(157,255))
    bg_color=(255, 250, random.randint(200,255))


    width, height = size
    img = Image.new(mode, size, bg_color)
    draw = ImageDraw.Draw(img)

    def get_chars():
        return random.sample(chars, length)

    def create_lines():
        line_num = random.randint(*n_line) 
        for i in range(line_num):
            begin = (random.randint(0, size[0]), random.randint(0, size[1]))

            end = (random.randint(2, size[0]), random.randint(2, size[1]))
            # draw.line([begin, end], fill=(random.randint(0,156),random.randint(0,156),random.randint(0,156)), width=random.randint(2,4))
            draw.line([begin, end], fill=(random.randint(50,156),random.randint(100,156),random.randint(100,156)), width=random.randint(3,4))

    def create_points():
        for w in range(width):
            for h in range(height):
                tmp = random.randint(95, 97)
                if tmp < point_chance:
                  font = ImageFont.truetype(font_type, 25)
                  draw.text((w, h), "*", font=font, fill=(random.randint(180,200),random.randint(200,220),random.randint(180,200)))

    def create_strs():
        c_chars = get_chars()
        for i in range(length):
            font = ImageFont.truetype(font_type, random.randint(*font_size))
            c = c_chars[i]
            draw.text((random.randint(30,50)*i,5), c,
                      font=font, fill=(random.randint(50,156),random.randint(100,156),random.randint(100,156)))

        return ''.join(c_chars)

    if draw_points:
        create_points()

    if draw_lines:
        create_lines()

    strs = create_strs()
    return img, strs


if __name__ == "__main__":
    code_img = CreatePPCaptcha()
    # print code_img[1]
    code_img[0].save("mycode.jpg", "JPEG")
