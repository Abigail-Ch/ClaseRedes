from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from werkzeug.security import check_password_hash
import socket
import json

APP_USER = "Abigail"
APP_PW_HASH = "scrypt:XXX"
SECRET_KEY = "XXXX"

TCP_HOST = "127.0.0.1"
TCP_PORT = 5001

app = Flask(__name__, template_folder="templates", static_folder="static", static_url_path="/static")
app.secret_key = SECRET_KEY

def is_logged_in():
    return session.get("logged_in") is True


# -------- FUNCIONES AUXILIARES --------

def conectar_servidor():
    """Realiza conexión con el servidor TCP"""
    try:
        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cliente.connect((TCP_HOST, TCP_PORT))
        return cliente
    except:
        return None

def solicitar_datos():
    """Pide datos al servidor y los convierte a JSON"""
    cliente = conectar_servidor()
    if not cliente:
        return {}

    try:
        cliente.sendall(b"GET_DATA")
        respuesta = cliente.recv(1024).decode()
        cliente.close()
        return json.loads(respuesta)
    except:
        return {}


# -------- RUTAS --------

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        usuario = request.form.get("usuario")
        password = request.form.get("password")

        if usuario == APP_USER and check_password_hash(APP_PW_HASH, password):
            session["logged_in"] = True
            return redirect(url_for("dashboard"))
        else:
            return render_template("login.html", error="Credenciales incorrectas")

    return render_template("login.html")


@app.route("/dashboard")
def dashboard():
    if not is_logged_in():
        return redirect(url_for("login"))
    return render_template("index.html")


@app.route("/api/datos")
def api_datos():
    if not is_logged_in():
        return jsonify({})
    return jsonify(solicitar_datos())


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


# -------- MAIN --------

if __name__ == "__main__":
    app.run(debug=True)
