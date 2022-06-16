import sys, os, importlib
from pathlib import Path

from flask import Flask
from server.config import ConfigHelper, ProductionConfig

from .extensions import db, db_schema, mail, alembic, login_manager

def create_app():
    
    app = Flask(__name__, template_folder='../static/templates') 
    dist_folder = os.path.abspath(os.path.join(app.root_path,"../static"))
    app.static_folder = dist_folder
    app.static_url_path='/static'
    app.url_map.strict_slashes = False
    config_cls = ConfigHelper.set_config(sys.argv)
    app.config.from_object(config_cls)
    register_blueprints(app)
    init_global_functions(app)
    import_modules('server/api')
    import_modules('server/infrastructure/db_models') # Import database models
    register_extensions(app)
    register_app_components(app)

    '''
    if config_cls == ProductionConfig:
        Talisman(app, content_security_policy=None)
    '''
    return app

# automate
# what if any other blueprint would register itself?
def register_blueprints(app):
    '''
    from src.app.auth.auth_blueprint import auth_blueprint
    from src.app.dashboard.dashboard_blueprint import dashboard_blueprint
    from src.app.adminDashboard.admin_dashboard_blueprint import admin_dashboard_blueprint

    blueprints = [dashboard_blueprint, auth_blueprint, admin_dashboard_blueprint] 
    for blueprint in blueprints:
        app.register_blueprint(blueprint)
    '''
    from .blueprints import auth_api_blueprint, dashboard_api_blueprint, page_blueprint

    blueprints = [page_blueprint, auth_api_blueprint, dashboard_api_blueprint] 
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

def import_modules(folder_name):
    folder = Path.joinpath(Path.cwd(), folder_name)
    named_path = folder_name.replace('/', '.')
    for root, dirs, files in os.walk(folder):
        for f in files:
            if os.path.splitext(f)[1] == '.py':
                rel = root.replace(folder._str, '')
                module_name = named_path + rel.replace('\\', '.').replace('/', '.') + '.' + f.replace('.py', '')
                module_spec = importlib.util.find_spec(module_name)
                if module_spec:
                    namespace_module = importlib.import_module(module_name)

def init_global_functions(app):
    from . import utils
    utils.init(app)

def register_extensions(app):
    db.init_app(app)
    db_schema.init_app(app)
    mail.init_app(app)
    alembic.init_app(app)
    login_manager.init_app(app)

def __register_components_auto(folder, app, folder_name, module_type):
    for module in folder.iterdir():
        if module.is_dir():
            module_spec = importlib.util.find_spec('src.{0}.{1}.{2}'.format(folder_name, module.name, module_type))
            if module_spec:
                component_module = importlib.import_module('src.{0}.{1}.{2}'.format(folder_name, module.name, module_type))
                if hasattr(component_module, 'init_app'):
                    init_app = getattr(component_module, 'init_app')
                    if init_app:
                        init_app(app)

def register_app_components(app):
    '''
    Automatically registers all module that need some initializing with application.
    '''
    services_modules_folder = Path.joinpath(Path.cwd(), 'src/shared/services')
    if services_modules_folder.exists():
        __register_components_auto(services_modules_folder, app, 'shared.services', 'service')

    shared_modules_folder = Path.joinpath(Path.cwd(), 'src/modules')
    if shared_modules_folder.exists():
        __register_components_auto(shared_modules_folder, app, 'modules', 'api')

        services_modules_folder = Path.joinpath(Path.cwd(), 'src/shared/services')
    if services_modules_folder.exists():
        __register_components_auto(services_modules_folder, app, 'shared.services', 'service')