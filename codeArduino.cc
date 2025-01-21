// *************************************** IMPORTATION ********************************************** //
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>
//********************************** DEFINITION DES PINS POUR LES CAPTEURS ***************************//
//******************** RELAIS *************************************//
#define RELAIS_REGULATEUR 5
#define RELAIS_BATTERIE_1 18
#define RELAIS_BATTERIE_2 19
#define RELAIS_BATTERIE_3 23
//******************** COURANT ************************************//
#define ACS712_BAT1 36
#define ACS712_BAT2 39
#define ACS712_BAT3 25
#define ACS712_GLOBAL 26
//******************** TEMPERATURE ********************************//
#define LM35_BAT1 34
#define LM35_BAT2 35
#define LM35_BAT3 32
//******************** DIVISEUR DE TENSION ************************//
#define DIV_TENSION_BAT1 15
#define DIV_TENSION_BAT2 27
#define DIV_TENSION_BAT3 14
#define DIV_TENSION_GLOBAL 12
//******************** LED ***************************************//
#define LED_PIN 4
//******************** MODULE GSM ********************************//
#define RXD2 16  
#define TXD2 17

#define DDT 1.5
#define NUM_SAMPLES 10
//*********************Initialisation du LCD I2C*******************//
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Configuration du module GSM
const String phoneNumber = "+261340585428";
const String message = "Bienvenue sur le systeme de monitoring des batteries. Le dispositif est connecte au Wi-Fi et au GSM.";  
// Configuration du WiFi
// const char* ssid = "Admin_Réseau_RaBimble"; 
// const char* password = "11AV19DI98K"; 

const char* ssid = "Airtel_4G_SMARTBOX_2538"; 
const char* password = "C707680D"; 

//Configuration MQTT
const char* mqtt_server = "192.168.1.116"; // Adresse IP du broker MQTT
const int mqtt_port = 1883;
const char* mqtt_topic_batteries = "batteries";
const char* mqtt_topic_batteriesGlobal = "batteriesGlobal";
const char* mqtt_topic_alerts = "alerts";

const char* mqtt_topic_NombreBatteries = "nombreBat";

WiFiClient espClient;
PubSubClient client(espClient);


// Constantes pour les calculs des capteurs
const float ACS712_SENSITIVITY = 0.100; 
const float DIVISEUR_TENSION_RATIO = 0.1; 

// Capacités nominales des batteries (en Ah)
const float capaciteNominaleBat1 = 100.0;
const float capaciteNominaleBat2 = 100.0;
const float capaciteNominaleBat3 = 100.0;

// Variables pour stocker les mesures
float courantBat1, courantBat2, courantBat3;
float tensionBat1, tensionBat2, tensionBat3;
float temperatureBat1, temperatureBat2, temperatureBat3;
float socBat1, socBat2, socBat3; 
float sohBat1, sohBat2, sohBat3; 
float capaciteReelleBat1 = 100.0; 
float capaciteReelleBat2 = 100.0;
float capaciteReelleBat3 = 100.0;

float dodBat1, dodBat2, dodBat3; 
unsigned long dernierTempsMesure = 0;
const unsigned long TEMPS_STABILISATION = 2000; 
// Variables pour les mesures globales
float courantGlobal, tensionGlobal;

// Variables pour suivre l'état du GSM
bool gsmReady = false;
int nombreBatteriesConnectees = 0; 

const float seuilDechargeProfonde = 20.0;  // SoC de 20% comme seuil critique
const float seuilTemperatureMax = 45.0;    // Température de 45°C comme seuil critique

