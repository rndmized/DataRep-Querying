from flask import Flask
from flask import render_template
from flask import request
app = Flask(__name__)

#@app.route("/")
#def hello():
#    return render_template('index.html')

#@app.route("/named/", methods=['GET', 'POST'])
#def helloMe():
	 # show the message with the user name, the name is a string requested through the get method key is id, '' represents value.
 #   if request.method == 'POST':
  #  	return 'Your name is %s' % request.form['id']
   # return 'Your name is %s' % request.args.get('id', '')

#nameInputed
@app.route("/", methods=['GET', 'POST'])
def helloMe():
	 # show the message with the user name, the name is a string requested through the get method key is id, '' represents value.
    if request.method == 'POST':
    	return render_template('index.html', nameInputed =request.form['id'])
    return render_template('index.html', nameInputed =request.args.get('id', ''))



#@app.route('/<name>')
#def show_post(name):
    # show the message with the user name, the name is a string
 #   return 'Your name is %s' % name

if __name__ == "__main__":
    app.run()