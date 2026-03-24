import socket
import serial

SERIAL_PORT = "/dev/ttyACM0"   # ⚠️ cambia a COM3 si estás en Windows
BAUDRATE = 9600

HOST = "0.0.0.0"
PORT = 5001

def main():
    ser = serial.Serial(SERIAL_PORT, BAUDRATE, timeout=1)

    print("Servidor TCP listo...")

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()

        while True:
            conn, addr = s.accept()
            with conn:
                conn.recv(1024)

                # 🔥 Pedir datos al Arduino
                ser.write(b"GET\n")

                data = ser.readline().decode().strip()

                if not data:
                    data = "0,Error,0"

                conn.sendall((data + "\n").encode())

if __name__ == "__main__":
    main()