// Variables pour stocker l'état des alertes
bool alerteBatterie1 = false;
bool alerteBatterie2 = false;
bool alerteBatterie3 = false;
// Tension d'alimentation de l'ESP32
const float referenceVoltage = 3.3; 
const float R1 = 4000.0;   // Résistance R1 en ohms
const float R2 = 1000.0;   // Résistance R2 en ohms
const float ADC_MAX = 4095.0;
const float VREF = 3.3; 
// =========================== SETUP ===================================
void setup() {
  // Initialiser le port série et la communication série avec le GSM
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);  // Communication série avec SIM900

  // Initialisation des pins relais
  pinMode(RELAIS_REGULATEUR, OUTPUT);
  pinMode(RELAIS_BATTERIE_1, OUTPUT);
  pinMode(RELAIS_BATTERIE_2, OUTPUT);
  pinMode(RELAIS_BATTERIE_3, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  // Éteindre la LED au départ
  digitalWrite(LED_PIN, LOW);  

  // Initialisation de l'écran LCD
  lcd.init();
  lcd.backlight();

  lcd.clear();
  lcd.setCursor(0, 0);
  scrollText("Bienvenu sur Monitoring des Batteries", 0, 300); // Scroller le message
  //lcd.setCursor(0, 1);
  // lcd.print("des Batteries ....");
  // Initialisation du SoC Suppose la batterie à 100% au départ
  socBat1 = 100; 
  socBat2 = 100;
  socBat3 = 100;

    // Connexion au WiFi
  connectToWiFi();
  // Vérification du GSM au démarrage
    

  // if (WiFi.status() == WL_CONNECTED) {
  //   while (!gsmReady) {
  //     if (checkGSM()) {
  //       digitalWrite(LED_PIN, HIGH);
  //       lcd.clear();
  //       lcd.setCursor(0, 0);
  //       lcd.print("GSM Connécté");
  //       delay(1000);
  //       // Envoyer un SMS pour tester le GSM
  //       sendSMS(phoneNumber, message);  
  //       // Le GSM est prêt
  //       gsmReady = true;  
  //     } else {
  //       // Clignoter la LED rapidement si le GSM n'est pas prêt
  //       blinkLED(200);  
  //       lcd.clear();
  //       lcd.setCursor(0, 0);
  //       lcd.print("GSM non Connécté");
  //     }
  //   }
  // } else {
  //   // Si le WiFi n'est pas connecté, la LED est éteinte
  //   digitalWrite(LED_PIN, LOW);
  //   lcd.clear();
  //   lcd.setCursor(0, 0);
  //   lcd.print("WiFi NOK");
  // }
  

    if (WiFi.status() == WL_CONNECTED) {
    digitalWrite(LED_PIN, HIGH);
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("WiFi Connecte");
        delay(1000);
  } else {
    // Si le WiFi n'est pas connecté, la LED est éteinte
    digitalWrite(LED_PIN, LOW);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi NOK");
  }

  // Configuration du serveur MQTT
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);  // Définir la fonction de callback pour les messages reçus
  reconnectMQTT();

}

// === LOOP ===
void loop() {

  if (WiFi.status() == WL_CONNECTED) {

    if (!client.connected()) {
      reconnectMQTT();
    }
   
    if( 0 < nombreBatteriesConnectees &&  nombreBatteriesConnectees <= 3){
      Serial.print("ok");
      Serial.println("Nombre de batt ");
      Serial.println(nombreBatteriesConnectees);
      mettreAJourSoC();

      // Lire les mesures globales
      courantGlobal = lireACS712(26 , 1.65);
      tensionGlobal = lireTensionDiviseur(DIV_TENSION_GLOBAL);
      publierDonneesMQTTGlobal( tensionGlobal ,courantGlobal );

      // Mesurer les tensions, courants et températures des batteries
      mesurerBatteries();

      // Vérifier les conditions d'alerte pour chaque batterie
      verifierAlerteBatterie(1, socBat1, temperatureBat1, RELAIS_BATTERIE_1);
      verifierAlerteBatterie(2, socBat2, temperatureBat2, RELAIS_BATTERIE_2);
      verifierAlerteBatterie(3, socBat3, temperatureBat3, RELAIS_BATTERIE_3);

      // Afficher les valeurs sur le moniteur série et le LCD
      afficherSurMoniteurSerie();
      afficherSurLCD();
    }else{
      Serial.println("En attente du nombre des batteries connectées...");
      scrollTextNonBlocking("EN ATTENTE DU NOMBRE DES BATTERIES CONNECTEES", 0, 300); 
    }
    client.loop();
  }
  delay(500);
}

unsigned long previousMillis = 0;
int scrollIndex = 0;
bool isScrolling = false;

void scrollTextNonBlocking(String message, int row, int delayTime) {
    static String scrollingMessage;
    static int messageLength;
    static int displayWidth = 16; // Largeur typique du LCD

    if (!isScrolling) {
        // Initialisation du défilement
        scrollingMessage = message;
        messageLength = message.length();
        scrollIndex = 0;
        isScrolling = true;
    }

    unsigned long currentMillis = millis();
    if (currentMillis - previousMillis >= delayTime) {
        previousMillis = currentMillis;

        if (scrollIndex <= messageLength - displayWidth) {
            lcd.setCursor(0, row);
            lcd.print(scrollingMessage.substring(scrollIndex, scrollIndex + displayWidth));
            scrollIndex++;
        } else {
            // Fin du défilement
            isScrolling = false;
        }
    }
}


