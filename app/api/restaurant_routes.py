from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Restaurant

restaurant_routes = Blueprint('restaurants', __name__,url_prefix="/restaurants")


@restaurant_routes.route('/')
def preview():
    """
    Retrieve a list of all restaurants.
    """
    restaurants = Restaurant.query.all()
    return [r.to_dict() for r in restaurants]


# @user_routes.route('/<int:id>')
# @login_required
# def user(id):
#     """
#     Query for a user by id and returns that user in a dictionary
#     """
#     user = User.query.get(id)
#     return user.to_dict()
