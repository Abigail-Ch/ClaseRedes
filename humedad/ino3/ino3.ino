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
 
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}
 
void loop() {
  float h = dht.readHumidity();
 
  if (isnan(h)) {
    Serial.println("0,Error,0");
    delay(2000);
    return;
  }
 
  humedad = h;
 
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
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
  }
 
  analogWrite(ENA, pwm);
 
  Serial.print(humedad, 1);
  Serial.print(",");
  Serial.print(rango);
  Serial.print(",");
  Serial.println(pwm);
 
  delay(2000);
}
