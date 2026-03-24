import socket
import serial

SERIAL_PORT = "/dev/ttyACM0" 
BAUDRATE = 9600

HOST = "0.0.0.0"
PORT = 5001

def main():
    ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)

    print("Servidor listo...")

    ultimo_dato = "0,Error,0"

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()

        while True:
            # 🔥 LEER SIEMPRE DEL ARDUINO
            linea = ser.readline().decode().strip()

            if linea:
                partes = linea.split(",")
                if len(partes) == 3:
                    ultimo_dato = linea

            # 🔥 CLIENTE WEB
            conn, addr = s.accept()
            with conn:
                conn.recv(1024)
                conn.sendall((ultimo_dato + "\n").encode())

if __name__ == "__main__":
    main()
