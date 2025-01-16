import { defineStore } from "pinia";
import { useShow } from "@/stores/show";
import { useUrl } from "@/stores/url";
import { ref, onMounted } from "vue";
import axios from "axios";

export const parcStore = defineStore("Parc", () => {
  const show = useShow();
  const URL = useUrl().url;

  const parc = ref("");
  const description = ref("");
  const adresse = ref("");
  const nombreBat = ref("");
  const phone = ref("");
  const email = ref("pierret@gmail.com");
  const parcsData = ref({});

  function register() {
    show.showNewParc = false;
    show.showSpinner = true;
    let formData = new FormData();
    formData.append("nom_parc", parc.value);
    formData.append("description", description.value || "");
    formData.append("adresse", adresse.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value || "");
    formData.append("nombre_batteries", parseInt(nombreBat.value, 10) || 0);
    formData.append(
      "user_id",
      JSON.parse(localStorage.getItem("user")).user.id
    );

    axios
      .post(`${URL}/api/parcs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Enregistré";
          getParcs(JSON.parse(localStorage.getItem("user")).user.id);
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échoué";
          show.showNewParc = true;
        }

        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        show.showNewParc = true;
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Remplire les champs obligatoire";
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

  function getParcs(userId) {
    axios
      .get(`${URL}/api/parcs/user/${userId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("tena ", response.data);
        parcsData.value = response.data;
        show.showParcDetailData.value = response.data[0];
        console.log("ito ary", show.showParcDetailData.value);

        // Assigner les parcs récupérés au ref
      })
      .catch((err) => {
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Erreur lors de la récupération des parcs";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function deleteParc(parcId) {
    show.showDeleteParc = false
    show.showSpinner = true;
    axios
      .delete(`${URL}/api/parcs/${parcId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("tena vofafa", response.data);
        if (response.status === 204) {
          getParcs(JSON.parse(localStorage.getItem("user")).user.id);
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Parc supprimé";
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échoué";
        }

        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);

        // Assigner les parcs récupérés au ref
      })
      .catch((err) => {
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Erreur lors de la suppression du donnée";
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
    const userId = JSON.parse(localStorage.getItem("user")).user.id;
    getParcs(userId);
  });

  return {
    parc,
    description,
    adresse,
    nombreBat,
    phone,
    email,
    parcsData,
    register,
    getParcs,
    deleteParc
  };
});
