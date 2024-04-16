from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, CartItem, MenuItem, ShoppingCart

cart_routes = Blueprint("cart", __name__)


@cart_routes.route("/")
@login_required
def list_cart_items():
    # cart_items = {}
    # for item in CartItem.query.all():
    #     cart_items[item.id] = item.menuitem.to_dict()
    #     cart_items[item.id]["quantity"] = item.quantity
    # return cart_items

    return {item.quantity: item.menuitem.to_dict() for item in CartItem.query.all()}


@cart_routes.route("/", methods=["POST"])
@login_required
def make_transaction():
    cart = ShoppingCart(user_id=current_user.id)
    db.session.add(cart)
    db.session.commit()

    # data passed is in:
    # {menu_item_id: quantity, menu_item_id: quantity}
    # dict format from front-end
    cart_list = request.json
    # ex:
    # cart_list = {"2": "3", "1": "2"}
    for item in cart_list:
        new_item = CartItem(
            shopping_cart_id=cart.id, menu_items_id=item, quantity=cart_list[item]
        )
        db.session.add(new_item)

    # commit db changes and return our "reciept"
    db.session.commit()
    res = CartItem.query.filter(CartItem.shopping_cart_id == cart.id).all()
    return {cart_item.id: cart_item.menuitem.to_dict() for cart_item in res}
