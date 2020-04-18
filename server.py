from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__, static_url_path='/static')

@app.route('/', methods=['GET', 'POST'])
def home(name=None):
    
    return render_template('home.html')

@app.route('/learn')
def learn(name=None):
    
    return render_template('learn.html')



if __name__ == '__main__':
   app.run(debug = True, host='0.0.0.0')
