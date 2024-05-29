from flask import Flask, jsonify, request, make_response
from flask_pymongo import PyMongo, ObjectId
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from bson import ObjectId
from config import Config


import csv
import db
import dns

from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

# Get the environment variables
config = os.environ
DB_NAME = config.get("DB_NAME", "")
DB_USER = config.get("DB_USER", "")
DB_PASSWORD = config.get("DB_PASSWORD", "")
DB_CLUSTER = config.get("DB_CLUSTER", "")

# Construct the MongoDB URI for MongoDB Atlas
# config["MONGO_URI"] = "mongodb+srv://hernarusdiyana:090423@Cluster0.evxdae0.mongodb.net/prform?retryWrites=true&w=majority&appName=Cluster0"
config["MONGO_URI"] = "mongodb+srv://hernarusdiyana:090423@cluster0.evxdae0.mongodb.net/prform?retryWrites=true&w=majority&appName=Cluster0"


app = Flask(__name__)
app.config["MONGO_URI"] = config["MONGO_URI"]

mongo = PyMongo(app)
db = mongo.db.purchase_requisitions


# Inisialisasi ekstensi Flask-CORS dengan domain yang diizinkan
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
cors = CORS(app)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

@app.after_request
def after_request(response):
    return add_cors_headers(response)

@app.route("/users", methods=["GET"])
def get_users():
    users = []
    for user in db.find():
        users.append({
            "_id": str(user["_id"]),
            # "name": user["name"],
            "email": user["email"],
            "password": user["password"],
        })
    return jsonify(users)


@app.route("/user/<id>", methods=["GET"])
def get_user(id):
    user = db.find_one({"_id": ObjectId(id)})
    if user is not None:
        user["_id"] = str(user["_id"])
    else:
        user = {}
    return jsonify(user=user)


@app.route("/user", methods=["POST"])
def create_user():
    user = db.insert_one({
        "name": request.json["name"],
        "email": request.json["email"],
        "password": request.json["password"],
    })
    return jsonify(id=str(user.inserted_id), message="user created sucessfully.")

@app.route("/prform", methods=["POST"])
def create_pr():
    pr = db.insert_one({
        "departement": request.json["departement"],
        "requester_name": request.json["requester_name"],
        "product": request.json["product"],
        "brand": request.json["brand"],
        "desc": request.json["desc"],
        "qty": request.json["qty"],
        "category": request.json["category"],
        "features": request.json["features"],
        "uom": request.json["uom"],
        # "duration": request.json["duration"],
        # "departement": request.json["departement"],
    })
    return jsonify(id=str(pr.inserted_id), message="PR created Successfully")

# Handling OPTIONS method for preflight request
@app.route("/prform", methods=["OPTIONS"])
def handle_options():
    response = make_response()
    return add_cors_headers(response)

@app.route("/user/<id>", methods=["DELETE"])
def delete_user(id: str):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify(message="user deleted", id=id)


@app.route("/user/<id>", methods=["PUT"])
def update_user(id: str):
    db.update_one({'_id': ObjectId(id)}, {
        "$set" : {
            'name': request.json["name"],
            'email': request.json["email"],
            'password': request.json["password"]
        }
    })
    return jsonify(message="user updated", id=id)

#test to insert data to the data base
@app.route("/test")
def test():
    return 'Koneksi ke MongoDB Atlas berhasil!'

@app.route("/add_user", methods=['POST'])
def add_user():
    user_data = request.json
    result = collection.insert_one(user_data)
    response = {
        'message': 'User berhasil ditambahkan',
        'inserted_id': str(result.inserted_id)
    }
    return jsonify(response),201

@app.route('/recommendation', methods=['POST'])
def get_recommendation():
    data = request.get_json()
    criteria = data.get('state')
    # Logic to fetch recommendation based on criteria
    # For now, we'll just return a dummy recommendation
    recommendation = {"price": 100}  # Replace with actual logic
    return jsonify(recommendation)

@app.route('/submit', methods=['POST'])
def submit_form():
    data = request.json
    # Logic to save data to MongoDB
    pymongo.db.collection.insert_one(data)
    return jsonify({"status": "success"})

@app.route('/login',methods = ['POST', 'GET'])
def index():
    if request.method == "POST":
        product = request.form['product']
        brand = request.form['brand']
        desc = request.form['desc']
        qty = request.form['qty']
        category = request.form['category']
        features = request.form['features']
        uom = request.form['uom']
        duration = request.form['duration']
        departement = request.form['departement']
    return jsonify(data)
    
@app.route('/api/test')
def get_collection_data():
    documents = collection.find()
    data = []
    for document in documents:
        document['_id'] = str(document['_id'])
        data.append(document)
    return jsonify(data)

@app.route('/api/submit', methods=['POST'])
def submit():
    data = request.json
    # Insert the data into MongoDB
    collection.insert_one(data)
    return jsonify({"message": "Data stored in MongoDB"}), 200

@app.route('/success')
def success():
    return 'Form submitted successfully!'


@app.route('/api/pr_new', methods=['POST','GET'])
def data(): 
    if request.method == 'POST':
        body = request.json
        product = body['product']
        brand = body['brand']
        desc = body['desc']
        qty = body['qty']
        category = body['category']
        features = body['features']
        uom = body['uom']
        duration = body['duration']
        departement = body['departement']
        
        db['pr_new'].inser_one({
            'product': product,
            'brand': brand,
            'desc': desc,
            'qty': qty,
            'category': category,
            'features': features,
            'uom': uom,
            'duration': duration,
            'departement': departement,
        })
        
        return jsonify({
            'status' : 'Data is posted to MongoDB',
             "product": product,
            "brand": brand,
            "desc": desc,
            "qty": qty,
            "category": category,
            "features": features,
            "uom": uom,
            "duration": duration,
            "departement": departement,
        })
    

@app.route('/pr_create', methods=['POST'])
def createPR():
  id = db.insert({
    'product': request.json['product'],
    'brand': request.json['brand'],
    'desc': request.json['desc'],
    'qty': request.json['qty'],
    'category': request.json['category'],
    'features': request.json['features'],
    'uom': request.json['uom'],
    'duration': request.json['duration'],
    'departement': request.json['departement'],
  })
  return jsonify(str(ObjectId(id)))

@app.route('/api/data', methods=['GET'])
def get_data():
    data = []
    with open('pr_2020_2023.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            data.append(row)
    return jsonify(data)

@app.route('/insert', methods=['POST'])
def insert_data():
    data = request.json  # Assuming you are sending JSON data in the request
    if data:
        # Insert data into MongoDB
        inserted_data = collection.insert_one(data)
        return jsonify({" ": "Data inserted successfully", "inserted_id": str(inserted_data.inserted_id)})
    else:
        return jsonify({"error": "No data provided"}), 400




@app.route('/add_data', methods=['POST'])
def add_data():
    data = request.get_json()
    product = data['product']
    brand = data['brand']
    desc = data['desc']
    qty = data['qty']
    category = data['category']
    features = data['features']
    uom = data['uom']
    duration = data['duration']
    departement = data['departement']
    
    pymongo.db.pr_new.insert_one({'product': product, 'brand': brand, 'desc': desc,'qty': qty,'category': category, 'features': features, 'uom': uom, 'duration': duration, 'departement': departement })
    return jsonify({'message': 'Data added successfully'})
    
if __name__ == '__main__':
    app.run(debug=True)
