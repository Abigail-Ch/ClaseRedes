#include <DHT.h>

#define DHTPIN 7
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// Puente H
const int ENA = 3;
const int IN1 = 2;
const int IN2 = 4;

float humedad = 0.0;
String rango = "";
String velocidad = "";
String estado = "";
int pwmValue = 0;

String buffer = "";

void actualizarControl(float hum) {
  if (hum < 40.0) {
    rango = "Baja";
    velocidad = "Lenta";
    estado = "Humedad baja";
    pwmValue = 90;
  }
  else if (hum >= 40.0 && hum < 60.0) {
    rango = "Media";
    velocidad = "Media";
    estado = "Humedad normal";
    pwmValue = 170;
  }
  else {
    rango = "Alta";
    velocidad = "Alta";
    estado = "Humedad alta";
    pwmValue = 255;
  }

  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, pwmValue);
}

String crearRespuesta() {
  String respuesta = "{";
  respuesta += "\"humedad\":" + String(humedad, 1) + ",";
  respuesta += "\"rango\":\"" + rango + "\",";
  respuesta += "\"velocidad\":\"" + velocidad + "\",";
  respuesta += "\"estado\":\"" + estado + "\",";
  respuesta += "\"pwm\":" + String(pwmValue);
  respuesta += "}";
  return respuesta;
}

void setup() {
  Serial.begin(9600);
  dht.begin();

  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);

  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}

void loop() {
  float h = dht.readHumidity();

  if (!isnan(h)) {
    humedad = h;
    actualizarControl(humedad);
  }

  while (Serial.available()) {
    char c = Serial.read();

    if (c == '\n') {
      buffer.trim();

      if (buffer == "GET_DATA") {
        Serial.println(crearRespuesta());
      }

      buffer = "";
    } else {
      buffer += c;
    }
  }

  delay(500);
}
}
