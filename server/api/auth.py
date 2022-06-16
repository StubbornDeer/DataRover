from flask import render_template, make_response
from flask_restful import Api, Resource

from server.infrastructure.wrappers import pages_route

@pages_route('/auth/<path:path>')
class MainApp(Resource):
    def get(self, path):
        return make_response(render_template('auth.html'))