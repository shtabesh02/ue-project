from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Restaurant,MenuItem, db
from sqlalchemy.orm import joinedload
from app.forms import RestaurantForm
from app.forms.menu_items_form import MenuItemForm

restaurant_routes = Blueprint('restaurants', __name__)

@restaurant_routes.route('/')
def preview():
    """
    Retrieve a list of all restaurants.
    """
    restaurants = Restaurant.query.all()
    return [r.to_dict() for r in restaurants]


@restaurant_routes.route('/<int:id>')
def detail_of_a_restaurant(id):
    """
    Retrieve details of a specific restaurant and menuitems by ID.
    """
    restaurant = (
        Restaurant.query
        .options(joinedload(Restaurant.menuitems))
        .filter(Restaurant.id == id)
        .first()
    )
    return restaurant.to_dict(include_menuitems=True)

@restaurant_routes.route('/', methods=['POST'])
@login_required
def add_restaurant():
    """
    Create a new restaurant.
    """
    #dict format from front-end
    # data = request.json
    print(request.cookies['csrf_token'])
    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_restaurant = Restaurant(
            user_id = current_user.id,
            name = form.data["name"],
            description = form.data["description"],
            address = form.data["address"],
            city = form.data["city"],
            country = form.data["country"],
            img_url = form.data["img_url"]
        )

        db.session.add(new_restaurant)
        db.session.commit()

        return new_restaurant.to_dict()
    return form.errors


# Adding a new Item to a restaurant by ID

@restaurant_routes.route('/<int:id>/menu-items', methods=['POST'])
@login_required
def add_new_items(id):
    menu_item = MenuItemForm()
    data = request.json
    print('testing1: ', data['food_name'])
    print('testing id: ', id)
    menu_item['csrf_token'].data = request.cookies['csrf_token']
    if menu_item.validate_on_submit():
        new_item = MenuItem(restaurant_id=id,food_name=data['food_name'], description=data['description'], price=data['price'], img_url=data['img_url'] )
        print('until here, ok!')
        db.session.add(new_item)
        db.session.commit()
        return jsonify(message='Item added successfully.')
    return jsonify(message="couldn't addd new item")



@restaurant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_restaurant(id):
    restaurant = Restaurant.query.get(id)

    form = RestaurantForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        restaurant.name = form.data["name"]
        restaurant.description = form.data['description']
        restaurant.address = form.data['address']
        restaurant.city = form.data['city']
        restaurant.country = form.data['country']
        restaurant.img_url = form.data['img_url']

        db.session.commit()
        return restaurant.to_dict()
    return form.errors


@restaurant_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_restaurant(id):
    restaurant = Restaurant.query.get(id)
    if not restaurant:
        return {"message": "Restaurant couldn't be found"}
    db.session.delete(restaurant)
    db.session.commit()
    return {'message': 'Successfully deleted restaurant'}
