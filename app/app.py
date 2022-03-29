from flask import Flask,render_template
import socket

app = Flask(__name__)

@app.route("/")
def index():
    try:
        return render_template('index.html')
    except:
        return render_template('error.html')


if __name__ == "__main__":
    app.run(host='34.143.248.73', port=8080)


