// *************************************** IMPORTATION ********************************************** //
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

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
const char* mqtt_topic_parametreBatterie = "parametreBatterie";

//Configurer le tableau pour les parametres des batteries
const int maxBatteries = 3; // Maximum de batteries
float batteries[maxBatteries][12]; // Tableau pour stocker les paramètres des batteries
int nombreBatteries = 0; // Nombre de batteries reçues

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
      verifierAlerteBatterie(batteries[0][0], socBat1, temperatureBat1, RELAIS_BATTERIE_1 , courantBat1, tensionBat1 , socBat1);
      verifierAlerteBatterie(batteries[1][0], socBat2, temperatureBat2, RELAIS_BATTERIE_2 ,  courantBat2, tensionBat2 , socBat2);
      verifierAlerteBatterie(batteries[2][0], socBat3, temperatureBat3, RELAIS_BATTERIE_3 ,  courantBat3, tensionBat3 , socBat3);

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

  // Parser les données JSON
  DynamicJsonDocument doc(2048); // Ajuster la taille selon les données attendues
  DeserializationError error = deserializeJson(doc, message);

  if (error) {
    Serial.print("Erreur de parsing JSON : ");
    Serial.println(error.c_str());
    return;
  }

  // Réinitialiser le nombre de batteries
  nombreBatteries = 0;

  // Extraire les tableaux JSON
  JsonArray iArray = doc[0]["i"].as<JsonArray>();
  JsonArray cArray = doc[0]["c"].as<JsonArray>();
  JsonArray cmaArray = doc[0]["cma"].as<JsonArray>();
  JsonArray cmiArray = doc[0]["cmi"].as<JsonArray>();
  JsonArray temaArray = doc[0]["tema"].as<JsonArray>();
  JsonArray tmaArray = doc[0]["tma"].as<JsonArray>();
  JsonArray tmiArray = doc[0]["tmi"].as<JsonArray>();
  JsonArray dArray = doc[0]["d"].as<JsonArray>();
  JsonArray sArray = doc[0]["s"].as<JsonArray>();

  // Déterminer le nombre de batteries
  int totalBatteries = iArray.size();
  nombreBatteries = totalBatteries > maxBatteries ? maxBatteries : totalBatteries;

  // Extraire les données pour chaque batterie
  for (int index = 0; index < nombreBatteries; index++) {
    batteries[index][0] = iArray[index].as<float>();
    batteries[index][1] = cArray[index].as<float>();
    batteries[index][2] = cmaArray[index].as<float>();
    batteries[index][3] = cmiArray[index].as<float>();
    batteries[index][4] = temaArray[index].as<float>();
    batteries[index][5] = tmaArray[index].as<float>();
    batteries[index][6] = tmiArray[index].as<float>();
    batteries[index][7] = dArray[index].as<float>();
    batteries[index][8] = sArray[index].as<float>();
  }

  nombreBatteriesConnectees = nombreBatteries; 

  // // Afficher les informations des batteries
  // for (int i = 0; i < nombreBatteries; i++) {
  //   Serial.print("Batterie ");
  //   Serial.println(i + 1);
  //   Serial.print("  ID: ");
  //   Serial.println(batteries[i][0]);
  //   Serial.print("  Contact: ");
  //   Serial.println(batteries[i][1]);
  //   Serial.print("  Plage courant max: ");
  //   Serial.println(batteries[i][2]);
  //   Serial.print("  Plage courant min: ");
  //   Serial.println(batteries[i][3]);
  //   Serial.print("  Plage température max: ");
  //   Serial.println(batteries[i][4]);
  //   Serial.print("  Plage tension max: ");
  //   Serial.println(batteries[i][5]);
  //   Serial.print("  Plage tension min: ");
  //   Serial.println(batteries[i][6]);
  //   Serial.print("  Seuil alerte DoD: ");
  //   Serial.println(batteries[i][7]);
  //   Serial.print("  Seuil alerte SoC: ");
  //   Serial.println(batteries[i][8]);
  //   Serial.println();
  // }
}

