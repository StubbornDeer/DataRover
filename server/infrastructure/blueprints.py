from flask import Blueprint
from flask_restful import Api

# Webpage bluprint
page_blueprint = Blueprint('page', __name__)
page_entry = Api(page_blueprint)


# API blueprints
auth_api_blueprint = Blueprint('auth', __name__, url_prefix='/api/auth')
auth_api_entry = Api(auth_api_blueprint)


dashboard_api_blueprint = Blueprint('dashboard', __name__, url_prefix='/api/app')
dashboard_api_entry = Api(dashboard_api_blueprint)