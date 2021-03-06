from app import ma
from schemas.base_schema import BaseSchema
from schemas.sentireddit_comment_schema import SentiRedditCommentSchema
from schemas.sentiment_schema import SentimentSchema
from schemas.post_schema import PostSchema
from marshmallow import fields, validates_schema, ValidationError
from models.user_model import User


class UserSchema(ma.SQLAlchemyAutoSchema, BaseSchema):

    password = fields.String(required=True)
    password_confirmation = fields.String(required=True)
    comments = fields.Nested('SentiRedditCommentSchema', many=True)
    user_sentiments = fields.Nested('SentimentSchema', many=True)
    viewed_posts = fields.Nested('PostSchema', many=True)
    saved_posts = fields.Nested('PostSchema', many=True)

    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        load_only = ('password',)

    @validates_schema
    def check_passwords_match(self, data, **kwargs):
        if data['password'] != data['password_confirmation']:
            raise ValidationError(
                'Passwords do not match',
                'password_confirmation'
            )

    # Following validation provides JSON responses on front end for asynchronous validation of unique properties. JSON response can be more efficiently parsed into a
    # validation error message for the user to understand instead of the native SQLAlchemy IntegrityError which did not present in a UX-friendly manner on the front end.

    @validates_schema
    def check_username_unique(self, data, **kwargs):
        if User.query.filter_by(username=data['username']).first():
            raise ValidationError(
                'Username is already taken',
                'username'
            )

    @validates_schema
    def check_email_unique(self, data, **kwargs):
        if User.query.filter_by(email=data['email']).first():
            raise ValidationError(
                'Email is already registered',
                'email'
            )