// Initialisation MQTT
void reconnectMQTT() {
  while (!client.connected()) {
    Serial.println("Connexion au broker MQTT...");
    if (client.connect("")) {
      Serial.println("Connecté au broker MQTT");
      // S'abonner au topic
      if (client.subscribe(mqtt_topic_parametreBatterie)) {
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
void verifierAlerteBatterie(int numBatterie, float dod, float temperature, int relaisBatterie, float courant, float tension, float soc) {
  String messageAlerte = "";
  int gravite = 1; // Gravité par défaut (normale)

  // ------------------- Vérification DoD -------------------
  if (dod < batteries[numBatterie][7] * 0.5) {
    gravite = 4; // Gravité critique
    messageAlerte = "Alerte critique : DoD très bas (" + String(dod, 2) + "%), inférieur à 50% du seuil (" + String(batteries[numBatterie][7], 2) + "%). ";
  } else if (dod < batteries[numBatterie][7] * 0.75) {
    gravite = max(gravite, 3); // Gravité élevée
    messageAlerte = "Attention : DoD bas (" + String(dod, 2) + "%), inférieur à 75% du seuil (" + String(batteries[numBatterie][7], 2) + "%). ";
  } else if (dod < batteries[numBatterie][7]) {
    gravite = max(gravite, 2); // Gravité modérée
    messageAlerte = "Alerte modérée : DoD proche du seuil (" + String(dod, 2) + "%). ";
  }

  // ------------------- Vérification Température -------------------
  if (temperature > batteries[numBatterie][4]) {
    gravite = max(gravite, 4); // Gravité critique
    messageAlerte += "Alerte critique : Température élevée (" + String(temperature, 2) + "°C), supérieure au maximum autorisé (" + String(batteries[numBatterie][4], 2) + "°C). ";
  } else if (temperature > batteries[numBatterie][4] * 0.8) {
    gravite = max(gravite, 3); // Gravité élevée
    messageAlerte += "Attention : Température élevée (" + String(temperature, 2) + "°C), proche du seuil (" + String(batteries[numBatterie][4], 2) + "°C). ";
  }

  // ------------------- Vérification Courant -------------------
  if (courant > batteries[numBatterie][2]) {
    gravite = max(gravite, 4); // Gravité critique
    messageAlerte += "Alerte critique : Courant élevé (" + String(courant, 2) + "A), supérieur au maximum autorisé (" + String(batteries[numBatterie][2], 2) + "A). ";
  } else if (courant > batteries[numBatterie][3] * 0.75) {
    gravite = max(gravite, 3); // Gravité élevée
    messageAlerte += "Attention : Courant élevé (" + String(courant, 2) + "A), proche du seuil (" + String(batteries[numBatterie][2], 2) + "A). ";
  } else if (courant < batteries[numBatterie][3]) {
    gravite = max(gravite, 3); // Gravité élevée
    messageAlerte += "Attention : Courant faible (" + String(courant, 2) + "A), inférieur au minimum autorisé (" + String(batteries[numBatterie][3], 2) + "A). ";
  }

  // ------------------- Vérification Tension -------------------
  if (tension > batteries[numBatterie][5]) {
    gravite = max(gravite, 4); // Gravité critique
    messageAlerte += "Alerte critique : Tension élevée (" + String(tension, 2) + "V), supérieure au maximum autorisé (" + String(batteries[numBatterie][5], 2) + "V). ";
  } else if (tension < batteries[numBatterie][6]) {
    gravite = max(gravite, 3); // Gravité élevée
    messageAlerte += "Attention : Tension basse (" + String(tension, 2) + "V), inférieure au minimum requis (" + String(batteries[numBatterie][6], 2) + "V). ";
  }

  // ------------------- Vérification SoC -------------------
  if (soc < batteries[numBatterie][8]) {
    gravite = max(gravite, 2); // Gravité modérée
    messageAlerte += "Alerte modérée : SoC bas (" + String(soc, 2) + "%), inférieur au seuil configuré (" + String(batteries[numBatterie][8], 2) + "%). ";
  }

  // ------------------- Création du message JSON -------------------
  String message = "{\"idb\": " + String(batteries[numBatterie][0]) +
                   ", \"dod\": " + String(dod, 2) +
                   ", \"temp\": " + String(temperature, 2) +
                   ", \"courant\": " + String(courant, 2) +
                   ", \"tension\": " + String(tension, 2) +
                   ", \"soc\": " + String(soc, 2) +
                   ", \"sms\": \"" + messageAlerte + "\"" +
                   ", \"r\": " + String(relaisBatterie) +
                   ", \"gravite\": " + String(gravite) +
                   "}";

  // ------------------- Affichage ou envoi du message -------------------
  Serial.println(message);
  if (client.publish(mqtt_topic_alerts, message.c_str())) {
    Serial.println("Alerte publiée via MQTT.");
  } else {
    Serial.println("Échec de la publication de l'alerte.");
  }

  // ------------------- Actions en fonction de la gravité -------------------
  if (gravite >= 3) {
    envoyerAlerteEtIsolerBatterie(batteries[numBatterie][0], messageAlerte, relaisBatterie);
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
// === Mesure des batteries ===
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
    Serial.println("Échec de publication MQTT ici");
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

