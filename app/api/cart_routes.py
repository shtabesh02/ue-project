from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, CartItem, MenuItem, ShoppingCart
from app.forms import ShoppingCartForm, CartItemForm

cart_routes = Blueprint("cart", __name__)


@cart_routes.route("/")
@login_required
def list_cart_items():
    history = ShoppingCart.query.filter_by(user_id=current_user.get_id()).all()

    return {
        cart.id: {
            "menu_items": [item.menuitem.to_dict() for item in cart.cartitems],
            "time": cart.created_at,
        }
        for cart in history
    }


@cart_routes.route("/", methods=["POST"])
@login_required
def make_transaction():
    """
    Create a transaction history in the database
    """
    form = ShoppingCartForm()

    data = request.json["cart_items"]
    for x in range(len(data)):
        data[x]["csrf_token"] = request.cookies["csrf_token"]

    form.process(data={"cart_items": data})
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        cart = ShoppingCart(user_id=current_user.id)
        db.session.add(cart)
        # commit first so we can have a cart id auto generated by SQL
        db.session.commit()

        # data passed is in:
        # [{menu_item_id: int, quantity: int}, {menu_item_id: int, quantity: int}]
        # dict format from front-end

        # ex:
        # cart_items = [{"menu_item_id": "3", "quantity": "2"}, {"menu_item_id": "1", "quantity": "3"}]
        for item in form.data["cart_items"]:
            new_item = CartItem(
                shopping_cart_id=cart.id,
                menu_items_id=item["menu_items_id"],
                quantity=item["quantity"],
            )
            db.session.add(new_item)

        # commit db changes and return our "reciept"
        db.session.commit()
        reciept = CartItem.query.filter(CartItem.shopping_cart_id == cart.id).all()
        return {cart_item.id: cart_item.menuitem.to_dict() for cart_item in reciept}
    return form.errors
