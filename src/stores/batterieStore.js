import { defineStore } from "pinia";
import { useShow } from "@/stores/show";
import { useUrl } from "@/stores/url";
import { ref, onMounted } from "vue";
import axios from "axios";
import { parcStore } from "@/stores/parcStore";
import { format, parseISO } from "date-fns";
export const useBatterie = defineStore("Batterie", () => {
  const show = useShow();
  const URL = useUrl().url;
  const useParc = parcStore();

  const nom = ref("");
  const capaciteNominal = ref("");
  const dateInstallation = ref("");
  const technologie = ref("");
  const marque = ref("");
  const parcId = ref("");
  const description = ref("");
  const tensionNominale = ref("");
  const capacite = ref("");
  const utilisationVeille = ref("");
  const utilisationVeillemax = ref("");
  const utilisationVeillemin = ref("");
  const utilisationCyclique = ref("");
  const utilisationCycliquemin = ref("");
  const utilisationCycliquemax = ref("");
  const courant = ref("");
  const temperature = ref("");
  const dodMax = ref("");
  const parametreBatterieId = ref("");

  const batterieModifier = ref();
  const ismodifier = ref(false);

  const allBatteryData = ref([]);
  const oneBatteryData = ref({});

  function clear() {
    nom.value = "";
    capaciteNominal.value = "";
    dateInstallation.value = "";
    technologie.value = "";
    marque.value = "";
    parcId.value = "";
    description.value = "";
    tensionNominale.value = "";
    capacite.value = "";
    utilisationVeille.value = "";
    utilisationVeillemax.value = "";
    utilisationVeillemin.value = "";
    utilisationCyclique.value = "";
    utilisationCycliquemin.value = "";
    utilisationCycliquemax.value = "";
    courant.value = "";
    temperature.value = "";
    dodMax.value = "";
    parametreBatterieId.value = "";
  }

  function registerBatterie() {
    show.showSpinner = true;
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const day = d.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    let enveuille = `${utilisationVeillemin.value}-${utilisationVeillemax.value}`;
    let cyclique = `${utilisationCycliquemin.value}-${utilisationCycliquemax.value}`;

    console.log("enveuille", enveuille);

    let parcid = useParc.parcSuperviser.id;
    const batterieData = {
      nom: nom.value,
      capacite_nominal: capacite.value,
      date_installation: dateInstallation.value,
      technologie: technologie.value,
      marque: marque.value,
      parc_id: parcid,
      description: description.value || "",
      tension_nominale: tensionNominale.value || "",
      capacite: capacite.value || "",
      utilisation_veille: enveuille || "",
      utilisation_cyclique: cyclique || "",
      courant: courant.value || "",
      temperature: temperature.value || "",
      dod_max: dodMax.value || "",
    };

    axios
      .post(`${URL}/api/batterie`, batterieData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          show.showCreationParamBatt = false;
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Batterie enregistrée avec succès! 🎉";

          let parcid = useParc.parcSuperviser.id;
          getBatteriesByParcId(parcid);
          clear()
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage =
            "Échec de l'enregistrement de la batterie. ❌";
          // show.showNewBatterie = true;
        }
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        show.showNewBatterie = true;
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Veuillez remplir les champs obligatoires. ⚠️";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  }

  function updateBatterie(id) {
    let parcid = useParc.parcSuperviser.id;
    show.showSpinner = true;

    let enveuille = `${utilisationVeillemin.value}-${utilisationVeillemax.value}`;
    let cyclique = `${utilisationCycliquemin.value}-${utilisationCycliquemax.value}`;

    const batterieData = {
      nom: nom.value,
      capacite_nominal: capaciteNominal.value,
      date_installation: dateInstallation.value,
      technologie: technologie.value,
      marque: marque.value,
      parc_id: parcid,
      parametre_batterie_id: parametreBatterieId.value,
      description: description.value || "",
      tension_nominale: tensionNominale.value || "",
      capacite: capacite.value || "",
      utilisation_veille: enveuille || "",
      utilisation_cyclique: cyclique || "",
      courant: courant.value || "",
      temperature: temperature.value || "",
      dod_max: dodMax.value || "",
    };

    axios
      .put(`${URL}/api/batterie/${id}`, batterieData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Batterie mise à jour avec succès! 🎉";
          show.showCreationParamBatt = false;
          let parcid = useParc.parcSuperviser.id;
          getBatteriesByParcId(parcid);
          clear()
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de la mise à jour de la batterie. ❌";
          // show.showEditBatterie = true;
        }
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        // show.showEditBatterie = true;
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Veuillez remplir les champs obligatoires. ⚠️";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  }

  function deleteBatterie(id) {
    // show.showDeleteBatterie = false;
    show.showSpinner = true;
    axios
      .delete(`${URL}/api/batterie/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 204) {
          let parcid = useParc.parcSuperviser.id;
          getBatteriesByParcId(parcid);
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Batterie supprimée avec succès! 🗑️";
          // Add a function here to fetch updated batteries if needed
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de la suppression de la batterie. ❌";
        }
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        // show.showDeleteBatterie = true;
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Erreur lors de la suppression des données. ⚠️";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  }

  function getBatteriesByParcId(parcId) {
    show.showSpinner = true;

    return axios
      .get(`${URL}/api/batterie/parc/${parcId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          const batteries = response.data;
          allBatteryData.value = response.data;

          console.log("icicicicic", allBatteryData.value);

          localStorage.setItem("allBatteryData", JSON.stringify(response.data));
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de la récupération des batteries. ❌";
        }
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage =
          "Erreur lors de la récupération des batteries. ⚠️";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .finally(() => {
        show.showSpinner = false;
      });
  }



  // function getBatteriesById(idbat) {
  //   show.showSpinner = true;
  
  //   return axios
  //     .get(`${URL}/api/batterie/${idbat}`, {
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         const batteries = response.data;
  //         return batteries; // Retourne les données des batteries
  //       } else {
  //         show.showAlert = true;
  //         show.showAlertType = "danger";
  //         show.showAlertMessage = "Échec de la récupération des batteries. ❌";
  //         return null; // Retourne null en cas d'échec
  //       }
  //     })
  //     .catch((err) => {
  //       show.showAlert = true;
  //       show.showAlertType = "warning";
  //       show.showAlertMessage = "Erreur lors de la récupération des batteries. ⚠️";
  //       console.error(err);
  //       return null; // Retourne null en cas d'erreur
  //     })
  //     .finally(() => {
  //       show.showSpinner = false;
  //     });
  // }
  

  async function getBatteriesById(idbat) {
  
    try {
      const response = await axios.get(`${URL}/api/batterie/${idbat}`, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        const batteries = response.data;
        return batteries; // Retourne les données des batteries
      } else {
        show.showAlert = true;
        show.showAlertType = "danger";
        show.showAlertMessage = "Échec de la récupération des batteries. ❌";
        return null; // Retourne null en cas d'échec
      }
    } catch (err) {
      show.showAlert = true;
      show.showAlertType = "warning";
      show.showAlertMessage = "Erreur lors de la récupération des batteries. ⚠️";
      console.error(err);
      return null; // Retourne null en cas d'erreur
    } finally {
      show.showSpinner = false;
    }
  }



  // Charger les parcs au montage du composant
  onMounted(() => {
    try {
      let parcid = useParc.parcSuperviser.id;
      getBatteriesByParcId(parcid);
    } catch (error) {}
  });
  return {
    nom,
    capaciteNominal,
    getBatteriesById,
    dateInstallation,
    technologie,
    marque,
    parcId,
    ismodifier,
    description,
    tensionNominale,
    capacite,
    utilisationVeille,
    utilisationCyclique,
    courant,
    temperature,
    batterieModifier,
    parametreBatterieId,
    dodMax,
    allBatteryData,
    utilisationVeillemax,
    utilisationVeillemin,
    oneBatteryData,
    utilisationCycliquemin,
    utilisationCycliquemax,
    registerBatterie, // Register function added here
    updateBatterie,
    deleteBatterie,
    getBatteriesByParcId,
  };
});
