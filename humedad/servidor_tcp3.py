import socket
import serial
import time

HOST = "0.0.0.0"
PORT = 5001
SERIAL_PORT = "/dev/ttyACM0"
BAUDRATE = 9600

arduino = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=2)
time.sleep(2)

# -------- FUNCIONES --------

def leer_desde_arduino():
    """Envía solicitud al Arduino y obtiene respuesta"""
    try:
        arduino.write(b"GET_DATA\n")
        respuesta = arduino.readline().decode().strip()
        return respuesta if respuesta else "{}"
    except Exception as e:
        print("Error al leer Arduino:", e)
        return "{}"

def procesar_peticion(mensaje):
    """Decide qué hacer según el mensaje recibido"""
    if mensaje.strip() == "GET_DATA":
        return leer_desde_arduino()
    return "Comando no reconocido"

# -------- SERVIDOR --------

def ejecutar_servidor():
    servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    servidor.bind((HOST, PORT))
    servidor.listen()

    print(f"Servidor activo en {HOST}:{PORT}")

    while True:
        cliente, direccion = servidor.accept()
        print("Cliente conectado:", direccion)

        try:
            datos = cliente.recv(1024).decode()
            respuesta = procesar_peticion(datos)
            cliente.sendall(respuesta.encode())
        except Exception as e:
            print("Error en conexión:", e)
            cliente.sendall(b"Error interno")
        finally:
            cliente.close()

# -------- MAIN --------

if __name__ == "__main__":
    ejecutar_servidor()
