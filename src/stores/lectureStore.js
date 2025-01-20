// stores/lectureStore.js
import { defineStore } from "pinia";
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useUrl } from "@/stores/url";
import { useShow } from "@/stores/show";
import { parcStore } from "@/stores/parcStore";
import { useBatterie } from "@/stores/batterieStore";
export const useLectureStore = defineStore("LectureStore", () => {
  const show = useShow();
  const URL = useUrl().url;
  const useParc = parcStore();
  const batterie = useBatterie();

  const tension = ref("");
  const courant = ref("");
  const temperature = ref("");
  const soc = ref("");
  const dod = ref("");
  const batterieId = ref("");

  const allLectureData = ref([]);
  const oneLectureData = ref({});
  const isModifier = ref(false);

  const voltageData = ref([]);
  const currentData = ref([]);
  const temperatureData = ref([]);
  const timeData = ref([]);

  function fetchLectures() {
    show.showSpinner = true;
    axios
      .get(`${URL}/api/lecture`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          allLectureData.value = response.data;
          show.showAlertType = "success";
          show.showAlertMessage = "Lectures récupérées avec succès! ✅";
        } else {
          show.showAlertType = "danger";
          show.showAlertMessage =
            "Erreur lors de la récupération des lectures. ❌";
        }
      })
      .catch((error) => {
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la récupération des lectures. ⚠️";
        console.error("Error fetching lectures:", error);
      })
      .finally(() => {
        show.showSpinner = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function getLectureByParcId(idparc) {
    show.showSpinner = true;
    axios
      .get(`${URL}/api/lecture/parc/${idparc}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          allLectureData.value = response.data;
          console.log("response data lecteur", response.data);
          show.showAlertType = "success";
          show.showAlertMessage = "Lectures récupérées avec succès! ✅";
        } else {
          show.showAlertType = "danger";
          show.showAlertMessage =
            "Erreur lors de la récupération des lectures. ❌";
        }
      })
      .catch((error) => {
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la récupération des lectures. ⚠️";
        console.error("Error fetching lectures:", error);
      })
      .finally(() => {
        show.showSpinner = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function fetchLecture(id) {
    show.showSpinner = true;
    axios
      .get(`${URL}/api/lecture/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          oneLectureData.value = response.data;
          show.showAlertType = "success";
          show.showAlertMessage = "Lecture récupérée avec succès! ✅";
        } else {
          show.showAlertType = "danger";
          show.showAlertMessage =
            "Erreur lors de la récupération de la lecture. ❌";
        }
      })
      .catch((error) => {
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la récupération de la lecture. ⚠️";
        console.error("Error fetching lecture:", error);
      })
      .finally(() => {
        show.showSpinner = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function createLecture() {
    show.showSpinner = true;
    const lectureData = {
      tension: tension.value,
      courant: courant.value,
      temperature: temperature.value,
      soc: soc.value,
      dod: dod.value,
      batterie_id: batterieId.value,
    };
    axios
      .post(`${URL}/api/lectures`, lectureData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 201) {
          allLectureData.value.push(response.data);
          show.showAlertType = "success";
          show.showAlertMessage = "Lecture créée avec succès! 🎉";
        } else {
          show.showAlertType = "danger";
          show.showAlertMessage =
            "Erreur lors de la création de la lecture. ❌";
        }
      })
      .catch((error) => {
        show.showAlertType = "warning";
        show.showAlertMessage = "Erreur lors de la création de la lecture. ⚠️";
        console.error("Error creating lecture:", error);
      })
      .finally(() => {
        show.showSpinner = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function updateLecture(id) {
    show.showSpinner = true;
    const lectureData = {
      tension: tension.value,
      courant: courant.value,
      temperature: temperature.value,
      soc: soc.value,
      dod: dod.value,
      batterie_id: batterieId.value,
    };
    axios
      .put(`${URL}/api/lecture/${id}`, lectureData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          const index = allLectureData.value.findIndex(
            (lecture) => lecture.id === id
          );
          allLectureData.value[index] = response.data;
          show.showAlertType = "success";
          show.showAlertMessage = "Lecture mise à jour avec succès! 🎉";
        } else {
          show.showAlertType = "danger";
          show.showAlertMessage =
            "Erreur lors de la mise à jour de la lecture. ❌";
        }
      })
      .catch((error) => {
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la mise à jour de la lecture. ⚠️";
        console.error("Error updating lecture:", error);
      })
      .finally(() => {
        show.showSpinner = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function deleteLecture(id) {
    show.showSpinner = true;
    axios
      .delete(`${URL}/api/lectures/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 204) {
          allLectureData.value = allLectureData.value.filter(
            (lecture) => lecture.id !== id
          );
          show.showAlertType = "success";
          show.showAlertMessage = "Lecture supprimée avec succès! 🗑️";
        } else {
          show.showAlertType = "danger";
          show.showAlertMessage =
            "Erreur lors de la suppression de la lecture. ❌";
        }
      })
      .catch((error) => {
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la suppression de la lecture. ⚠️";
        console.error("Error deleting lecture:", error);
      })
      .finally(() => {
        show.showSpinner = false;
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function selecteData(idBat) {
    // Réinitialisation des tableaux pour éviter l'accumulation de données
    voltageData.value = [];
    currentData.value = [];
    temperatureData.value = [];
    timeData.value = [];

    // Parcours des données de lecture
    for (let index = 0; index < allLectureData.length; index++) {
      console.log("ato");

      if (allLectureData[index].batterie_id === idBat) {
        console.log("oui", allLectureData[index]);

        // Parcours des lectures de la batterie sélectionnée
        for (let i = 0; i < allLectureData[index].lectures.length; i++) {
          voltageData.value.push(
            Number(allLectureData[index].lectures[i].tension)
          );
          currentData.value.push(
            Number(allLectureData[index].lectures[i].courant)
          );
          temperatureData.value.push(
            Number(allLectureData[index].lectures[i].temperature)
          );
          timeData.value.push(allLectureData[index].lectures[i].created_at);
        }
      }
    }

    console.log("voltageData", voltageData.value);
    console.log("currentData", currentData.value);
    console.log("temperatureData", temperatureData.value);
    console.log("timeData", timeData.value);
  }

  // Charger les lectures au montage du composant
  onMounted(async () => {
    console.log("atyyyyyyyyyyyyyyyy");
    let parcid = useParc.parcSuperviser.id;
    console.log("id", parcid);
    getLectureByParcId(parcid);

    // Surveille les données et met à jour lorsque disponibles
    watch(
      () => batterie.allBatteryData,
      (newVal) => {
        if (newVal.length > 0) {
          selecteData(newVal[0].id); // Charge les données de la première batterie
        }
      },
      { immediate: true } // Exécute au moment où le `watch` est défini
    );

    voltageData.value = [
      1, 29.02, 26.36, 26.25, 20.18, 34.7, 17.59, 25.49, 37.01, 27.52, 33.4,
      40.21, 38.96, 31.45, 23.89, 15.18, 47.45, 43.57, 40.37, 28.52, 48.93,
      22.24, 19.68, 28.2, 29.52, 25.88, 40.62, 12.07, 26.87, 16.19, 47.25,
      24.33, 27.48, 30.94, 42.84, 49.44, 30.57, 33.13, 43.6, 26.78, 21.21,
      48.81, 45.98, 41.73, 12.11, 34.33, 17.75, 27.62, 26.2, 24.44, 34.59,
      43.87, 24.45, 38.1, 15.79, 32.2, 45.43, 44.45, 22.43, 35.99, 33.62, 41.87,
      35.07, 40.26, 24, 48.86, 27.26, 32.34, 42.13, 15.85, 23.7, 34.81,
    ];
    currentData.value = [
      1, 20.03, 48.19, 32.59, 38.29, 42.23, 31.89, 46.48, 21.12, 22.99, 39.99,
      36.36, 26.58, 37.9, 33.39, 50.35, 53.42, 40.9, 34.2, 52.59, 42.03, 57.46,
      39.36, 20.7, 44.49, 51.71, 54.27, 46.37, 38.7, 20.63, 26.17, 58.99, 20.06,
      27.42, 40.63, 51.71, 35.88, 30.56, 56.25, 29.99, 47.5, 23.16, 44.45,
      51.93, 55.26, 26.69, 57.79, 21.85, 47.84, 22.14, 31.81, 32.13, 31.96,
      42.93, 52.95, 34.31, 22.3, 49.06, 20.92, 35.54, 45.12, 21.94, 34.69,
      37.97, 45.25, 34.37, 40.13, 32.01, 58.75, 21.43, 37.62, 37.64,
    ]
    temperatureData.value = [ 1, -1.58, -8.33, 7.92, 0.5, 2.81, -9.32, 8.95, 2.86, 2.67, -4.19, 4.08, 9.24, -3.83, 8.39, -7.1, 1.78, -5.88, -4.39, 9.19, -0.76, -2.86, -8.83, -4.39, -9.62, 3.97, -9.2, 2.59, 6.7, 3.94, -7.65, 4.65, 5.31, -1.76, -2.26, 3.97, -0.17, -6.21, -9.19, -8.67, 3.94, -4.35, -7.58, 8.87, 1.69, -0.37, -6.27, -4.95, -8.93, -0.7, -2.2, 7.72, 6.09, -1.36, 5.58, -1.44, -1.15, -2.06, -5.34, 3.66, -6.61, -2.55, 0.86, -8.39, 9.21, -8.83, -1.63, 5.73, 8.37, -0.03, -2.71, -3 ] 
    timeData.value = [ "2025-01-02T18:00:09.000000Z", "2025-01-19T17:26:12.000000Z", "2025-01-19T17:26:17.000000Z", "2025-01-19T17:26:22.000000Z", "2025-01-19T17:26:27.000000Z", "2025-01-19T17:26:32.000000Z", "2025-01-19T17:26:37.000000Z", "2025-01-19T17:26:42.000000Z", "2025-01-19T17:26:47.000000Z", "2025-01-19T17:26:52.000000Z", "2025-01-19T17:26:57.000000Z", "2025-01-19T17:27:02.000000Z", "2025-01-19T17:27:07.000000Z", "2025-01-19T17:27:12.000000Z", "2025-01-19T17:27:17.000000Z", "2025-01-19T17:27:22.000000Z", "2025-01-19T17:27:27.000000Z", "2025-01-19T17:27:32.000000Z", "2025-01-19T17:27:37.000000Z", "2025-01-19T17:27:42.000000Z", "2025-01-19T17:27:47.000000Z", "2025-01-19T17:27:52.000000Z", "2025-01-19T17:27:57.000000Z", "2025-01-19T17:28:02.000000Z", "2025-01-19T17:28:07.000000Z", "2025-01-19T17:28:12.000000Z", "2025-01-19T17:28:17.000000Z", "2025-01-19T17:28:22.000000Z", "2025-01-19T17:28:27.000000Z", "2025-01-19T17:28:32.000000Z", "2025-01-19T17:28:37.000000Z", "2025-01-19T17:28:42.000000Z", "2025-01-19T17:28:47.000000Z", "2025-01-19T17:28:52.000000Z", "2025-01-19T17:28:57.000000Z", "2025-01-19T17:29:02.000000Z", "2025-01-19T17:29:07.000000Z", "2025-01-19T17:29:12.000000Z", "2025-01-19T17:29:17.000000Z", "2025-01-19T17:29:22.000000Z", "2025-01-19T17:29:27.000000Z", "2025-01-19T17:29:32.000000Z", "2025-01-19T17:29:37.000000Z", "2025-01-19T17:29:42.000000Z", "2025-01-19T17:29:47.000000Z", "2025-01-19T17:29:52.000000Z", "2025-01-19T17:29:57.000000Z", "2025-01-19T17:30:02.000000Z", "2025-01-19T17:30:07.000000Z", "2025-01-19T17:30:12.000000Z", "2025-01-19T17:30:17.000000Z", "2025-01-19T17:30:22.000000Z", "2025-01-19T17:30:27.000000Z", "2025-01-19T17:30:32.000000Z", "2025-01-19T17:30:37.000000Z", "2025-01-19T17:30:42.000000Z", "2025-01-19T17:30:47.000000Z", "2025-01-19T17:30:52.000000Z", "2025-01-19T17:30:57.000000Z", "2025-01-19T17:31:02.000000Z", "2025-01-19T17:31:07.000000Z", "2025-01-19T17:31:12.000000Z", "2025-01-19T17:31:17.000000Z", "2025-01-19T17:31:22.000000Z", "2025-01-19T17:31:27.000000Z", "2025-01-19T17:31:32.000000Z", "2025-01-19T17:31:37.000000Z", "2025-01-19T17:31:42.000000Z", "2025-01-19T17:31:47.000000Z", "2025-01-19T17:31:52.000000Z", "2025-01-19T17:31:57.000000Z", "2025-01-19T17:32:02.000000Z" ]

    console.log("voltageData", voltageData.value);
    console.log("currentData", currentData.value);
    console.log("temperatureData", temperatureData.value);
    console.log("timeData", timeData.value);
  });

  return {
    tension,
    courant,
    voltageData,
    currentData,
    temperatureData,
    timeData,
    temperature,
    soc,
    dod,
    batterieId,
    allLectureData,
    oneLectureData,
    isModifier,
    fetchLectures,
    fetchLecture,
    createLecture,
    updateLecture,
    getLectureByParcId,
    deleteLecture,
  };
});
