# -*- coding: utf-8 -*-
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__, static_url_path='/static')


sustainability_modules = [
    {
        "module_title": "Production Methods",
        "module_description": "Production methods contribute substantially to the sustainability of different clothing choices. Different types of clothing require different production methods, and those methods vary in their environmental impact. Processes like dyeing, washing and printing can all increase water and energy usage and add to the environmental impact of a certain type of clothing. Additionally, not all factories are created equal – be sure to consider the treatment of workers.",
        "module_key_points": ["Different production methods have varying environmental impacts", "You'll often have to search for information about individual brands", "Make sure to consider the water and energy usage involved"],
        "module_img" : "/static/images/denim.jpg",
        "module_next": "/learn/sustainability/2",
        "module_number": "Module 1",
        "module_back": None,
        "completed": False,
        "module_examples" : [
            {
                "name": "DenimJeans",
                "title": "Denim Jeans",
                "img" : "/static/images/denim_jeans.jpg",
                "description": "Guess how sustainable this item is",
                "answer" : 1,
                "answer_description": "According to Levi Strauss & co, producing one pair of Levi jeans requires a staggering 3781 litres of water"
            },
            {
                "name": "RecycledMaterials",
                "title" : "Recycled Materials",
                "img" : "/static/images/recycled-cotton.jpg",
                "answer_description": "Recycled materials don’t take as much effort to turn into clothing – less water and less energy is used in production.  ",
                "answer" : 4
            }
        ]
    },
    {
        "module_title": "Materials",
        "module_description": "Materials have an impact on the sustainability of any item of clothing. Materials can be harmful in a number of ways – sourcing them from plants can be time-consuming and require a lot; chemically-created materials can have negative impacts on the environment when worn; different materials require more or less laundering when you own them. The best materials at the moment are recycled or come from easy-to-grow plants like hemp and linen. <br><b> Think natural, think recycled. </b>",
        "module_key_points": ["Different materials have varying environmental impacts", 
            "Any recycled materials are likely to be better (i.e. recycled cotton)",
            "The classic materials you're used to (polyester, cotton) are often the most harmful!"],
        "module_img" : "/static/images/cotton.jpg",
        "module_next": "/learn/sustainability/3",
        "module_number": "Module 2",
        "module_back": "/learn/sustainability/1",
        "completed": False,
        "module_examples" : [
            {
                "name": "Hemp",
                "title": "Hemp",
                "img" : "/static/images/hemp.jpg",
                "answer" : 5,
                "answer_description": "Hemp requires very little water and effort to grow and works in both winter and summer. It also naturally fertilises the soil it grows in. Hemp is a great choice. "
            },
            {
                "name": "Polyester",
                "title" : "Polyester",
                "img" : "/static/images/polyester.jpeg",
                "answer_description": "Polyester is not biodegradable, the dyes required to dye it are harmful, and it takes a lot of water to produce. It also gives off small microfibres when worn that can pollute waterways and harm animals.",
                "answer" : 1
            },
            {
                "name": "Cotton",
                "title": "Cotton",
                "img" : "/static/images/cotton.jpg",
                "answer": 2,
                "answer_description": "Still not a great choice, but better than polyester. It takes a similar amount of water and labour to produce, but doesn’t continue to pollute once you wear it. Organic cotton is better but still not fantastic."
            },
            { 
                "name" : "RecycledCotton",
                "title" : "Recycled Cotton",
                "img": "/static/images/recycled-cotton.jpg",
                "answer_description": "Anything recycled is going to be a better choice. It doesn’t have to be grown, as it comes from existing cotton waste, and helps prevent landfill waste.",
                "answer": 3
            },
            { 
                "name" : "OrganicLinen",
                "title" : "Organic Linen",
                "img": "/static/images/linen.jpg",
                "answer_description": "A natural fibre, and a great choice. Similarly to hemp, it has little environmental impact, and the whole plant is used when making clothes. ",
                "answer": 4
            },
            { 
                "name" : "",
                "title" : "",
                "img": "/static/images/",
                "answer_description": "",
                "answer": 1
            }
        ]
    },

    {
        "module_title": "Purchasing",
        "module_description": "The way in which you purchase clothes impacts the environment too! For example, online shopping uses carbon emissions through delivery and returns, whereas going to a brick-and-mortar store is less harmful. Additionally, buying second-hand clothes is always a great choice, as no extra impact is made as a result of your consumption.",
        "module_key_points": ["Where you buy your clothes is important", 
            "Thrifted clothing is always going to me more sustainable than buying something new",
            "Buying new clothes contributes to the mass consumption that leads to unsustainability"],
        "module_img" : "/static/images/fast-fashion.jpg",
        "module_next": "/learn/sustainability/4",
        "module_number": "Module 3",
        "module_back": "/learn/sustainability/2",
        "completed": False,
        "module_examples" : [
            {
                "name": "Onlineshopping",
                "title": "Online Shopping",
                "img" : "/static/images/online_shopping.jpg",
                "answer" : 2,
                "answer_description": "Online shopping has more environmental impact than you may realise. With emissions caused by delivery and returns, be careful buying too much online!"
            },
            {
                "name": "Thrifting",
                "title" : "Thrifting/second hand",
                "img" : "/static/images/thrift.jpg",
                "answer_description": "Quite possibly the most ethical clothing you can buy comes from a second-hand store; when you thrift clothes, you don’t contribute to new production at all!",
                "answer" : 5
            }
        ]
    },
    {
        "module_title": "Brands",
        "module_description": "Brands can vary a lot in their environmental impact. Fast fashion brands, such as H&M, Uniqlo, and Zara, are renowned for making bulk products that don’t last very long, meaning you consistently have to buy new clothes, and cause needless environmental impact. Additionally, brands like Everlane, Veja, and tentree brand themselves as sustainable optiosn – this isn’t always accurate, so it’s best to do your own research.</br> <b> Avoid fast fashion, and look into individual brands when buying. </b>",
        "module_key_points": ["Some brands are more committed to sustainable consumption", 
            "Brands whose clothes don't last very long are not going to be very sustainable (fast fashion)",
            "You should research more about individual brands to learn more"],
        "module_img" : "/static/images/everlane.png",
        "module_next": None,
        "module_number": "Module 4",
        "module_back": "/learn/sustainability/3",
        "completed": False,
        "module_examples" : [
            {
                "name": "FastFashion",
                "title": "Fast Fashion",
                "img" : "/static/images/handm.jpg",
                "answer" : 1,
                "answer_description": "Fast fashion is one of the biggest impacts on the environment from the fashion industry, causing people to buy more clothes more often, and often not using the best standards in production."
            },
            {
                "name": "SustainableFashion",
                "title" : "'Sustainable' fashion brands",
                "img" : "/static/images/everlane.png",
                "answer_description": "With brands like Everlane and Veja, it depends! Make sure to do some more research when looking into brands that claim to be sustainable.",
                "answer" : 3
            },
            {
                "name": "MoreExpensive",
                "title" : "More expensive brands",
                "img" : "/static/images/expensive_brands.jpg",
                "answer_description": "While not always true, as a general rule, more expensive brands tend to carry higher quality clothing – consider investing in one or two high quality pieces that last a long time rather than many more cheap pieces.",
                "answer" : 3
            }
        ]
    }
]