void scrollText(String message, int row, int delayTime) {
    int messageLength = message.length();
    int displayWidth = 16; // Largeur typique de l'écran LCD

    if (messageLength <= displayWidth) {
        // Si le message tient entièrement sur l'écran, l'affiche simplement
        lcd.setCursor(0, row);
        lcd.print(message);
        delay(delayTime);
    } else {
        // Fait défiler le message si sa longueur dépasse la largeur de l'écran
        for (int i = 0; i <= messageLength - displayWidth; i++) { 
            lcd.setCursor(0, row);
            lcd.print(message.substring(i, i + displayWidth)); // Affiche une portion de 16 caractères
            delay(delayTime);
        }
    }
}

void connectToWiFi() {
  lcd.setCursor(0, 0);
  lcd.print("Connexion WiFi");
  
  WiFi.begin(ssid, password);
  
  // Attendre la connexion au WiFi
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    lcd.setCursor(0, 1);
    lcd.print("Connexion...");
  }
  
  // Si connecté
  Serial.println("\nConnecté au WiFi");
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("WiFi Connecte");
  lcd.setCursor(0, 1);
  lcd.print(WiFi.localIP());
  delay(1000);
}

// Fonction appelée lorsque le client MQTT reçoit un message sur un topic abonné
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message reçu sur le topic: ");
  Serial.println(topic);

  // Convertir le payload en chaîne de caractères
  String message = "";
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  
  Serial.print("Contenu du message: ");
  Serial.println(message);

  // Vous pouvez traiter le message ici en fonction de vos besoins
  if (String(topic) == mqtt_topic_NombreBatteries) {
    int nombreBatteries = message.toInt(); // Convertir le message en entier
    Serial.print("Nombre de batteries reçues : ");
    Serial.println(nombreBatteries);

    // Vous pouvez utiliser cette valeur pour mettre à jour une variable globale ou activer une logique spécifique
    nombreBatteriesConnectees = nombreBatteries; // Exemple d'utilisation
  }
}


// Initialisation MQTT
void reconnectMQTT() {
  while (!client.connected()) {
    Serial.println("Connexion au broker MQTT...");
    if (client.connect("")) {
      Serial.println("Connecté au broker MQTT");
      // S'abonner au topic
      if (client.subscribe(mqtt_topic_NombreBatteries)) {
        Serial.println("Abonné au topic: nombreBat");
      } else {
        Serial.println("Échec de l'abonnement au topic: nombreBat");
      }

    } else {
      Serial.print("Échec de connexion, code erreur : ");
      Serial.println(client.state());
      delay(2000);
    }
  }
}

// Publication MQTT des données complètes
void publierDonneesMQTT(int numeroBatterie, float tension, float courant, float temperature, float soc, float soh) {
  String message = "{\"batterie\": " + String(numeroBatterie) +
                   ", \"tension\": " + String(tension) +
                   ", \"courant\": " + String(courant) +
                   ", \"temperature\": " + String(temperature) +
                   ", \"soc\": " + String(soc) +
                   ", \"soh\": " + String(soh) + "}";
  if (client.publish(mqtt_topic_batteries, message.c_str())) {
    Serial.println("Données MQTT publiées : " + message);
  } else {
    Serial.println("Échec de publication MQTT");
  }
}

// Publication MQTT des données complètes
void publierDonneesMQTTGlobal(float tension, float courant) {
  String message = "{\"Global\": true, \"tension\": " + String(tension) + ", \"courant\": " + String(courant) + "}";
  if (client.publish(mqtt_topic_batteriesGlobal, message.c_str())) {
    Serial.println("Données MQTT publiées : " + message);
  } else {
    Serial.println("Échec de publication MQTT");
  }
}

// Publication des alertes
void publierAlerteMQTT(int numeroBatterie, const String& typeAlerte, float valeur) {
  String message = "{\"batterie\": " + String(numeroBatterie) +
                   ", \"type\": \"" + typeAlerte +
                   "\", \"valeur\": " + String(valeur) + "}";
  if (client.publish(mqtt_topic_alerts, message.c_str())) {
    Serial.println("Alerte MQTT envoyée : " + message);
  } else {
    Serial.println("Échec de l'envoi de l'alerte MQTT");
  }
}

