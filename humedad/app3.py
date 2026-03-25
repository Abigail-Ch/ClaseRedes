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

    return session.get("logged_in", False)
 
 
def send_cmd():

    try:

        with socket.create_connection((TCP_HOST, TCP_PORT), timeout=3) as s:

            s.sendall(b"GET\n")

            s.shutdown(socket.SHUT_WR)
 
            data = b""

            while not data.endswith(b"\n"):

                chunk = s.recv(1024)

                if not chunk:

                    break

                data += chunk
 
            respuesta = data.decode(errors="ignore").strip()

            print("RESPUESTA TCP:", respuesta)

            return respuesta
 
    except Exception as e:

        print("ERROR SOCKET:", e)

        return None
 
 
@app.route("/login", methods=["GET", "POST"])

def login():

    error = None
 
    if request.method == "POST":

        user = request.form.get("username", "").strip()

        pw = request.form.get("password", "").strip()
 
        if user == APP_USER and pw == APP_PASSWORD:

            session["logged_in"] = True

            return redirect(url_for("index"))

        else:

            error = "Usuario o contraseña incorrectos"
 
    return render_template("login.html", error=error)
 
 
@app.route("/logout")

def logout():

    session.clear()

    return redirect(url_for("login"))
 
 
@app.route("/")

def index():

    if not is_logged_in():

        return redirect(url_for("login"))

    return render_template("index.html")
 
 
@app.route("/datos")

def datos():

    if not is_logged_in():

        return jsonify({"error": "No autorizado"}), 401
 
    resp = send_cmd()
 
    if resp and "," in resp:

        partes = resp.split(",", 2)
 
        if len(partes) == 3:

            return jsonify({

                "humedad": partes[0].strip(),

                "rango": partes[1].strip(),

                "velocidad": partes[2].strip()

            })
 
    return jsonify({

        "humedad": "--",

        "rango": "Sin datos",

        "velocidad": "--"

    })
 
 
if __name__ == "__main__":

    app.run(host="0.0.0.0", port=5000, debug=True, use_reloader=False)
