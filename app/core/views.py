from flask import Blueprint, request, render_template, flash, g, session, redirect, url_for, \
                  abort, jsonify
from app.core.repository import *

mod = Blueprint('core', __name__)

@mod.route('/')
def index():
    if 'access_token' in session:
        return redirect(url_for('dashboard'))

  #repository = Repository()
    return (render_template('core/index.html'))

