from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import check_password_hash
import socket
import json

APP_USER = "Abigail"
APP_PW_HASH = "scrypt:32768:8:1$lN81FT6fK3DeVxno$b903b38e18e26fd82fbd2282689ffb1d3e27ed6bbb9564d9c3baaf848a36e6881a5a1ef7e41f2f84b2cd6b0afa5967a1134ace25e36f51bb21f6e52a4224584e"
SECRET_KEY = "1234"

TCP_HOST = "127.0.0.1"
TCP_PORT = 5001

app = Flask(__name__, template_folder="templates", static_folder="static", static_url_path="/static")
app.secret_key = SECRET_KEY

def is_logged_in():
    return session.get("logged_in") is True

def send_cmd(cmd: str) -> str:
    with socket.create_connection((TCP_HOST, TCP_PORT), timeout=3) as s:
        s.sendall((cmd + "\n").encode("utf-8"))
        data = b""
        while b"\n" not in data:
            chunk = s.recv(1024)
            if not chunk:
                break
            data += chunk
        return data.decode("utf-8", errors="ignore").strip()

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = request.form.get("username", "").strip()
        pw = request.form.get("password", "")

        if user == APP_USER and check_password_hash(APP_PW_HASH, pw):
            session["logged_in"] = True
            return redirect(url_for("index"))

        return render_template("login.html", error="Usuario o contraseña incorrectos")

    return render_template("login.html", error=None)

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/")
def index():
    if not is_logged_in():
        return redirect(url_for("login"))
    return render_template("index.html")

@app.route("/get_data")
def get_data():
    if not is_logged_in():
        return jsonify({"ok": False, "error": "No autorizado"}), 401

    try:
        resp = send_cmd("GET_DATA")
        data = json.loads(resp)
        data["ok"] = True
        return jsonify(data)
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
