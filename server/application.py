import os
from flask import Flask, render_template

app = Flask(__name__, template_folder='')
dist_folder = os.path.abspath(os.path.join(app.root_path,"../server/static"))
print('here', dist_folder)
app.static_folder = dist_folder
app.static_url_path='/server/static'

@app.route('/')
@app.route('/<path:path>')
def main_app(path=None):
    return render_template('static/index.html')