// === Affichage sur LCD ===
void afficherSurLCD() {
  // Tableaux pour les données des batteries
  float *tensions[] = {&tensionBat1, &tensionBat2, &tensionBat3};
  float *courants[] = {&courantBat1, &courantBat2, &courantBat3};
  float *temperatures[] = {&temperatureBat1, &temperatureBat2, &temperatureBat3};

  // Affichage des données de chaque batterie
  for (int i = 0; i < nombreBatteriesConnectees; i++) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("B");
    lcd.print(i + 1);
    lcd.print(": ");
    lcd.print(*tensions[i], 1);
    lcd.print("V ");
    lcd.setCursor(0, 1);
    lcd.print(*courants[i], 1);
    lcd.print("A ");
    lcd.print(*temperatures[i], 1);
    lcd.print("C");
    delay(2000);
  }

  // Affichage des valeurs globales
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Tension T: ");
  lcd.print(tensionGlobal, 1);
  lcd.print("V ");
  lcd.setCursor(0, 1);
  lcd.print("Courant T: ");
  lcd.print(courantGlobal, 1);
  lcd.print("A");
  delay(2000);
}

// === Fonction pour vérifier et gérer les alertes de batterie ===
void verifierAlerteBatterie(int numBatterie, float soc, float temperature, int relaisBatterie) {
  String messageAlerte = "";
  
  // Vérification du SoC (profondeur de décharge)
  if (soc < seuilDechargeProfonde) {
    messageAlerte = "Alerte: Batterie " + String(numBatterie) + " SoC trop bas: " + String(soc) + "%";
    publierAlerteMQTT(numBatterie , " SoC trop bas" , soc );
    envoyerAlerteEtIsolerBatterie(numBatterie, messageAlerte, relaisBatterie);
  }
  
  // Vérification de la température
  if (temperature > seuilTemperatureMax) {
    messageAlerte = "Alerte: Batterie " + String(numBatterie) + " Temperature elevee: " + String(temperature) + " C";
    publierAlerteMQTT(numBatterie , " Temperature elevee" , temperature );
    envoyerAlerteEtIsolerBatterie(numBatterie, messageAlerte, relaisBatterie);
  }
}

// === Fonction d'envoi d'alerte et d'isolement ===
void envoyerAlerteEtIsolerBatterie(int numBatterie, String messageAlerte, int relaisBatterie) {
  // Isoler la batterie en activant son relais
  digitalWrite(relaisBatterie, LOW);
  
  // Message SMS avec action
  String message = messageAlerte + ". Action: Batterie " + String(numBatterie) + " isolee.";
  
  // Envoi du SMS
  sendSMS(phoneNumber, message);
  
  // Indiquer l'alerte sur le moniteur série
  Serial.println(message);
  
  // Afficher l'alerte sur le LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Alerte B" + String(numBatterie));
  lcd.setCursor(0, 1);
  lcd.print(messageAlerte);
  delay(3000); // Afficher l'alerte pendant 3 secondes
}

