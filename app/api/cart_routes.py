from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, CartItem, MenuItem, ShoppingCart
from app.forms import ShoppingCartForm, CartItemForm

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
        # [{menu_item_id: quantity}, {menu_item_id: quantity}]
        # dict format from front-end

        # ex:
        # cart_items = [{"2": "3"}, {"1": "2"}]
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
    return {"errors": {"message": "Bad Data"}}, 400