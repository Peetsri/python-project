# build a schema using pydantic

from cgitb import text
import datetime
from pydantic import BaseModel

# class Book(BaseModel):
#     title: str
#     rating: int
#     author_id: int

#     class Config:
#         orm_mode = True

# class Author(BaseModel):
#     name:str
#     age:int

#     class Config:
#         orm_mode = True

class Datatest(BaseModel):
    id:int
    name:str

    class Config:
        orm_mode = True

class UserCreate(BaseModel):
    id:int
    name:str

    class Config:
        orm_mode = True

class DelUser(BaseModel):
    id:int
    name:str

    class Config:
        orm_mode = True

class UpdateOrderPic(BaseModel):
    id:int
    picture_original:str | None = ""
    picture_name:str | None = ""
    class Config:
        orm_mode = True

class UpdatePic(BaseModel):
    pass

class UpdateOrderPicLed(BaseModel):
    picture_led:str | None = ""
    class Config:
        orm_mode = True

class User(BaseModel):
    id :int
    name:str | None = ""
    surname:str | None = ""
    email: str | None = ""
    tel:str | None = ""
    address:str | None = ""
    username :str | None = ""
    password: str | None = ""
    role_id:int
  
    class Config:
        orm_mode = True


class DataLED(BaseModel):

    totalled:int

    class Config:
        orm_mode = True


class DataOrderList(BaseModel):
    id:int
    totalprice:float
    date_start:datetime.date
    date_pickup:datetime.date
    status:str 
    cus:str 
    amount:int
    delivery: str
    totalcost:float
    product:str
    totalmanday:float

    class Config:
        orm_mode = True


class DataOrder(BaseModel):
    id:int
    totalprice:float
    date_start:datetime.date
    date_pickup:datetime.date
    status_id:int 
    cus_id:int 
    payment:bool | None = True
    amount:int
    delivery_id: int
    totalcost:float
    product_id:int
    amount_char:int
    amount_icon:int
    handle:bool | None = True
    picture_original:str | None = ""
    picture_led:str | None = ""
    picture_name:str | None = ""
    totalmanday:float

    class Config:
        orm_mode = True

class Product(BaseModel):
    id:int
    name:str | None = ""
    price:float
    product_type_id:int
    description:str | None = ""
    manday:int

    class Config:
        orm_mode = True

class Item(BaseModel):
    id:int
    name:str | None = ""
    priceperitem:float
    amount:int
    booking:int

    class Config:
        orm_mode = True

class ProductItem(BaseModel):
    id:int
    product_id:int
    item_id:int
    amount_item:int
    
    class Config:
        orm_mode = True

# class OrderDetail(BaseModel):
#     id:int
#     totalprice:float
#     date_start:datetime.date
#     date_pickup:datetime.date
#     status_id:int
#     cus_id:int
#     payment:bool | None = True
#     amount:int
#     delivery_id: int
#     itemprice:float
#     product_id:int
#     amount_char:int
#     amount_icon:int
#     handle:bool | None = True
#     picture_original:str
#     picture_led:str


#     class Config:
#         orm_mode = True

class ProductMaster(BaseModel):
    id:int
    name:str
    product_type_id:int
    product_type_name:str

    class Config:
        orm_mode = True

class ProductTypeMaster(BaseModel):
    id:int
    name:str

    class Config:
        orm_mode = True