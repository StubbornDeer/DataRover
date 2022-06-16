from datetime import datetime
import uuid
from flask import current_app, request, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from sqlalchemy.dialects.postgresql import UUID

from server.infrastructure.extensions import db
from .generic_entity import GenericEntity

class AccountHistory(db.Model, GenericEntity):
    __tablename__ = 'account_history'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=lambda: uuid.uuid4().hex)
    account_id = db.Column(UUID(as_uuid=True), db.ForeignKey('account.id'))
    date = db.Column(db.DateTime(), nullable=True)
    event_type = db.Column(db.String(32), nullable=True) # payment/user/account
    event = db.Column(db.String(32), nullable=True) # Some text representation of event
    comment = db.Column(db.String(128)) # Text comment