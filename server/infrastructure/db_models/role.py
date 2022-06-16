from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
from flask_sqlalchemy import SQLAlchemy
import uuid

from server.infrastructure.extensions import db
from .generic_entity import GenericEntity

class Role(db.Model, GenericEntity):
    __tablename__ = 'role'
    id = db.Column(UUID(as_uuid=True),
        primary_key=True, default=lambda: uuid.uuid4().hex)
    is_default = db.Column(db.Boolean, default=False, server_default='f')
    name = db.Column(db.String(64), unique=True)
    users = db.relationship('User', backref='role', lazy='dynamic')