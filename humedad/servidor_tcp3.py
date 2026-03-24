import socket
import serial

SERIAL_PORT = "/dev/ttyACM0" 
BAUDRATE = 9600

HOST = "0.0.0.0"
PORT = 5001

def main():
    ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)

    print("Conectado a Arduino...")
    print("Servidor TCP escuchando...")

    ultimo_dato = "0,Sin datos,0"

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen(5)

        while True:
            # 🔥 LEER SIEMPRE DEL ARDUINO
            if ser.in_waiting:
                linea = ser.readline().decode(errors="ignore").strip()

                if linea:
                    partes = linea.split(",")
                    if len(partes) == 3:
                        ultimo_dato = linea
                        print("Dato recibido:", ultimo_dato)

            # 🔥 ATENDER WEB
            try:
                s.settimeout(0.1)
                conn, addr = s.accept()
            except:
                continue

            with conn:
                conn.recv(1024)  # no importa lo que mande
                conn.sendall((ultimo_dato + "\n").encode())


if __name__ == "__main__":
    main()
