from flask import Flask, render_template,request,json,send_from_directory,make_response
from flask_pymongo import PyMongo

app = Flask('dnd5e')

# connect to a MongoDB database.
app.config['MONGO_DBNAME'] = 'dnd5e'
#app.config['MONGO_URI'] ='mongodb://localhost:27017/dnd5e'
#Uncomment line avobe and comment line below to connect to a local db or the other way around to connect the cloud db.
app.config['MONGO_URI'] ='mongodb://guest:guest@ds157187.mlab.com:57187/dnd5e'
mongo = PyMongo(app)
#serve index
@app.route("/")
def root():
    return app.send_static_file('index.html')
#Return home template
@app.route("/home", methods=['GET'])
def getHomepage():
    return render_template('home_template.html')

#Return about template
@app.route("/about", methods=['GET'])
def getAboutPage():
    return render_template('about_template.html')

#Return character creation template
@app.route("/character_creation", methods=['GET'])
def charPage():
    return render_template('character_creation_template.html')

#Return character details template
@app.route("/character_details", methods=['GET'])
def charDetails():
    return render_template('character_details_template.html')

#Return character sheet template
@app.route("/character_sheet", methods=['GET'])
def charSheet():
    return render_template('character_sheet_template.html')

#Query db and return matching race name, remove attributes and return json
@app.route("/race", methods=['GET'])
def returnRace():
	name = request.args.get('name', '')
	raceReq = mongo.db.races
	race = raceReq.find_one({'race':name})
	del race['_id']
	return json.dumps(race)

#Query db and return matching race name, remove attributes and return json
@app.route("/race_selected", methods=['GET'])
def returnRaceSelected():
	name = request.args.get('name', '')
	raceReq = mongo.db.races
	race = raceReq.find_one({'race':name})
	del race['_id']
	del race['description']
	return json.dumps(race)

#Query db and return matching class name, remove attributes and return json
@app.route("/class", methods=['GET'])
def returnClass():
	name = request.args.get('name', '')
	class_id = mongo.db.classes
	class_id = class_id.find_one({'class':name})
	del class_id['_id']
	return json.dumps(class_id)

#Query db and return matching class name, remove attributes and return json
@app.route("/class_selected", methods=['GET'])
def returnClassSelected():
	name = request.args.get('name', '')
	class_id = mongo.db.classes
	class_id = class_id.find_one({'class':name})
	del class_id['description']
	del class_id['_id']
	return json.dumps(class_id)
#Main
if __name__ == "__main__":
    app.run(debug=True)
