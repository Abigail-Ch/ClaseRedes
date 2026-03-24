from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import check_password_hash
import socket

APP_USER = "Abigail"
APP_PW_HASH = "scrypt:32768:8:1$mmq73wqcOk2Dwaxi$c2c007cc9db5322205270e4565ee51"
SECRET_KEY = "1234"

TCP_HOST = "127.0.0.1"
TCP_PORT = 5001

app = Flask(__name__, template_folder="templates", static_folder="static", static_url_path="/static")
app.secret_key = SECRET_KEY


def is_logged_in():
    return session.get("logged_in") is True


# 🔌 Comunicación con servidor TCP
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


# 🔐 LOGIN
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = request.form.get("username", "").strip()
        pw = request.form.get("password", "")

        # 🔥 aquí puedes usar hash o simple
        if user == APP_USER and pw == "1234":
            session["logged_in"] = True
            return redirect(url_for("index"))

        return render_template("login.html", error="Usuario o contraseña incorrectos")

    return render_template("login.html", error=None)


# 🔓 LOGOUT
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# 🖥️ DASHBOARD
@app.route("/")
def index():
    if not is_logged_in():
        return redirect(url_for("login"))
    return render_template("index.html")


# 📡 DATOS DEL SENSOR
@app.route("/datos")
def datos():
    if not is_logged_in():
        return jsonify({"error": "No autorizado"}), 401

    try:
        resp = send_cmd("GET")  # 🔥 pide datos al Arduino

        humedad, rango, pwm = resp.split(",")

        return jsonify({
            "humedad": humedad,
            "rango": rango,
            "velocidad": pwm
        })

    except:
        return jsonify({
            "humedad": "--",
            "rango": "--",
            "velocidad": "--"
        })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
