from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class MenuItemForm(FlaskForm):
    restaurant_id = StringField("restaurant_id", validators=[DataRequired()])
    food_name = StringField("food_name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    price = StringField("price", validators=[DataRequired()])
    img_url = StringField("img_url", validators=[DataRequired()])
