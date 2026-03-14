// Pines del motor
const int motorPin1 = 7;
const int motorPin2 = 8;
const int enablePin = 9;

// Pines del encoder
const int encoderPinA = 2;
const int encoderPinB = 3;

volatile long encoderCount = 0;
int lastEncoded = 0;

// CONFIGURACIÓN
float rpmDeseada = 0.0;
const unsigned long duracion = 60000; // 60 segundos

// PID
float Kp = 0.0015;
float Ki = 0.00025;
float Kd = 0.0009;
float pwm = 0.3;
float pwmMax = 1.0;
float pwmMin = 0.12;
float pwmSlewRate = 0.05;

// Filtro y variables PID
float rpmPrev = 0;
float alpha = 0.25;
float integral = 0;
float integralMax = 40;
float errorPrev = 0;

unsigned long startTime = 0;
unsigned long lastSampleTime = 0;
long lastPulseCount = 0;

bool esperandoEntrada = true;

void setup() {
  Serial.begin(9600);

  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  pinMode(enablePin, OUTPUT);
  pinMode(encoderPinA, INPUT);
  pinMode(encoderPinB, INPUT);

  attachInterrupt(digitalPinToInterrupt(encoderPinA), updateEncoder, CHANGE);
  attachInterrupt(digitalPinToInterrupt(encoderPinB), updateEncoder, CHANGE);

  encoderCount = 0;
  Serial.println("Ingresa la RPM deseada (ej. 30):");
}

void loop() {
  if (esperandoEntrada) {
    if (Serial.available()) {
      String entrada = Serial.readStringUntil('\n');
      entrada.trim();
      if (entrada == "STOP") {
        analogWrite(enablePin, 0);
        esperandoEntrada = true;
        encoderCount = 0;
        return;
      }
      rpmDeseada = entrada.toFloat();
      if (rpmDeseada > 0 && rpmDeseada <= 150) {
        esperandoEntrada = false;
        digitalWrite(motorPin1, LOW);
        digitalWrite(motorPin2, HIGH);
        startTime = millis();
        lastSampleTime = millis();
        encoderCount = 0;
        Serial.println("RPM_real,Referencia,Error,PWM");
      } else {
        Serial.println("Ingresa una RPM entre 1 y 150.");
      }
    }
    return;
  }

  unsigned long currentTime = millis();

  if (currentTime - lastSampleTime >= 100) {
    long currentPulses = encoderCount;
    long deltaPulses = currentPulses - lastPulseCount;
    float deltaTime = (currentTime - lastSampleTime) / 1000.0;

    float rpmActual = ((float)deltaPulses / 2000.0) / deltaTime * 60.0;
    rpmActual = alpha * rpmActual + (1 - alpha) * rpmPrev;
    rpmPrev = rpmActual;

    float error = rpmDeseada - rpmActual;
    if (abs(error) < 0.8) error = 0;

    integral += error * deltaTime;
    integral = constrain(integral, -integralMax, integralMax);
    float derivative = (error - errorPrev) / deltaTime;

    float control = Kp * error + Ki * integral + Kd * derivative;
    float pwmTarget = pwm + control;
    pwmTarget = constrain(pwmTarget, pwmMin, pwmMax);

    float pwmDelta = pwmTarget - pwm;
    if (abs(pwmDelta) > pwmSlewRate) {
      pwm += pwmSlewRate * (pwmDelta > 0 ? 1 : -1);
    } else {
      pwm = pwmTarget;
    }

    analogWrite(enablePin, pwm * 255);

    Serial.print(rpmActual); Serial.print(",");
    Serial.print(rpmDeseada); Serial.print(",");
    Serial.print(error); Serial.print(",");
    Serial.println(pwm * 255);

    lastPulseCount = currentPulses;
    lastSampleTime = currentTime;
    errorPrev = error;
  }

  if ((millis() - startTime >= duracion) && !esperandoEntrada) {
    analogWrite(enablePin, 0);
    esperandoEntrada = true;
    encoderCount = 0;
  }
}

void updateEncoder() {
  int MSB = digitalRead(encoderPinA);
  int LSB = digitalRead(encoderPinB);
  int encoded = (MSB << 1) | LSB;
  int sum = (lastEncoded << 2) | encoded;

  if (sum == 0b1101 || sum == 0b0100 || sum == 0b0010 || sum == 0b1011) encoderCount++;
  if (sum == 0b1110 || sum == 0b0111 || sum == 0b0001 || sum == 0b1000) encoderCount--;

  lastEncoded = encoded;
}
