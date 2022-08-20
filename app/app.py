from flask import Flask,render_template
from flask_cors import CORS, cross_origin  # This is the magic


app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    try:
        return render_template('index.html')
    except:
        return render_template('error.html')


@app.route("/search")
@cross_origin()
def search():
    

    try:
        return render_template('table_search.html')
    except:
        return render_template('error.html')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
    app.config['TEMPLATES_AUTO_RELOAD'] = True
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
    app.run(debug=True)

