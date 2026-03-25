import socket
import serial
import threading
import time
 
SERIAL_PORT = "/dev/ttyACM0"   # en Windows sería algo como COM9
BAUDRATE = 9600
 
HOST = "0.0.0.0"
PORT = 5001
 
ultimo_dato = "0,Sin datos,0"
lock = threading.Lock()
 
 
def leer_serial():
    global ultimo_dato
 
    try:
        ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)
        time.sleep(2)
        ser.reset_input_buffer()
 
        print("Conectado a Arduino en", SERIAL_PORT)
 
        while True:
            try:
                linea = ser.readline().decode(errors="ignore").strip()
 
                if linea:
                    partes = linea.split(",")
 
                    if len(partes) == 3:
                        with lock:
                            ultimo_dato = f"{partes[0].strip()},{partes[1].strip()},{partes[2].strip()}"
 
                        print("Dato recibido:", ultimo_dato)
 
            except Exception as e:
                print("ERROR leyendo serial:", e)
                time.sleep(1)
 
    except Exception as e:
        print("No se pudo abrir el puerto serial:", e)
 
 
def main():
    hilo_serial = threading.Thread(target=leer_serial, daemon=True)
    hilo_serial.start()
 
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((HOST, PORT))
        s.listen(5)
 
        print(f"Servidor TCP escuchando en {HOST}:{PORT}")
 
        while True:
            conn, addr = s.accept()
 
            with conn:
                try:
                    conn.recv(1024)
 
                    with lock:
                        dato = ultimo_dato
 
                    conn.sendall((dato + "\n").encode())
                    print("Enviado a web:", dato, "->", addr)
 
                except Exception as e:
                    print("ERROR conexión TCP:", e)
 
 
if __name__ == "__main__":
    main()
