import click
from flask import send_from_directory, current_app, render_template, make_response, request
from flask.cli import with_appcontext
from server.infrastructure.app_factory import create_app

# Application factory
application = create_app()

'''
import os
from flask import Flask, render_template

app = Flask(__name__, template_folder='')
dist_folder = os.path.abspath(os.path.join(app.root_path,"../server/static"))
app.static_folder = dist_folder
app.static_url_path='/server/static'

@app.route('/')
@app.route('/<path:text>')
def main_app(text=None):
    return render_template('static/index.html')
'''