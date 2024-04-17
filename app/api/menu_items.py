from flask import Blueprint, jsonify
from flask_login import login_required
from ..models.menu_item import MenuItem

menu_items_routes = Blueprint('menu-items', __name__)

@menu_items_routes.route('')
@login_required
def show_menu_items():
    menu_items = MenuItem.query.all()

    return {'menu_items': [menu_item.to_dict() for menu_item in menu_items]}



@menu_items_routes.route('/<int:id>')
@login_required
def item_details(id):
    item_details = MenuItem.query.filter_by(id=id).first()

    return {
            'id': item_details.id,
            'food_name': item_details.food_name,
            'description': item_details.description,
            'price': item_details.price,
            'image': item_details.img_url
        }


@menu_items_routes.route('')
@login_required
def add_new_items():
    # data = request.json()
    # form = menuItemOFrm()
    # newMenuItemData = MenuItem(name=data['name'])
    # db.session.add(newMenuItemData)
    # db.session.commit()

