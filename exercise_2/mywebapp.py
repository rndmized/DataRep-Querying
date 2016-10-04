from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/albert")
def helloMe():
    return "Hello Albert!"

@app.route('/<name>')
def show_post(name):
    # show the message with the user name, the name is a string
    return 'Your name is %s' % name

if __name__ == "__main__":
    app.run()