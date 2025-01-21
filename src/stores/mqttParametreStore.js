import { defineStore } from "pinia";
import mqtt from "mqtt";

import { useShow } from "@/stores/show";

export const useMqttParametreBatterieStore = defineStore(
  "mqttParametreBatterie",
  () => {
    const show = useShow();

    // Connexion au broker MQTT
    const client = mqtt.connect("ws://192.168.1.116:9001");

    client.on("connect", () => {
      console.log("Connecté au broker MQTT");
    });

    client.on("error", (err) => {
      console.error("Erreur MQTT :", err);
    });

    /**
     * Fonction pour publier les données des batteries
     * @param {Object} data - Données à publier
     */
    const publierDonneesBatteries = (
      i,
      c,
      cma,
      cmi,
      tema,
      temi,
      tma,
      tmi,
      d,
      s
    ) => {
      client.publish(
        "parametreBatterie",
        `[{\"i\":[${i}],\"c\":[${c}],\"cma\":[${cma}],\"cmi\":[${cmi}],\"tema\":[${tema}],\"tma\":[${tma}],\"tmi\":[${tmi}],\"d\":[${d}],\"s\":[${s}]}]`,
        (err) => {
          if (err) {
            console.error("Erreur lors de la publication MQTT :", err);
            show.showAlert = true;
            show.showAlertType = "danger";
            show.showAlertMessage = "Erreur lors de la publication MQTT";
          } else {
            console.log("Données publiées avec succès :", data);
            show.showAlert = true;
            show.showAlertType = "success";
            show.showAlertMessage = "Données publiées avec succès ";
          }
        }
      );
    };

    return {
      publierDonneesBatteries,
    };
  }
);
// '[{idBatterie: 1,contact: "3",plage_courant_max: "0.00",plage_courant_min: "0.00",plage_puissance_max: "0.00",plage_puissance_min: "0.00",plage_temperature_max: "0.00",plage_temperature_min: "0.00",plage_tension_max: "0.00",plage_tension_min: "0.00",profondeur_charge_max: "0.00",seuil_alerte_dod: "0.00",seuil_alerte_soc: "0.00"}]'