void mesurerBatteries() {
  int relais[] = {RELAIS_BATTERIE_1, RELAIS_BATTERIE_2, RELAIS_BATTERIE_3};
  int acs[] = {ACS712_BAT1, ACS712_BAT2, ACS712_BAT3};
  int divTension[] = {DIV_TENSION_BAT1, DIV_TENSION_BAT2, DIV_TENSION_BAT3};
  int lm35[] = {LM35_BAT1, LM35_BAT2, LM35_BAT3};
  float *tension[] = {&tensionBat1, &tensionBat2, &tensionBat3};
  float *courant[] = {&courantBat1, &courantBat2, &courantBat3};
  float *temperature[] = {&temperatureBat1, &temperatureBat2, &temperatureBat3};
  float *capaciteReelle[] = {&capaciteReelleBat1, &capaciteReelleBat2, &capaciteReelleBat3};
  float *soh[] = {&sohBat1, &sohBat2, &sohBat3};
  float *soc[] = {&socBat1, &socBat2, &socBat3};
  const float* capaciteNominale[] = {&capaciteNominaleBat1, &capaciteNominaleBat2, &capaciteNominaleBat3};

  float calibration[] = {2.54692, 2.52000, 2.56505};
    unsigned long tempsActuel = millis();
  float deltaTime = (tempsActuel - dernierTempsMesure) / 1000.0; // Temps écoulé en secondes

  // Tableaux temporaires pour les données
  float tensionsTemp[nombreBatteriesConnectees];
  float courantsTemp[nombreBatteriesConnectees];
  float temperaturesTemp[nombreBatteriesConnectees];
  float socsTemp[nombreBatteriesConnectees];
  float sohsTemp[nombreBatteriesConnectees];

  for (int i = 0; i < nombreBatteriesConnectees; i++) {
    digitalWrite(relais[i], HIGH);
    delay(TEMPS_STABILISATION);
    
    *courant[i] = lireACS712(acs[i], calibration[i]);
    *tension[i] = lireTensionDiviseur(divTension[i]);
    *temperature[i] = lireLM35(lm35[i]);
    *capaciteReelle[i] = *soc[i] * *capaciteNominale[i] / 100.0;
      *soc[i] = calculerSoC(*soc[i], *courant[i], *capaciteNominale[i], deltaTime);
    *soh[i] = calculerSOH(*capaciteReelle[i], *capaciteNominale[i]);

    // Remplissage des tableaux temporaires
    tensionsTemp[i] = *tension[i];
    courantsTemp[i] = *courant[i];
    temperaturesTemp[i] = *temperature[i];
    socsTemp[i] = *soc[i];
    sohsTemp[i] = *soh[i];

    digitalWrite(relais[i], LOW);
  }

  // Publication des données complètes via MQTT
  publierDonneesMQTTComplet(nombreBatteriesConnectees, tensionsTemp, courantsTemp, temperaturesTemp, socsTemp, sohsTemp);
}


// // === Mesure des batteries ===
// void mesurerBatteries() {
//   // Tableau pour les relais et les variables de chaque batterie
//   int relais[] = {RELAIS_BATTERIE_1, RELAIS_BATTERIE_2, RELAIS_BATTERIE_3};
//   int acs[] = {ACS712_BAT1, ACS712_BAT2, ACS712_BAT3};
//   int divTension[] = {DIV_TENSION_BAT1, DIV_TENSION_BAT2, DIV_TENSION_BAT3};
//   int lm35[] = {LM35_BAT1, LM35_BAT2, LM35_BAT3};
//   float *tension[] = {&tensionBat1, &tensionBat2, &tensionBat3};
//   float *courant[] = {&courantBat1, &courantBat2, &courantBat3};
//   float *temperature[] = {&temperatureBat1, &temperatureBat2, &temperatureBat3};
//   float *capaciteReelle[] = {&capaciteReelleBat1, &capaciteReelleBat2, &capaciteReelleBat3};
//   float *soh[] = {&sohBat1, &sohBat2, &sohBat3};
//   float *soc[] = {&socBat1, &socBat2, &socBat3};
//   const float* capaciteNominale[] = {&capaciteNominaleBat1, &capaciteNominaleBat2, &capaciteNominaleBat3};

//   float calibration[] = {2.54692, 2.52000, 2.56505};

//   for (int i = 0; i < nombreBatteriesConnectees; i++) {
//     digitalWrite(relais[i], HIGH);
//     delay(TEMPS_STABILISATION);
    
//     *courant[i] = lireACS712(acs[i], calibration[i]);
//     *tension[i] = lireTensionDiviseur(divTension[i]);
//     *temperature[i] = lireLM35(lm35[i]);
//     *capaciteReelle[i] = *soc[i] * *capaciteNominale[i] / 100.0;
//     *soh[i] = calculerSOH(*capaciteReelle[i], *capaciteNominale[i]);

//     // Publication des données via MQTT
//     // publierDonneesMQTT(i + 1, *tension[i], *courant[i], *temperature[i], *soc[i], *soh[i]);
    
//     digitalWrite(relais[i], LOW);
//   }
//    publierDonneesMQTTComplet(nombreBatteriesConnectees, tension, courant, temperature, soc, soh);
// }

// void mesurerBatteries() {
//   // Tableaux pour stocker les données
//   float tensions[nombreBatteriesConnectees];
//   float courants[nombreBatteriesConnectees];
//   float temperatures[nombreBatteriesConnectees];
//   float socs[nombreBatteriesConnectees];
//   float sohs[nombreBatteriesConnectees];

