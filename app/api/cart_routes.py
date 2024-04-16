from flask import Blueprint
from flask_login import login_required
from sqlalchemy import select
from app.models import db, CartItem, MenuItem

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

