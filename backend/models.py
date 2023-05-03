from cgitb import text
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Float,Double
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

# Base  = declarative_base()
from database import Base

class Datatest(Base):
    __tablename__ = 'datatest'
    id  = Column(Integer, primary_key=True, index=True)
    name = Column(String)

class User(Base):
    __tablename__ = 'user'
    id  = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    surname = Column(String)
    email = Column(String)
    tel = Column(String)
    address = Column(String)
    username = Column(String)
    password = Column(String)
    role_id = Column(Integer)


class DataOrder(Base):
    __tablename__ = 'order'
    id  = Column(Integer, primary_key=True, index=True)
    totalprice = Column()
    date_start = Column(DateTime(timezone=True))
    date_pickup = Column(DateTime(timezone=True))
    status_id = Column(Integer,ForeignKey("master_status.id"))
    cus_id = Column(Integer)
    amount = Column(Integer)
    delivery_id = Column(Integer)
    payment = Column() 
    totalcost = Column()
    product_id = Column(Integer)
    amount_char = Column(Integer)
    amount_icon = Column(Integer)
    handle = Column()
    picture_original = Column(String)
    picture_led = Column(String)
    picture_name = Column(String)
    totalmanday = Column()

    ##id = relationship("MasterStatus", back_populates="order")



class Product(Base):
    __tablename__ = 'product'
    id = Column (Integer,primary_key=True,index=True)
    name = Column(String)
    price = Column()
    product_type_id=Column(Integer)
    description=Column(String)
    manday = Column(Integer)

class Item(Base):
    __tablename__ = 'item'
    id = Column (Integer,primary_key=True,index=True)
    name = Column(String)
    priceperitem = Column()
    amount = Column(Integer)
    booking = Column(Integer)

class ProductItem(Base):
    __tablename__ = 'product_item'
    id = Column (Integer,primary_key=True,index=True)
    product_id = Column(Integer)
    item_id = Column(Integer)
    amount_item = Column(Integer)

class MasterStatus(Base):
    __tablename__ = 'master_status'
    id  = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)

    ##order = relationship("DataOrder", back_populates="id")

class MasterDelivery(Base):
    __tablename__ = 'master_delivery'
    id  = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)


class Customer(Base):
    __tablename__ = 'customer'
    id  = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    address = Column(String)
    tel = Column(String)



   
# class ProductMaster(Base):
#     __tablename__ = 'product'
#     id  = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
#     product_type_id = (Integer, ForeignKey('product_type.id'))
#     product_type_name = (String,ForeignKey('product_type.name'))

#     product_type = relationship('ProductTypeMaster')

# class ProductTypeMaster(Base):
#     __tablename__ = 'master_product_type'
#     id  = Column(Integer, primary_key=True, index=True)
#     name = Column(String)
    

# class Author(Base):
#     __tablename__ = 'author'
#     id = Column(Integer, primary_key=True)
#     name = Column(String)
#     age = Column(Integer)
#     time_created = Column(DateTime(timezone=True), server_default=func.now())
#     time_updated = Column(DateTime(timezone=True), onupdate=func.now())

# class Book(Base):
#     __tablename__ = 'book'
#     id  = Column(Integer, primary_key=True, index=True)
#     title = Column(String)
#     rating = Column(Float)
#     time_created = Column(DateTime(timezone=True), server_default=func.now())
#     time_updated = Column(DateTime(timezone=True), onupdate=func.now())
#     author_id = Column(Integer, ForeignKey('author.id'))

#     author = relationship('Author')


# class Author(Base):
#     __tablename__ = 'author'
#     id = Column(Integer, primary_key=True)
#     name = Column(String)
#     age = Column(Integer)
#     time_created = Column(DateTime(timezone=True), server_default=func.now())
#     time_updated = Column(DateTime(timezone=True), onupdate=func.now())