//   // Tableau pour les relais et les variables de chaque batterie
//   int relais[] = {RELAIS_BATTERIE_1, RELAIS_BATTERIE_2, RELAIS_BATTERIE_3};
//   int acs[] = {ACS712_BAT1, ACS712_BAT2, ACS712_BAT3};
//   int divTension[] = {DIV_TENSION_BAT1, DIV_TENSION_BAT2, DIV_TENSION_BAT3};
//   int lm35[] = {LM35_BAT1, LM35_BAT2, LM35_BAT3};

//   float calibration[] = {2.54692, 2.52000, 2.56505};

//   for (int i = 0; i < nombreBatteriesConnectees; i++) {
//     digitalWrite(relais[i], HIGH);
//     delay(TEMPS_STABILISATION);
    
//     // courants[i] = lireACS712(acs[i], calibration[i]);
//     // tensions[i] = lireTensionDiviseur(divTension[i]);
//     // temperatures[i] = lireLM35(lm35[i]);
//     // socs[i] = calculerSOC(tensions[i]);  // Implémenter votre calcul SOC
//     // sohs[i] = calculerSOH(socs[i], capaciteNominale[i]); // Implémenter votre calcul SOH

//     *courant[i] = lireACS712(acs[i], calibration[i]);
//     *tension[i] = lireTensionDiviseur(divTension[i]);
//     *temperature[i] = lireLM35(lm35[i]);
//     *capaciteReelle[i] = *soc[i] * *capaciteNominale[i] / 100.0;
//     *soh[i] = calculerSOH(*capaciteReelle[i], *capaciteNominale[i]);

//     digitalWrite(relais[i], LOW);
//   }

//   // Publication des données via MQTT
//   publierDonneesMQTTComplet(nombreBatteriesConnectees, tensions, courants, temperatures, socs, sohs);
// }
// Publication MQTT des données complètes
void publierDonneesMQTTComplet(int nombreBatteries, float tensions[], float courants[], float temperatures[], float socs[], float sohs[]) {
  String message = "[";
  for (int i = 0; i < nombreBatteries; i++) {
    message += "{";
    message += "\"batterie\": " + String(i + 1) +
               ", \"tension\": " + String(tensions[i], 2) +
               ", \"courant\": " + String(courants[i], 2) +
               ", \"temperature\": " + String(temperatures[i], 2) +
               ", \"soc\": " + String(socs[i], 2) +
               ", \"soh\": " + String(sohs[i], 2) +
               "}";
    if (i < nombreBatteries - 1) {
      message += ", ";
    }
  }
  message += "]";

  if (client.publish(mqtt_topic_batteries, message.c_str())) {
    Serial.println("Données MQTT publiées : " + message);
  } else {
    Serial.println("Échec de publication MQTT");
  }
}




// === Gestion des capteurs ===
float lireACS712(int pin , float vcc_mid) {

  int sensorValue = 0;

  for (int i = 0; i < NUM_SAMPLES; i++) {
    sensorValue += analogRead(pin);
    delay(10); 
  }

  sensorValue /= NUM_SAMPLES;
  float voltage = sensorValue * (referenceVoltage / 4095.0); 
  float voltage_out = (voltage + 1.1) * DDT; 
  float current = (voltage_out - vcc_mid) / ACS712_SENSITIVITY;
  return current;
}

float lireTensionDiviseur(int pin) {
  int totalADCValue = 0;
  int rawValue = analogRead(pin);
  float voltage = (rawValue / 4095.0) * 3.3;

    // Effectuer plusieurs lectures de l'ADC
  for (int i = 0; i < NUM_SAMPLES; i++) {
    totalADCValue += analogRead(pin);
    delay(10); 
  }
  int averageADCValue = totalADCValue / NUM_SAMPLES;

  // Convertir la moyenne en tension
  float Vout = (averageADCValue * VREF) / ADC_MAX;  // Tension mesurée par l'ESP32
  float Vin = Vout * (R1 + R2) / R2; 
  return Vin;
}

float lireLM35(int pin) {
  int rawValue = analogRead(pin);
  float voltage = (rawValue / 4095.0) * 3.3;
  return voltage * 100.0;
}

// === Calculs du SoH et du SoC ===
float calculerSOH(float capaciteReelle, float capaciteNominale) {
  return (capaciteReelle / capaciteNominale) * 100.0;
}

