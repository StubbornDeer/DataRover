import uuid
from datetime import datetime

from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
from flask import current_app
from flask_login import UserMixin
from passlib.hash import pbkdf2_sha256 as sha256
import jwt

from server.infrastructure.utils import get_config_var
from .role import Role
from .account import Account
from .generic_entity import GenericEntity

from server.infrastructure.extensions import db, login_manager

class User(UserMixin, db.Model, GenericEntity):
    __tablename__ = 'user'

    id = db.Column(UUID(as_uuid=True),
        primary_key=True, default=lambda: uuid.uuid4().hex)
    username = db.Column(db.String(120), nullable = False)
    userpic_url = db.Column(db.String(), nullable = True)
    email = db.Column(db.String(64), unique=True)
    password_hash = db.Column(db.String(120), nullable = False)
    role_id = db.Column(UUID(as_uuid=True), db.ForeignKey('role.id'))
    confirmed = db.Column(db.Boolean, default=False, server_default='f')
    account_id = db.Column(UUID(as_uuid=True), db.ForeignKey('account.id'))
    account = db.relationship('Account', back_populates='user', cascade='all,delete')
    created = db.Column(db.DateTime(), nullable=True)
    enabled = db.Column(db.Boolean, default=True, server_default='t', nullable=True)
    social_provider = db.Column(db.String(120), nullable = True) # For example, 'google'
    social_id = db.Column(db.String(), nullable = True) # Social provider Id

    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if self.role is None:
            admin_emails = get_config_var('ADMIN_EMAIL').split(' ') if get_config_var('ADMIN_EMAIL') is not None else []
            if len(admin_emails) > 0 and self.email in admin_emails:
                self.role = Role.query.filter_by(name='Admin').first()
            else:
                default_role = Role.query.filter_by(is_default=True).first()
                self.role = default_role
        if self.account == None:
            self.account = Account()
        self.enabled = True
    
    def set_password(self, password):
        '''
        Creates a hash from a password
        '''
        hash = self.generate_hash(password)
        self.password_hash = hash

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(uuid.UUID(user_id))

    def generate_hash(self, password):
        return sha256.hash(password)

    def verify_hash(self, password):
        return sha256.verify(password, self.password_hash)

    # Is used for confirmation and forgot password feature
    def generate_verification_token(self, key='confirm', expiration=3600):
        secret = get_config_var('TOKEN_SECRET_KEY')
        token = jwt.encode({key: self.id.__str__()}, secret, algorithm='HS256')
        return token
        #s = Serializer(get_config_var('TOKEN_SECRET_KEY'), expiration)
        #return s.dumps({key: self.id.__str__()}).decode('utf-8')

    def verify(self, token, key='confirm'):
        #s = Serializer(get_config_var('SECRET_KEY'))
        secret = get_config_var('TOKEN_SECRET_KEY')
        try:
            #data = s.loads(token.encode('utf-8'))
            data = jwt.decode(token, secret, algorithms="HS256")
        except Exception as ex:
            return False
        if data.get(key) != self.id.__str__():
            return False
        self.confirmed = True
        return True