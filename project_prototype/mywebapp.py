from flask import Flask, render_template,request,json
from flask_pymongo import PyMongo

app = Flask('dnd5e')


# connect to another MongoDB database on the same host
app.config['MONGO_DBNAME'] = 'dnd5e'
app.config['MONGO_URI'] ='mongodb://localhost:27017/dnd5e' 
mongo = PyMongo(app)

@app.route("/")
def root():
    return app.send_static_file('index.html')

@app.route("/races", methods=['POST'])
def headers():
	title = request.values['title']
	desc = request.values['desc']
	print(title)
	print(desc)
	stringy = "<h1 id="+'"'+title+'"'+"></h1>" + "<p id="+'"'+desc+'"'+"></p>"
	print(stringy)
    	return stringy

@app.route("/race", methods=['POST'])
def returnRace():
	name = request.values['name']
	raceReq = mongo.db.races
	race = raceReq.find_one({'race':name}) 
	del race['_id']
	return json.dumps(race)
    


if __name__ == "__main__":
    app.run(debug=True)