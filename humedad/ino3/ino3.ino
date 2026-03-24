#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11

// Motor (puente H)
#define IN1 5
#define IN2 4
#define ENA 3  // PWM

DHT dht(DHTPIN, DHTTYPE);

float humedad = 0;
int pwm = 0;
String rango = "Fuera";

void setup() {
   Serial.begin(9600);
   dht.begin();

   pinMode(IN1, OUTPUT);
   pinMode(IN2, OUTPUT);
   pinMode(ENA, OUTPUT);
}

void loop() {

   float h = dht.readHumidity();
   if (isnan(h)) return;

   humedad = h;

   // 🔥 CONTROL POR RANGOS
   if (humedad >= 30 && humedad < 40) {

      digitalWrite(IN1, HIGH);
      digitalWrite(IN2, LOW);

      pwm = 120;
      rango = "Baja";
   }
   else if (humedad >= 40 && humedad < 50) {

      digitalWrite(IN1, HIGH);
      digitalWrite(IN2, LOW);

      pwm = 180;
      rango = "Media";
   }
   else if (humedad >= 50 && humedad <= 70) {

      digitalWrite(IN1, HIGH);
      digitalWrite(IN2, LOW);

      pwm = 255;
      rango = "Alta";
   }
   else {

      pwm = 0;
      rango = "Fuera";

      // 🔴 FRENO DEL MOTOR
      digitalWrite(IN1, LOW);
      digitalWrite(IN2, LOW);
   }

   // Aplicar PWM
   analogWrite(ENA, pwm);

   // 🔥 ENVÍO CONTINUO (CLAVE)
   Serial.print(humedad);
   Serial.print(",");
   Serial.print(rango);
   Serial.print(",");
   Serial.println(pwm);

   delay(2000); // cada 2 segundos
}
