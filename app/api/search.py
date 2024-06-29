from flask import Blueprint, request
from ..models import MenuItem, db
search_routes = Blueprint('searchroutes', __name__)

@search_routes.route('/<string:foodname>')
def seachfood(foodname):
    search_pattern = f"%{foodname}%"
    searchresult = MenuItem.query.filter(
        db.or_(MenuItem.food_name.ilike(search_pattern))
    )
    print('test: ', foodname)
    print('search result: ', searchresult)
    return {"food": {r.id: r.to_dict() for r in searchresult}}