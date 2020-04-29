from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__, static_url_path='/static')


sustainability_modules = [
    {
        "module_title": "Production Methods",
        "module_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "module_key_points": ["Different production methods have varying environmental impacts", "You'll often have to search for information about individual brands"],
        "module_img" : "/static/images/denim.jpg",
        "module_next": "/learn/sustainability/2",
        "module_number": "Module 1",
        "module_back": None,
        "completed": False
    },
    {
        "module_title": "Materials",
        "module_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "module_key_points": ["Different materials have varying environmental impacts", 
            "Any recycled materials are likely to be better (i.e. recycled cotton)",
            "The classic materials you're used to (polyester, cotton) are often the most harmful!"],
        "module_img" : "/static/images/cotton.jpg",
        "module_next": "/learn/sustainability/3",
        "module_number": "Module 2",
        "module_back": "/learn/sustainability/1",
        "completed": False
    },

    {
        "module_title": "Purchasing",
        "module_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "module_key_points": ["Where you buy your clothes is important", 
            "Thrifted clothing is always going to me more sustainable than buying something new",
            "Buying new clothes contributes to the mass consumption that leads to unsustainability"],
        "module_img" : "/static/images/fast-fashion.jpg",
        "module_next": "/learn/sustainability/4",
        "module_number": "Module 3",
        "module_back": "/learn/sustainability/2",
        "completed": False
    },
    {
        "module_title": "Brands",
        "module_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "module_key_points": ["Some brands are more committed to sustainable consumption", 
            "Brands whose clothes don't last very long are not going to be very sustainable (fast fashion)",
            "You should research more about individual brands to learn more"],
        "module_img" : "/static/images/everlane.png",
        "module_next": None,
        "module_number": "Module 4",
        "module_back": "/learn/sustainability/3",
        "completed": False
    }
]

clothing_modules = [

    {
        "module_title": "Production Methods",
        "module_description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "module_key_points": ["Different production methods have varying environmental impacts", "You'll often have to search for information about individual brands"],
        "module_img" : "/static/images/denim.jpg",
        "module_next": "/learn/2",
        "module_number": "Module 1",
        "module_back": None,
        "completed": False
    }

]





@app.route('/', methods=['GET', 'POST'])
def home(name=None):
    
    return render_template('home.html')

@app.route('/learn')
def learn(name=None):
    modules_to_send = {"sustainability_modules":sustainability_modules}
    return render_template('learn.html', modules = modules_to_send)

@app.route('/quiz')
def quiz(name=None):
    
    return render_template('quiz.html')

@app.route('/quiz/<id>')
def question(id=id):

    return render_template('question.html')

@app.route('/learn/sustainability/<id>')
def module(id=id):
    module_to_send = {"module":sustainability_modules[int(id)-1]}
    return render_template('module.html', module = module_to_send)

if __name__ == '__main__':
   app.run(debug = True, host='0.0.0.0')
