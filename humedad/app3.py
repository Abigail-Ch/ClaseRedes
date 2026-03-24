from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import check_password_hash
import socket

APP_USER = "Abigail"
APP_PW_HASH = "scrypt:32768:8:1$mmq73wqcOk2Dwaxi$c2c007cc9db5322205270e4565ee51"
SECRET_KEY = "1234"

TCP_HOST = "127.0.0.1"
TCP_PORT = 5001

app = Flask(__name__, template_folder="templates", static_folder="static")
app.secret_key = SECRET_KEY


def is_logged_in():
    return session.get("logged_in") is True


# 🔥 FUNCIÓN CLAVE (ARREGLADA)
def send_cmd():
    try:
        with socket.create_connection((TCP_HOST, TCP_PORT), timeout=3) as s:
            s.sendall(b"GET\n")  # da igual lo que mande
            data = s.recv(1024).decode().strip()
            return data
    except Exception as e:
        print("ERROR SOCKET:", e)
        return None


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        user = request.form.get("username")
        pw = request.form.get("password")

        if user == APP_USER and pw == "1234":
            session["logged_in"] = True
            return redirect(url_for("index"))

    return render_template("login.html")


@app.route("/")
def index():
    if not is_logged_in():
        return redirect(url_for("login"))
    return render_template("index.html")


# 🔥 ESTA RUTA ES LA CLAVE
@app.route("/datos")
def datos():
    if not is_logged_in():
        return jsonify({"error": "No autorizado"}), 401

    resp = send_cmd()

    print("RESPUESTA TCP:", resp)  # 🔥 VER ESTO EN CONSOLA

    if resp and "," in resp:
        partes = resp.split(",")

        if len(partes) == 3:
            return jsonify({
                "humedad": partes[0],
                "rango": partes[1],
                "velocidad": partes[2]
            })

    # 🔴 SI FALLA
    return jsonify({
        "humedad": "--",
        "rango": "Sin datos",
        "velocidad": "--"
    })


if __name__ == "__main__":
    app.run(debug=True)