// Fonction de calcul du SoC 
float calculerSoC(float socActuel, float courant, float capaciteNominale, float deltaTime) {
  float chargePerdue = courant * deltaTime; // Charge perdue en Ah
  float soc = socActuel - (chargePerdue / capaciteNominale) * 100.0; // Mise à jour du SoC
  if (soc < 0) soc = 0; // Limiter le SoC à 0%
  if (soc > 100) soc = 100; // Limiter le SoC à 100%
  return soc;
}
void mettreAJourSoC() {
  // Implémentation de la mise à jour du SoC en fonction du courant mesuré
    unsigned long tempsActuel = millis();
  float deltaTime = (tempsActuel - dernierTempsMesure) / 1000.0; // Temps écoulé en secondes

  // Mettre à jour le SoC pour chaque batterie
  socBat1 = calculerSoC(socBat1, courantBat1, capaciteNominaleBat1, deltaTime);
  socBat2 = calculerSoC(socBat2, courantBat2, capaciteNominaleBat2, deltaTime);
  socBat3 = calculerSoC(socBat3, courantBat3, capaciteNominaleBat3, deltaTime);

  // Mettre à jour le temps de mesure
  dernierTempsMesure = tempsActuel;

  // Calculer la profondeur de décharge (DoD)
  dodBat1 = 100.0 - socBat1;
  dodBat2 = 100.0 - socBat2;
  dodBat3 = 100.0 - socBat3;
}

// === Gestion du GSM ===
bool checkGSM() {
  Serial2.println("AT");  // Commande de test pour voir si le GSM répond
  delay(1000);            // Délai d'attente pour la réponse

  if (Serial2.available()) {
    String response = Serial2.readString();  // Lire la réponse du GSM
    Serial.print("GSM Response: ");
    Serial.println(response);  // Afficher la réponse sur le moniteur série
    
    // Vérifier si la réponse contient "OK", signe que le GSM est fonctionnel
    if (response.indexOf("OK") != -1) {
      return true;  // Le GSM a répondu "OK"
    }
  }
  return false;  // Le GSM ne répond pas ou renvoie une erreur
}

void sendSMS(String number, String text) {
  // sendATCommand("AT+CSCS=\"GSM\"", 1000, "OK");  // Réinitialiser à l'encodage GSM

  if (sendATCommand("AT+CMGF=1", 1000, "OK")) {  // Mode texte
    Serial.println("Mode texte activé.");
  } else {
    Serial.println("Échec de l'activation du mode texte.");
    return;
  }

  if (sendATCommand("AT+CMGS=\"" + number + "\"\r", 2000, ">")) {
    Serial.println("Prêt pour l'envoi du message.");
    Serial2.print(text);
    delay(100);
    Serial2.write((char)26);  // CTRL+Z pour envoyer
    delay(2000);
    if (readSerialResponse().indexOf("OK") != -1) {
      Serial.println("Message envoyé avec succès.");
    } else {
      Serial.println("Échec de l'envoi du message.");
    }
  }
}

bool sendATCommand(String command, const int timeout, String expectedResponse) {
  Serial2.println(command);
  String response = readSerialResponse();
  return response.indexOf(expectedResponse) != -1;
}

String readSerialResponse() {
  String response = "";
  unsigned long startTime = millis();
  while (millis() - startTime < 2000) {
    if (Serial2.available()) {
      response += char(Serial2.read());
    }
  }
  return response;
}

void blinkLED(int delayTime) {
  digitalWrite(LED_PIN, HIGH);
  delay(delayTime);
  digitalWrite(LED_PIN, LOW);
  delay(delayTime);
}

// === Affichage sur moniteur série ===

void afficherSurMoniteurSerie() {
  Serial.println("=== État des batteries ===");

  // Tableau des données des batteries
  float tensions[] = {tensionBat1, tensionBat2, tensionBat3};
  float courants[] = {courantBat1, courantBat2, courantBat3};
  float temperatures[] = {temperatureBat1, temperatureBat2, temperatureBat3};

  for (int i = 0; i < nombreBatteriesConnectees; i++) {
    Serial.print("Batterie ");
    Serial.print(i + 1);
    Serial.print(": ");
    Serial.print(tensions[i], 1);
    Serial.print("V, ");
    Serial.print(courants[i], 1);
    Serial.print("A, ");
    Serial.print(temperatures[i], 1);
    Serial.println("°C");
  }

  // Affichage des mesures globales
  Serial.println("=== Mesures globales ===");
  Serial.print("Tension globale: ");
  Serial.print(tensionGlobal, 1);
  Serial.println("V");
  Serial.print("Courant global: ");
  Serial.print(courantGlobal, 1);
  Serial.println("A");
  Serial.println("=======================");
}

