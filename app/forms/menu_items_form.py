from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


def check_price(form, field):
    the_price = field.data
    if not isinstance(the_price, int):
        raise ValidationError('Price must be a number.')

class MenuItemForm(FlaskForm):
    type = StringField('Type', validators=[DataRequired()])
    food_name = StringField('Food Name', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[DataRequired()])
    price = IntegerField('Price', validators=[check_price])
    img_url = StringField('Image URL', validators=[DataRequired()])
