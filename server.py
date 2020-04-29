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

@app.route('/quiz')
def quiz(name=None):
    
    return render_template('quiz.html')

@app.route('/quiz/<id>')
def question(id=id):

    return render_template('question.html')

@app.route('/learn/<id>')
def module(id=id):

    return render_template('module.html')

if __name__ == '__main__':
   app.run(debug = True, host='0.0.0.0')
