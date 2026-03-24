#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

// Motor (puente H)
#define IN1 5
#define IN2 4
#define ENA 3  // PWM

DHT dht(DHTPIN, DHTTYPE);

float humedad = 0;
int velocidad = 0;
String rango = "Fuera";

void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);

  // Dirección fija del motor
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
}

void loop() {

  //  Leer humedad
  float h = dht.readHumidity();

  if (!isnan(h)) {
    humedad = h;

    //  Determinar rango y velocidad
    if (humedad >= 30 && humedad < 40) {
      velocidad = 80;
      rango = "Baja";
    }
    else if (humedad >= 40 && humedad < 50) {
      velocidad = 150;
      rango = "Media";
    }
    else if (humedad >= 50 && humedad <= 70) {
      velocidad = 255;
      rango = "Alta";
    }
    else {
      velocidad = 0;
      rango = "Fuera";
    }

    //  Aplicar velocidad al motor
    analogWrite(ENA, velocidad);
  }

  //  Revisar si hay petición desde Python (socket)
  if (Serial.available()) {
    String comando = Serial.readStringUntil('\n');
    comando.trim();

    if (comando == "GET") {
      Serial.print(humedad);
      Serial.print(",");
      Serial.print(rango);
      Serial.print(",");
      Serial.println(velocidad);
    }
  }

  delay(2000);
}
