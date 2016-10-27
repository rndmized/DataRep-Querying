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

@app.route("/test", methods=['POST'])
def test():
    return render_template('template1.html')

@app.route("/char", methods=['POST'])
def charPage():
    return render_template('template_char.html')

@app.route("/race", methods=['POST'])
def returnRace():
	name = request.values['name']
	raceReq = mongo.db.races
	race = raceReq.find_one({'race':name}) 
	del race['_id']
	return json.dumps(race)
    


if __name__ == "__main__":
    app.run(debug=True)