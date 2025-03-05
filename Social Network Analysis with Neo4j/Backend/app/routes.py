from flask import Blueprint, jsonify, request
from social_network.social_network import SocialNetwork
import os
from dotenv import load_dotenv
load_dotenv()

main = Blueprint('main', __name__)

# Initialize the SocialNetwork class
uri = os.getenv('NEO4J_URI')
user = os.getenv('NEO4J_USERNAME')
password = os.getenv('NEO4J_PASSWORD')
sn = SocialNetwork(uri, user, password)

print(uri)
print(user)
print(password)

# API Endpoints
@main.route("/api/locations", methods=["GET"])
def get_locations():
    locations = sn.get_all_locations()
    return jsonify(locations)

@main.route("/api/interests", methods=["GET"])
def get_interests():
    interests = sn.get_all_interests()
    return jsonify(interests)

@main.route("/api/people", methods=["GET"])
def get_people():
    people = sn.get_all_people()
    return jsonify(people)

@main.route("/api/add_person", methods=["POST"])
def add_person():
    data = request.get_json()
    name = data.get("name")
    age = data.get("age")
    location = data.get("location")
    interests = data.get("interests", [])
    result = sn.add_person(name, age, location, interests)
    return jsonify({"message": result})

@main.route("/api/add_friendship", methods=["POST"])
def add_friendship():
    data = request.get_json()
    person1 = data.get("person1")
    person2 = data.get("person2")
    result = sn.add_friendship(person1, person2)
    return jsonify({"message": result})

@main.route("/api/visualize", methods=["GET"])
def visualize():
    html_content = sn.visualize_network()
    return html_content