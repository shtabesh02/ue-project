from flask import Blueprint, request
search_routes = Blueprint('searchroutes', __name__)

@search_routes.route('/foodname')
def seachfood(foodname):
    foodname = request.args.get('foodname')