questions = [
        {
            "original_options": 
            {
                0: {"title" : "Sustainable fashion brand pants", "img" : "/static/images/everlane_pants.jpg"},
                1 : {"title": "Denim Jeans", "img" : "/static/images/denim_jeans.jpg"},
                2: {"title": "Hemp pants", "img" : "/static/images/hemp_pants.jpg"}
            },
            "solutions" : { 0 : 1, 1: 0, 2 : 2},
            "title" : "You need a pair of pants to wear at the weekend.",
            "explanation" : "Denim jeans are the least sustainable due to the amount of water it takes to make them. Sustainable fashion brand pants (for example, Everlane), depend heavily on the exact style and brand -- it's always best to do your own research. Hemp wins this round as it is consistently rated one of the most sustainable materials."
        },
        {
            "original_options": 
            {
                0: {"title" : "Polyester", "img" : "/static/images/polyester.jpeg"},
                1 : {"title": "Recycled cotton", "img" : "/static/images/recycled-cotton.jpg"},
                2: {"title": "Normal cotton", "img" : "/static/images/cotton.jpg"}
            },
            "solutions" : { 0 : 1, 1: 0, 2 : 2},
            "title": "Which of these materials is most sustainable?",
            "explanation": "Recycled cotton wins (the fact that it's recycled means it's contributing less to emissions. Polyester and normal cotton are pretty close (and both not great), but cotton wins out."
        },
        {
            "original_options": {
                0 : {"title": "Buy a Champion sweatshirt online.", "img" : "/static/images/champion_sweatshirt.jpg"},
                1 : {"title" : "Go to the Columbia bookstore", "img" : "/static/images/columbia_sweatshirt.jpg"},
                2: {"title": "Buy one from a Goodwill", "img" : "/static/images/goodwill.jpg"}
            },
            "solutions" : { 0 : 0, 1: 1, 2: 2},
            "title": "You want a new sweatshirt. Which is the best way to buy it?",
            "explanation": "Buying second hand helps prevent excess emissions and environmental impact. But if you have to buy new, try to buy in store instead of online!"
        },
        {
            "original_options": {
                0 : {"title": "Tee from H&M", "img" : "/static/images/handm.jpg"},
                1 : {"title" : "Organic cotten tee from Everlane", "img" : "/static/images/everlane_tee.jpg"},
                2: {"title": "Hemp polo shirt", "img" : "/static/images/hemp_polo.jpg"}
            },
            "solutions" : { 0 : 0, 1: 1, 2: 2},
            "title": "You're headed to the beach and you want something cool to wear.",
            "explanation": "The hemp wins out: it's the most sustainable fabric here! The everlane organic cotton shirt beats the H&M shirt -- it's more versatile and is likely to last longer!"
        },
        {
            "original_options": {
                0 : {"title": "Everlane Recycled Down Jacket", "img" : "/static/images/everlane_puffer.jpg"},
                1 : {"title" : "Jacket you found at a vintage store in Brooklyn", "img" : "/static/images/vintage_brooklyn.jpg"},
                2: {"title": "North Face Jacket", "img" : "/static/images/northface_puffer.jpg"}
            },
            "solutions" : { 0 : 0, 1: 1, 2: 2},
            "title": "You're looking for a warm winter jacket!",
            "explanation": "Once again, the second-hand choice wins. Next is the Everlane jacket, due to recycled materials, and last is the North Face jacket."
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
    
    return render_template('question.html', questions = questions)

@app.route('/learn/sustainability/<id>')
def module(id=id):
    module_to_send = {"module":sustainability_modules[int(id)-1]}
    return render_template('module.html', module = module_to_send)

if __name__ == '__main__':
   app.run(debug = True, host='0.0.0.0')
