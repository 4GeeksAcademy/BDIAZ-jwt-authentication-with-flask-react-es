"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint,current_app
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import json


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/signup", methods=["POST"])
def create_one_user():
    body=json.loads(request.data)
    new_user=User(
        email=body["email"],
        password=current_app.bcrypt.generate_password_hash(body["password"]).decode('utf-8'),
        name=body["name"],
        lastname=body["lastname"],
        age=body["age"],
        is_active= True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg":"user_created"}),201
   

#----------------------------------------------------------------------------------------------------------


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    #name = request.json.get("name", None)
    #lastname = request.json.get("lastname", None)
    #age = request.json.get("age", None)


    user= User.query.filter_by(email=email ).first()

    if user is None :
        return jsonify({"msg": "Bad username or password"}), 401
    
    valid_password= current_app.bcrypt.check_password_hash(user.password, password)
    if valid_password is False:
        return jsonify({"msg": "invalid password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/perfil", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
    # return jsonify({"user": user.serialize()}), 200

if __name__ == "__main__":
    api.run()