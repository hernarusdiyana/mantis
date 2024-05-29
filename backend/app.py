from flask import Flask, request, jsonify
import tensorflow as tf
from keras.models import load_model
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
import pandas as pd
from flask import Flask, request, jsonify
from flask_pymongo import pymongo, ObjectId
from flask_cors import CORS
from pymongo import MongoClient
# from config import config


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://hernarusdiyana:090423@cluster0.evxdae0.mongodb.net/prform?retryWrites=true&w=majority&appName=Cluster0'


# Inisialisasi koneksi dengan MongoDB
client = MongoClient(app.config['MONGO_URI'])
db = client.get_database('prform')

# Collection
collection = pymongo.collection.Collection(db, 'users')

# client = MongoClient('mongodb://localhost:27017/')
# db = client['prform'] 
# collection = db['pr_new']

CORS(app)


@app.route("/users", methods=["GET"])
def get_users():
    users = []
    for user in db.find():
        users.append({
            "_id": str(user["_id"]),
            "name": user["name"],
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

# Muat model yang telah dilatih
model = load_model('price_recommendation_model.h5')

# Muat dataset untuk scaler dan encoder
data = pd.read_csv('laptops.csv')

# Fit scaler dengan data training
scaler = StandardScaler()
numerical_features = data[['ram', 'storage', 'screen_size', 'battery']].values
scaler.fit(numerical_features)

# Fit OneHotEncoder dengan data training
encoder = OneHotEncoder()
categorical_features = data[['brand', 'model', 'processor']].values
encoder.fit(categorical_features)

@app.route('/recommendation', methods=['POST'])
def get_recommendation():
    data = request.get_json()
    criteria = np.array([[data['brand'], data['model'], data['processor'], data['ram'], data['storage'], data['screen_size'], data['battery']]])
    
    # One-Hot Encoding untuk fitur kategorikal
    categorical_criteria = criteria[:, :3]
    numerical_criteria = criteria[:, 3:].astype(float)
    
    categorical_encoded = encoder.transform(categorical_criteria).toarray()
    
    # Gabungkan hasil encoding dengan fitur numerik
    criteria_encoded = np.hstack((categorical_encoded, numerical_criteria))
    
    # Normalisasi fitur numerik
    criteria_normalized = scaler.transform(criteria_encoded[:, -4:])
    criteria_final = np.hstack((criteria_encoded[:, :-4], criteria_normalized))
    
    # Prediksi harga
    predicted_price = model.predict(criteria_final)[0][0]
    
    return jsonify({"price": predicted_price})

if __name__ == '__main__':
    app.run(debug=True)
