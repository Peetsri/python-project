from sqlalchemy.orm import Session

# from . import models,schema
import models,schema

def get_test(db: Session):
    return db.query(models.Datatest).all()

##User

def get_userList(db: Session):
    return db.query(models.User).all()

def get_user(db: Session,id: int):
    return db.query(models.User).filter(models.User.id == id).first()

##Order 

# def get_orderList(db: Session):
#     return db.query(models.DataOrder).all()

def get_orderList(db: Session):
    return db.query(models.DataOrder).order_by(models.DataOrder.id.asc()).all()


def get_order(db: Session,id: int):
    return db.query(models.DataOrder).filter(models.DataOrder.id == id).first()

def get_product(db: Session,id: int):
    return db.query(models.Product).filter(models.Product.id == id).first()

def get_product_all(db: Session):
    return db.query(models.Product).all()

def get_item_all(db: Session):
    return db.query(models.Item).all()

def get_item(db: Session,id: int):
    return db.query(models.Item).filter(models.Item.id == id).first()


def get_product_item_all(db: Session):
    return db.query(models.ProductItem).all()

# def get_orderDetail(db: Session):
#     return db.query(models.DataOrder).all()
def add_product_item(db: Session,item:schema.ProductItem):
    db_item = models.ProductItem(
        product_id = item.product_id,
        item_id = item.item_id,
        amount_item = item.amount_item
        )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def add_item(db: Session,item:schema.Item):
    db_item = models.Item(
        name = item.name,
        priceperitem = item.priceperitem,
        amount = item.amount,
        booking = item.booking
        )

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def add_product(db: Session,product:schema.Product):
    db_product = models.Product(
        name = product.name,
        price = product.price,
        product_type_id = product.product_type_id,
        description = product.description,
        manday = product.manday
        )
    
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def add_order(db: Session,order:schema.DataOrder):
    db_order = models.DataOrder(
        totalprice = order.totalprice,
        totalcost = order.totalcost,
        cus_id = order.cus_id,
        date_start = order.date_start,
        date_pickup = order.date_pickup,
        status_id = order.status_id,
        amount = order.amount,
        delivery_id = order.delivery_id,
        payment = order.payment,
        product_id = order.product_id,
        amount_char = order.amount_char,
        amount_icon = order.amount_icon,
        handle = order.handle,
        picture_original = order.picture_original,
        picture_led = order.picture_led,
        picture_name = order.picture_name,
        totalmanday = order.totalmanday
        )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def submit_order(db: Session,order:schema.DataOrder):
    db_order = models.DataOrder(
      
        # date_start = order.date_start,
        #date_pickup = order.date_pickup,
        #status_id = order.status_id,
        #amount = order.amount,
        #delivery_id = order.delivery_id,
        #payment = order.payment,
        #product_id = order.product_id,
        amount_char = order.amount_char,
        amount_icon = order.amount_icon,
        #handle = order.handle,
        #picture_original = order.picture_original,
        #picture_led = order.picture_led,
        #picture_name = order.picture_name,
        #totalmanday = order.totalmanday
        )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def add_user(db: Session,user:schema.User):
    db_user = models.User(
      name = user.name,
      surname = user.surname,
      email = user.email,
      tel = user.tel,
      address = user.address,
      username = user.username,
      password = user.password,
      role_id = user.role_id

        )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_order_pic(db: Session,id:int,picture_original:schema.UpdateOrderPic,picture_name:schema.UpdateOrderPic):
    db_order = models.DataOrder(
        # id=id,
        picture_original = picture_original,
        picture_name = picture_name,
        )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def update_order_picled(db: Session,order:schema.UpdateOrderPicLed):
    db_order = models.DataOrder(
        picture_led = order.picture_led,
        )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


def create_user(db: Session,user:schema.UserCreate):
    db_user = models.Datatest(id=user.id,name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session,user:schema.DelUser):
    db_user = models.Datatest(id=user.id,name=user.name)
    db.delete(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
