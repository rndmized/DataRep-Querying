from flask import Flask, render_template,request,json,send_from_directory,make_response
from flask_pymongo import PyMongo

app = Flask('dnd5e')


# connect to a MongoDB database.
app.config['MONGO_DBNAME'] = 'dnd5e'
app.config['MONGO_URI'] ='mongodb://guest:guest@ds157187.mlab.com:57187/dnd5e'
mongo = PyMongo(app)

@app.route("/")
def root():
    return app.send_static_file('index.html')

@app.route("/home", methods=['GET'])
def getHomepage():
    return render_template('home_template.html')

@app.route("/character_creation", methods=['GET'])
def charPage():
    return render_template('character_creation_template.html')

@app.route("/character_details", methods=['GET'])
def charDetails():
    return render_template('character_details_template.html')

@app.route("/character_sheet", methods=['GET'])
def charSheet():
    return render_template('character_sheet_template.html')

@app.route("/character_sheet", methods=['GET'])
def getCharacterSheetImage():
	resp = flask.make_response(send_from_directory('static',filename='/assets/char_sheet.png'))
    	return resp 

@app.route("/race", methods=['GET'])
def returnRace():
	name = request.args.get('name', '')
	raceReq = mongo.db.races
	race = raceReq.find_one({'race':name})
	del race['_id']
	return json.dumps(race)


@app.route("/race_selected", methods=['GET'])
def returnRaceSelected():
	name = request.args.get('name', '')
	raceReq = mongo.db.races
	race = raceReq.find_one({'race':name})
	del race['_id']
	del race['description']
	return json.dumps(race)

@app.route("/class", methods=['GET'])
def returnClass():
	name = request.args.get('name', '')
	class_id = mongo.db.classes
	class_id = class_id.find_one({'class':name})
	del class_id['_id']
	return json.dumps(class_id)

@app.route("/class_selected", methods=['GET'])
def returnClassSelected():
	name = request.args.get('name', '')
	class_id = mongo.db.classes
	class_id = class_id.find_one({'class':name})
	del class_id['description']
	del class_id['_id']
	return json.dumps(class_id)



if __name__ == "__main__":
    app.run(debug=True)
