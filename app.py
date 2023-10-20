from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/style")
def style():
    return app.send_static_file('style.css')

@app.route("/script")
def script():
    return render_template("script.js")

@app.route("/font")
def font():
    return app.send_static_file("ARCADECLASSIC.TTF")

@app.route("/happy")
def happy():
    return app.send_static_file("happy.png")

@app.route("/mega_happy")
def mega_happy():
    return app.send_static_file("mega happy.png")

@app.route("/info")
def info():
    return app.send_static_file("info.png")


@app.route("/normal")
def normal():
    return app.send_static_file("normal.png")

@app.route("/unhappy")
def unhappy():
    return app.send_static_file("unhappy.png")

@app.route("/poop")
def poop():
    return app.send_static_file("poop.png")

@app.route("/apple")
def apple():
    return app.send_static_file("apple.png")

if __name__ == "__main__":
    app.run(debug=True)