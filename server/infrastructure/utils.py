import os
from flask import current_app, request

def init(app):
    app.jinja_env.globals.update(get_abs_path = get_abs_path) 
    app.jinja_env.globals.update(get_config_var = get_config_var) 
    return

def get_abs_path(relative_path):
    return os.path.abspath(os.path.join(current_app.root_path, relative_path))

def get_config_var(var_name, app = current_app):
    if var_name in app.config:
        return app.config[var_name]
    return None

def not_empty_string(str):
    return str is not None and str != ''

def flat_validation_errors(errors_object):
    errors = []
    if errors_object:
        for index, error_key in enumerate(errors_object.keys()):
            for error in errors_object[error_key]:
                #errors.append(error_key + ': ' + error)
                errors.append(error)
    return ', '.join(errors)

def parse_list_var(list_value):
    if list_value is None or list_value == '':
        return []
    return list_value.split(' ')

def request_payload(key_id=None):
    '''
    key_id: Payload variable value. If not provided, the whole payload object is returned
    '''
    try:
        payload = request.get_json(force=True)
        if key_id is not None:
            return payload.get(key_id)
        return payload
    except Exception as ex:
        return None
