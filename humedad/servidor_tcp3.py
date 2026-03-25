import socket
import serial

SERIAL_PORT = "/dev/ttyACM0"
BAUDRATE = 9600

HOST = "0.0.0.0"
PORT = 5001

def main():
    ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)

    ultimo_dato = "0,Sin datos,0"

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen(5)

        while True:
            if ser.in_waiting:
                linea = ser.readline().decode().strip()
                if linea:
                    ultimo_dato = linea
                    print("Dato:", ultimo_dato)

            conn, addr = s.accept()
            with conn:
                conn.recv(1024)
                conn.sendall((ultimo_dato + "\n").encode())

if __name__ == "__main__":
    main()
