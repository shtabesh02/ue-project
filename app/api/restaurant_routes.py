from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Restaurant, db
from sqlalchemy.orm import joinedload
from app.forms import RestaurantForm

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
def add_restaurant():
    """
    Create a new restaurant.
    """
    #dict format from front-end
    data = request.json
    
    form = RestaurantForm()
    if form.validate_on_submit():
        new_restaurant = Restaurant(
            user_id = current_user.id,
            name = data["name"],
            description = data["description"],
            address = data["address"],
            city = data["city"],
            country = data["country"],
            img_url = data["img_url"]
        )

        db.session.add(new_restaurant)
        db.session.commit()

        return new_restaurant.to_dict()
    return form.errors


@restaurant_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_restaurant(id):
    restaurant = Restaurant.query.get(id)
    data = request.json
    form = RestaurantForm()

    if form.validate_on_submit():
        restaurant.name = data["name"]
        restaurant.description = data['description']
        restaurant.address = data['address']
        restaurant.city = data['city']
        restaurant.country = data['country']
        restaurant.img_url = data['img_url']

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
