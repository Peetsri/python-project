
from ast import List
import datetime
from typing import Annotated
from fastapi import Depends, FastAPI, HTTPException 
from sqlalchemy.orm import Session
import uvicorn
from fastapi import FastAPI,Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import Optional
import models,schema
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String
from datetime import date
from typing import Union
from fastapi import FastAPI, UploadFile, File
from service.convertskel import read_image, read_image1
from fastapi.responses import FileResponse
import io
import base64
from starlette.responses import StreamingResponse
from typing import Optional
from sqlalchemy import func, desc, DateTime




import models,schema,crud
from database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

# load_dotenv('.env')

app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "localhost:3000"
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
    "http://localhost:8001"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# GET Query Data

@app.get("/")
async def root():
    return {"message": "hello world"}

@app.get('/userlist',response_model=list[schema.User])  ## in used
async def userList(db:Session=Depends(get_db)):
    data = crud.get_userList(db)
    return data

@app.get("/user/{id}", response_model=schema.User)  ## in used
def user(id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db,id=id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_user

@app.get('/orderlist',response_model=list[schema.DataOrder])  ## in used
async def orderList(db:Session=Depends(get_db)):
    data = crud.get_orderList(db)
    return data

@app.get("/orderlist/{id}", response_model=schema.DataOrder)  ## in used
def order(id: int, db: Session = Depends(get_db)):
    db_order = crud.get_order(db,id=id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_order

@app.get('/product',response_model=list[schema.Product])  ## in used
async def productAll(db:Session=Depends(get_db)):
    data = crud.get_product_all(db)
    return data

@app.get("/product/{id}", response_model=schema.Product)  ## in used
def product(id: int, db: Session = Depends(get_db)):
    db_product = crud.get_product(db,id=id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_product


@app.get('/item',response_model=list[schema.Item])  ## in used
async def itemAll(db:Session=Depends(get_db)):
    data = crud.get_item_all(db)
    return data

@app.get("/item/{id}", response_model=schema.Item)  ## in used
def item(id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db,id=id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_item


@app.get('/product-item',response_model=list[schema.ProductItem])  ## in used
async def productitemAll(db:Session=Depends(get_db)):
    data = crud.get_product_item_all(db)
    return data


# @app.get('/orderdetail',response_model=list[schema.OrderDetail])
# async def orderDetail(db:Session=Depends(get_db)):
#     data = crud.get_orderDetail(db)
#     return data



##### POST  Data #####
@app.post("/product-item/add", response_model=schema.ProductItem)
def create_product_item(item:schema.ProductItem,db: Session = Depends(get_db)):
    db_item = crud.add_product_item(db,item)
    return db_item

@app.post("/item/add", response_model=schema.Item)
def create_item(item:schema.Item,db: Session = Depends(get_db)):
    db_item = crud.add_item(db,item)
    return db_item

@app.post("/product/add", response_model=schema.Product)
def create_product(product:schema.Product,db: Session = Depends(get_db)):
    db_product = crud.add_product(db,product)
    return db_product

@app.post("/order/add", response_model=schema.DataOrder)
def create_order(order:schema.DataOrder,db: Session = Depends(get_db)):
    db_order = crud.add_order(db,order)
    return db_order

@app.post("/order/update-pic", response_model=schema.UpdateOrderPic)
def update_order_pic(order:schema.DataOrder,db: Session = Depends(get_db)):
    db_order = crud.update_order_pic(db,order)
    return db_order

@app.put("/order/{id}/picture", response_model=schema.UpdateOrderPic)
def update_order_pic(
    id: int, picture:schema.UpdateOrderPic, db: Session = Depends(get_db)
):
    return crud.update_order_pic(db=db,picture_original= picture.picture_original,picture_name=picture.picture_name,id=id)


class Base(BaseModel):
    amount_char : int
    amount_icon : int 


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/order/update-pic-led", response_model=schema.UpdateOrderPicLed)
def update_order_pic_led(order:schema.DataOrder,db: Session = Depends(get_db)):
    db_order = crud.update_order_picled(db,order)
    return db_order


# create a SQLAlchemy engine

engine = create_engine('postgresql://postgres:postgrespw@localhost:32768/postgres')
Session = sessionmaker(bind=engine)

######### Order ###########

# @app.get("/order_list/", response_model= list[schema.DataOrderList])
# def order_list(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     orders = db.query(models.DataOrder).join(models.MasterStatus).join(models.Customer).join(models.MasterDelivery).offset(skip).limit(limit).all()
#     return [{"name": order.id, "surname": user.surname, "email": user.email, "role_name": user.role.name} for order in orders]

@app.post('/create_order')
async def create_order( file: Union[UploadFile, None] = None,delivery_id: str = Form(...),
                      product_id: str = Form(...), amount_char: str = Form(...),
                      amount_icon: str = Form(...),amount: str = Form(...),totalprice: str = Form(...),cus_id: str = Form(...),picture_led: str = Form(...)):
    # create a new User object
   #content = await base64.b64encode(file.read())
    # encoded_string = content


    content = await file.read()
    encoded_string = base64.b64encode(content).decode('utf-8')
    img_original = "data:image/png;base64,"+encoded_string
    
    order = models.DataOrder(totalprice = totalprice ,date_start="2023-04-24", 
                            date_pickup="2023-04-24",status_id='1',cus_id=cus_id,
                            amount=amount,delivery_id=delivery_id,payment = 'false',
                            totalcost='0.0',product_id=product_id,
                            amount_char=amount_char,
                            amount_icon=amount_icon,handle='false',
                            picture_original=img_original,picture_led= picture_led,
                            picture_name='picture_name',totalmanday = '0.0')

    # add the user to the database
    session = Session()
    session.add(order)
    session.commit()

    # return a success message
    return {'message': 'Order created successfully'}


@app.put('/update_order/{order_id}')
async def update_order(order_id: int,status_id: str = Form(...)):
    # get the customer from the database
    session = Session()
    order = session.query(models.DataOrder).filter(models.DataOrder.id == order_id).first()
    # update the order with the new data
    order.status_id = status_id,
    # commit the changes to the database
    session.commit()
    # return a success message
    return {'message': 'Order updated successfully'}


@app.delete('/delete_order/{order_id}')
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(models.DataOrder).filter(models.DataOrder.id == order_id).first()
    if order is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(order)
    db.commit()
    return {"message": "Order deleted successfully"}

######### User ###########

# define a route to handle form submissions
@app.post('/create_user')
async def create_user(name: str = Form(...), surname: str = Form(...),
                      email: str = Form(...), tel: str = Form(...),
                      address: str = Form(...), username: str = Form(...),
                      password: str = Form(...), role_id: int = Form(...)):
    # create a new User object
    user = models.User (name=name, surname=surname, email=email, tel=tel, address=address, 
                username=username, password=password, role_id=role_id)

    # add the user to the database
    session = Session()
    session.add(user)
    session.commit()

    # return a success message
    return {'message': 'User created successfully'}

@app.post('/delete_user')
def delete_user(user_id: int, db: Session = Depends(get_db)):
    # Get the user to delete from the database
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        # If user doesn't exist, return an error message
        return {'message': 'User not found.'}

    # Delete the user from the database
    db.delete(user)
    db.commit()

    # Return a success message
    return {'message': f'User with ID {user_id} has been deleted.'}

@app.delete("/delete_user_test/")
def delete_user(user_id: int, db: Session = Depends(get_db)):
      
        user = db.query(models.User).filter(models.User.id == user_id).first()
        if not user:
        # If user doesn't exist, return an error message
            return {'message': 'User not found.'}
    # Delete the user from the database
        db.delete(user)
        db.commit()
        return {"message": "User deleted"}

@app.delete('/delete_user/{user_id}')
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}

######### Item ###########

@app.post('/create_item')
async def create_user(name: str = Form(...), amount: str = Form(...),
                      priceperitem: int = Form(...)):
    # create a new User object
    item = models.Item (name=name, amount=amount,priceperitem=priceperitem,booking=0)

    # add the user to the database
    session = Session()
    session.add(item)
    session.commit()

    # return a success message
    return {'message': 'Item created successfully'}

@app.delete('/delete_item/{item_id}')
def delete_user(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Item not found")
    db.delete(item)
    db.commit()
    return {"message": "Item deleted successfully"}

########## Customer #############

@app.post('/create_customer')
async def create_customer(name: str = Form(...),
                      email: str = Form(...), tel: str = Form(...),
                      address: str = Form(...)):
    # create a new customer object
    customer = models.Customer (name=name,email=email, tel=tel, address=address, )
    # add the customer to the database
    session = Session()
    session.add(customer)
    session.commit()
    # return a success message
    return {'id': customer.id, 'message': 'Customer created successfully'}


######### Caculate Date ###########

@app.get("/orderlist/pickup/{date}", response_model=list[schema.DataOrder])
def order_by_date(date: str , db: Session = Depends(get_db)):
    db_orders = db.query(models.DataOrder).filter(models.DataOrder.date_start >= date).all()
    if not db_orders:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_orders

@app.get("/max_date/{table}/{column}")
async def get_max_date(table: str, column: str, db: Session = Depends(get_db)):
    max_date = db.query(func.max(getattr([table], column))).scalar()
    return {"max_date": max_date}

@app.get("/orderlist/pickup1", response_model=list[schema.DataOrder])
def order_by_date(db: Session = Depends(get_db)):

    max_date = db.query(func.max(getattr(models[order], date_start))).scalar()
    db_orders = db.query(models.DataOrder).filter(models.DataOrder.date_start == models.DataOrder.date_start.Max).all()
    if not db_orders:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_orders


@app.get("/product-item/{product_id}", response_model=list[schema.ProductItem])  ## in used
def item(product_id: int, db: Session = Depends(get_db)):
    db_item = db.query(models.ProductItem).filter(models.ProductItem.product_id == product_id).all()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Data not found")
    return db_item

# class InnerObject(BaseModel):
#     foo: str

# class OuterObject(BaseModel):
#     bar: List[InnerObject]

#---------------------------------------------------------
class Base(BaseModel):
    led_output : bytes
    amount_led : int 

@app.post("/upload-file/")
async def create_upload_file(file: Union[UploadFile, None] = None):
    
    if not file:
        return {"message": "No upload file sent"}
    else:
        print(file.filename)
        print(file.content_type)
        content = await file.read()
        file.file.seek(0)
        bytes = read_image(file.file.read())
        encoded_string = base64.b64encode(bytes)
    
        return {"base64": encoded_string}
    

@app.post("/upload-file1/")
async def create_upload_file(file: Union[UploadFile, None] = None):
    if not file:
        return {"message": "No upload file sent"}
    else:
        print(file.filename)
        print(file.content_type)
        content = await file.read()
        file.file.seek(0)
        response = read_image1(file.file.read())
        return response

# @app.post("/upload-file1/",response_model=Base)
# async def create_upload_file(file: Union[UploadFile, None] = None):
    
#     if not file:
#         return {"message": "No upload file sent"}
#     else:
#         ##objects = []
#         print(file.filename)
#         print(file.content_type)
#         content = await file.read()
#         file.file.seek(0)
#        ## bytes = read_image(file.file.read())
#         response = read_image1(file.file.read())
#         print("Res",response)
#         ##encoded_string = base64.b64encode(response.bytes)
#         encoded_string = base64.b64encode(response.img)
#         led_total = response.count
#         ##response = Base (led_output=encoded_string,amount_led=total_led )

#         return response
    

# @app.post("/upload-file-original/")
# async def create_upload_file(file: Union[UploadFile, None] = None):
    
#     if not file:
#         return {"message": "No upload file sent"}
#     else:
#         print(file.filename)
#         print(file.content_type)
#         content = await file.read()
#         file.file.seek(0)
#         ##bytes = read_image(file.file.read())
#         encoded_string = base64.b64encode(file.file.read())
#         return {"base64": encoded_string}


    
# To run locally
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)