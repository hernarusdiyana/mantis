from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_cors import CORS
import csv

from bson import ObjectId


app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['prform'] 
collection = db['pr_new']

CORS(app)

# Database
# db = mongo.db.prform

# client = MongoClient('mongodb://localhost:27017/')
# db = client['prform']
# collection = db['pr_new']
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
  print(request.json)
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
        return jsonify({"message": "Data inserted successfully", "inserted_id": str(inserted_data.inserted_id)})
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
    
    mongo.db.pr_new.insert_one({'product': product, 'brand': brand, 'desc': desc,'qty': qty,'category': category, 'features': features, 'uom': uom, 'duration': duration, 'departement': departement })
    return jsonify({'message': 'Data added successfully'})
    
if __name__ == '__main__':
    app.run(debug=True)
