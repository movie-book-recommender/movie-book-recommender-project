from flask import Flask, render_template
import time

app = Flask(__name__)

@app.route("/time")
def index():
    return {'time': time.time()}