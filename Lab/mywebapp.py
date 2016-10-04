from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/albert")
def helloMe():
    return "Hello Albert!"

if __name__ == "__main__":
    app.run()