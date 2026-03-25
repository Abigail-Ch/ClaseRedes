#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

// Motor (puente H)
const int IN1 = 5;
const int IN2 = 4;
const int ENA = 3;

float humedad = 0.0;
String rango = "";
String velocidad = "";
String estado = "";
int pwmValue = 0;

String buffer = "";

// 🔧 Control por humedad
void actualizarControl(float hum) {
  if (hum >= 30 && hum < 40) {
    rango = "Baja";
    velocidad = "Media";
    estado = "Humedad baja";
    pwmValue = 120;
  }
  else if (hum >= 40 && hum < 50) {
    rango = "Media";
    velocidad = "Alta";
    estado = "Humedad media";
    pwmValue = 180;
  }
  else if (hum >= 50 && hum <= 70) {
    rango = "Alta";
    velocidad = "Maxima";
    estado = "Humedad alta";
    pwmValue = 255;
  }
  else {
    rango = "Fuera";
    velocidad = "Apagado";
    estado = "Fuera de rango";
    pwmValue = 0;
  }

  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, pwmValue);
}

// 📡 JSON limpio (CLAVE)
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

  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(ENA, OUTPUT);

  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}

void loop() {
  float h = dht.readHumidity();

  if (!isnan(h)) {
    humedad = h;
    actualizarControl(humedad);
  }

  // 🔥 RESPUESTA A GET_DATA (IMPORTANTE)
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

  delay(200);
}
