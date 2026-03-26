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
