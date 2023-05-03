
from skimage import img_as_bool
from skimage.morphology import skeletonize, binary_closing
from skimage.filters import threshold_otsu
import cv2
import numpy as np
from pydantic import BaseModel
from dataclasses import dataclass
import base64


@dataclass
class Response:
    base64: str
    ledCount: int


def get_binary(img):    
    thresh = threshold_otsu(img)
    binary = img < thresh
    return binary

def read_image(byteImg):
    # pil_img = Image.open(uploadImg)
    image_np = np.frombuffer(byteImg, np.uint8)
    origin = cv2.imdecode(image_np, cv2.IMREAD_UNCHANGED)
    print('Origin : ',origin)
    gray = cv2.cvtColor(origin, cv2.COLOR_BGR2GRAY)
    gray[gray > 0] = 255
    print('Gray : ', gray)
    (thresh, bwImage) = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)

    im = img_as_bool(bwImage)

    out = binary_closing(skeletonize(im))

    print(np.sum(out == True))

    out = out.astype(np.uint8)  # convert to an unsigned byte
    out *= 255
    # print(out)

    temp = out.copy()

    # Set LED to Skeleton
    color = (200, 0, 0)
    radius = 2
    print('Radius : ', radius)

    led = 0

    white_coords = np.column_stack(np.where(out == 255))
    print('White pixel count : ', len(white_coords))
    space = 5 + radius
    point_coords = np.column_stack(np.where(out == 200))
    real_led = []
    for coord in white_coords:
        # print('Point pixel count : ', len(point_coords))
        temp_co = cv2.circle(temp.copy(), (coord[1], coord[0]), space, color, 2)
        temp_coords = np.column_stack(np.where(temp_co == 200))
        # print('Temp pixel count : ',len(temp_coords))
        aset = set([tuple(x) for x in point_coords])
        bset = set([tuple(x) for x in temp_coords])
        duplicate = np.array([x for x in aset & bset])
        if len(duplicate) > 0:
            continue
        out = cv2.circle(out, (coord[1], coord[0]), space, color, 2)
        point_coords = np.concatenate((point_coords, temp_coords), 0)

        led = led + 1
        real_led.append(coord)

    print('LED count : ', led)

    # Write LED to origin img
    for coord in real_led:
        origin = cv2.circle(origin, (coord[1], coord[0]), radius, (200, 0, 0), -1)

    print('=' * 100)

    res, im_png = cv2.imencode(".png", origin)
    return im_png.tobytes()

# class ledModel(BaseModel):
#     img: bytes
#     count: int

class Person:
  def __init__(self,img,count):
    self.img = img
    self.count = count



def read_image1(byteImg):
    # pil_img = Image.open(uploadImg)
    image_np = np.frombuffer(byteImg, np.uint8)
    origin = cv2.imdecode(image_np, cv2.IMREAD_UNCHANGED)
    print('Origin : ',origin)
    gray = cv2.cvtColor(origin, cv2.COLOR_BGR2GRAY)
    gray[gray > 0] = 255
    print('Gray : ', gray)
    (thresh, bwImage) = cv2.threshold(gray, 100, 255, cv2.THRESH_BINARY)

    im = img_as_bool(bwImage)

    out = binary_closing(skeletonize(im))

    print(np.sum(out == True))

    out = out.astype(np.uint8)  # convert to an unsigned byte
    out *= 255
    # print(out)

    temp = out.copy()

    # Set LED to Skeleton
    color = (200, 0, 0)
    radius = 2
    print('Radius : ', radius)

    led = 0

    white_coords = np.column_stack(np.where(out == 255))
    print('White pixel count : ', len(white_coords))
    space = 5 + radius
    point_coords = np.column_stack(np.where(out == 200))
    real_led = []
    for coord in white_coords:
        # print('Point pixel count : ', len(point_coords))
        temp_co = cv2.circle(temp.copy(), (coord[1], coord[0]), space, color, 2)
        temp_coords = np.column_stack(np.where(temp_co == 200))
        # print('Temp pixel count : ',len(temp_coords))
        aset = set([tuple(x) for x in point_coords])
        bset = set([tuple(x) for x in temp_coords])
        duplicate = np.array([x for x in aset & bset])
        if len(duplicate) > 0:
            continue
        out = cv2.circle(out, (coord[1], coord[0]), space, color, 2)
        point_coords = np.concatenate((point_coords, temp_coords), 0)

        led = led + 1
        real_led.append(coord)

    print('LED count : ', led)

    # Write LED to origin img
    for coord in real_led:
        origin = cv2.circle(origin, (coord[1], coord[0]), radius, (200, 0, 0), -1)

    print('=' * 100)

   
    res, im_png = cv2.imencode(".png", origin)
    ##object = [im_png.tobytes(),led]
    # res, total_led = led
    
    encoded_string = base64.b64encode(im_png.tobytes())
    response = Response(base64=encoded_string, ledCount=led)
    # return im_png.tobytes()
    return response

    ##resp = {"img":im_png.tobytes(),"count_led"=total_led} 

