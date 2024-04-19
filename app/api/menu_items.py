from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import MenuItem, db
from ..forms import MenuItemForm

menu_items_routes = Blueprint("menu-items", __name__)


@menu_items_routes.route("")
@login_required
def show_menu_items():
    menu_items = MenuItem.query.all()

    return {"menu_items": [menu_item.to_dict() for menu_item in menu_items]}


@menu_items_routes.route("/<int:id>")
# @login_required
def item_details(id):
    item_details = MenuItem.query.filter_by(id=id).first()

    return {
        "id": item_details.id,
        "food_name": item_details.food_name,
        "description": item_details.description,
        "price": item_details.price,
        "image": item_details.img_url,
    }


# moved to restaurant_routes.py

# @menu_items_routes.route('', methods=['POST'])
# @login_required
# def add_new_items():
#     menu_item = MenuItemForm()
#     data = request.json
#     print('testing1: ', data['food_name'])
#     print('testing2: ', data)
#     menu_item['csrf_token'].data = request.cookies['csrf_token']
#     if menu_item.validate_on_submit():
#         new_item = MenuItem(restaurant_id=1,food_name=data['food_name'], description=data['description'], price=data['price'], img_url=data['img_url'] )
#         print('until here, ok!')
#         db.session.add(new_item)
#         db.session.commit()
#         return jsonify(message='Item added successfully.')
#     return jsonify(message="couldn't addd new item")


# The bellow routes are defined by Chris Update/Delete
@menu_items_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_items(id):
    form = MenuItemForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        menu_item = MenuItem.query.get(id)

        if int(current_user.get_id()) != menu_item.restaurant.user_id:
            return {"errors": {"message": "Unauthorized"}}, 401

        menu_item.food_name = form.data["food_name"]
        menu_item.decription = form.data["description"]
        menu_item.price = form.data["price"]
        menu_item.img_url = form.data["img_url"]

        db.session.commit()
        return menu_item.to_dict()
    return form.errors


@menu_items_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_item(id):
    menu_item = MenuItem.query.get(id)

    if not menu_item:
        return {"message": "Menu Item couldn't be found"}

    if int(current_user.get_id()) != menu_item.restaurant.user_id:
        return {"errors": {"message": "Unauthorized"}}, 401

    db.session.delete(menu_item)
    db.session.commit()
    return {"message": "Successfully deleted Menu Item"}
