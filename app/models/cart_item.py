from .db import db, environment, SCHEMA, add_prefix_for_prod
# from .user import User

class CartItem(db.Model):
    __tablename__ = 'cartitems'

    id = db.Column(db.Integer, primary_key=True)
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey('shoppingcarts.id'))
    menu_items_id = db.Column(db.Integer, db.ForeignKey('menuitems.id'))
    quantity = db.Column(db.Integer)

    #Many-to-One relationship with User
    shoppingcart = db.relationship("ShoppingCart", back_populates="cartitems")

    #many-to-one relationship with menuitems
    menuitem = db.relationship("MenuItem", back_populates="cartitems")
