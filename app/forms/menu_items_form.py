from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired

class MenuItemForm(FlaskForm):
    type = StringField('Type', validators=[DataRequired()])
    food_name = StringField('Food Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[DataRequired()])
    img_url = StringField('Image URL', validators=[DataRequired()])
