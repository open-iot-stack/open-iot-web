from flask import Flask, render_template, request, session, json
from urllib2 import Request, urlopen
from json import dumps
# from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('app.config')

# db = SQLAlchemy(app)


@app.route("/login", methods=['POST'])
def login():

    username = request.form['username']
    password = request.form['password']
    values = dumps({
        "client_id": "quirky_wink_android_app",
        "client_secret": "e749124ad386a5a35c0ab554a4f2c045",
        "username": username,
        "password": password,
        "grant_type": "password",
    })

    headers = {"Content-Type": "application/json", "Connection": "keep-alive",
        "X-API-VERSION": "1.0 User-Agent: Wink/1.1.9 (iPhone; iOS 7.0.4; Scale/2.00)"}
    req = Request("https://winkapi.quirky.com/oauth2/token", data=values, headers=headers)
    response_body = urlopen(req).read()


    data = json.loads(response_body)

    access_token = data['data']['access_token']
    refresh_token = data['data']['refresh_token']

    session["access_token"] = access_token
    session["refresh_token"] = refresh_token

    print response_body
    devices = listdevices();
    return render_template('dashboard/index.html', devices=devices)



def listdevices():
    token = session["access_token"]
    headers = {"Authorization": "Bearer " + token}
    request = Request("https://winkapi.quirky.com/users/me/wink_devices", headers=headers)
    response_body = urlopen(request).read()
    data = json.loads(response_body)
    print response_body
    return dict(data)

@app.errorhandler(404)
def not_found(error):
  return render_template('404.html'), 404

from app.core.views import mod as core
app.register_blueprint(core)

# Later on you'll import the other blueprints the same way:
#from app.comments.views import mod as commentsModule
#from app.posts.views import mod as postsModule
#app.register_blueprint(commentsModule)
#app.register_blueprint(postsModule)

