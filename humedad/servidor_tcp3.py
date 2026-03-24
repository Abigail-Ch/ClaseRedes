import socket
import serial

# --- CONFIGURACIÓN ---
SERIAL_PORT = "/dev/ttyACM0"   # o COM3 en Windows
BAUDRATE    = 9600

HOST = "0.0.0.0"
PORT = 5001
# ----------------------

def main():
    ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)
    ser.reset_input_buffer()

    print(f"Conectado a Arduino en {SERIAL_PORT} a {BAUDRATE} baudios")
    print(f"Servidor escuchando en {HOST}:{PORT}...")

    ultimo_dato = "0,Fuera,0"  # valor inicial

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind((HOST, PORT))
        s.listen(5)

        while True:
            # 🔹 Leer siempre del Arduino
            linea = ser.readline().decode("utf-8", errors="ignore").strip()

            if linea:
                partes = linea.split(",")

                if len(partes) == 3:
                    ultimo_dato = linea  # guardar último dato válido

            # 🔹 Esperar cliente web
            conn, addr = s.accept()
            with conn:
                conn.recv(1024)  # no importa lo que mande el cliente

                # 🔹 Enviar último dato leído
                conn.sendall((ultimo_dato + "\n").encode("utf-8"))

if __name__ == "__main__":
    main()
