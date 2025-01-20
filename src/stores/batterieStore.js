import { defineStore } from "pinia";
import { useShow } from "@/stores/show";
import { useUrl } from "@/stores/url";
import { ref , onMounted} from "vue";
import axios from "axios";
import { parcStore } from "@/stores/parcStore";
import { format, parseISO } from "date-fns";
export const useBatterie = defineStore("Batterie", () => {
  const show = useShow();
  const URL = useUrl().url;
  const useParc = parcStore();

  const nom = ref("");
  const capaciteNominal = ref("");
  const dateInstallation = ref('');
  const technologie = ref("");
  const marque = ref("");
  const parcId = ref("");
  const description = ref("");
  const tensionNominale = ref("");
  const capacite = ref("");
  const utilisationVeille = ref("");
  const utilisationCyclique = ref("");
  const courant = ref("");
  const temperature = ref("");
  const dodMax = ref("");
  const parametreBatterieId= ref('')

  



  const batterieModifier = ref()
  const ismodifier = ref(false)

  const allBatteryData = ref([])
const oneBatteryData =ref({})
  function registerBatterie() {
    // show.showNewBatterie = false;
    show.showSpinner = true;

    // Fonction pour formater la date
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = (d.getMonth() + 1).toString().padStart(2, "0");
      const day = d.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    let parcid = useParc.parcSuperviser.id;
    console.log("formate ", formatDate(dateInstallation.value));
    const batterieData = {
      nom: nom.value,
      capacite_nominal: capaciteNominal.value,
      date_installation: dateInstallation.value,
      technologie: technologie.value,
      marque: marque.value,
      parc_id: parcid,
      description: description.value || "",
      tension_nominale: tensionNominale.value || "",
      capacite: capacite.value || "",
      utilisation_veille: utilisationVeille.value || "",
      utilisation_cyclique: utilisationCyclique.value || "",
      courant: courant.value || "",
      temperature: temperature.value || "",
      dod_max: dodMax.value || "",
    };

    console.log("batterieData", batterieData);

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
      utilisation_veille: utilisationVeille.value || "",
      utilisation_cyclique: utilisationCyclique.value || "",
      courant: courant.value || "",
      temperature: temperature.value || "",
      dod_max: dodMax.value || "",
    };

    console.log("batterie date" ,batterieData );
    axios
      .put(`${URL}/api/batterie/${id}`, batterieData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Batterie mise à jour avec succès! 🎉";
          // Add a function here to fetch updated batteries if needed
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
    console.log('id', id);
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
    
    axios
      .get(`${URL}/api/batterie/parc/${parcId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        if (response.status === 200) {
          const batteries = response.data; // Récupérer les données des batteries show.showAlert = true; show.showAlertType = "success"; show.showAlertMessage = "Batteries récupérées avec succès! ✅";
          // Vous pouvez ajouter une fonction ici pour traiter les batteries
          console.log(batteries);
          allBatteryData.value = response.data
          // Afficher les batteries dans la console pour le moment
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


    // Charger les parcs au montage du composant
    onMounted(() => {
      try {
        let parcid = useParc.parcSuperviser.id;
        getBatteriesByParcId(parcid);
      } catch (error) {
        
      }
    });
  return {
    nom,
    capaciteNominal,
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
    oneBatteryData,
    registerBatterie, // Register function added here
    updateBatterie,
    deleteBatterie,
    getBatteriesByParcId
  };
});
