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

  const nom_parcEdit = ref("");
  const descriptionEdit = ref("");
  const adresseEdit = ref("");
  const nombre_batteriesEdit = ref("");
  const emailEdit = ref("");
  const phoneEdit = ref("");
  const choixEmailEdit = ref("");
  const choixPhoneEdit = ref("");
  const idContactEmailEdit = ref("");
  const idContactPhoneEdit = ref("");
  const parcIdEdit = ref("");

  function register() {
    show.showNewParc = false;
    show.showSpinner = true;
    let formData = new FormData();
    let allParc;
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
          show.showAlertMessage = "Enregistré avec succès! 🎉";
          getParcs(
            JSON.parse(localStorage.getItem("user")).user.id,
            "register"
          );
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de l'enregistrement. ❌";
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

  function getParcs(userId, type) {
    axios
      .get(`${URL}/api/parcs/user/${userId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("tena ", response.data);
        parcsData.value = response.data;

        if (type === "all") {
          show.showParcDetailData.value = response.data[0];
          parcIdEdit.value = response.data[0].id;
          console.log("ito ary", show.showParcDetailData.value);
        } else if (type === "register") {
          let index = response.data.length > 0 ? response.data.length - 1 : 0;
          console.log("index", index);
          show.showParcDetailData.value = response.data[index];
          parcIdEdit.value = response.data[index].id;
          console.log("ito ary", show.showParcDetailData.value);
        } else {
          // Traiter d'autres types si nécessaire
          console.warn("Type non reconnu:", type);
        }

        // Assigner les parcs récupérés au ref
      })
      .catch((err) => {
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Erreur lors de la récupération des parcs. ❌";
        console.error(err);
        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      });
  }

  function deleteParc(parcId) {
    show.showDeleteParc = false;
    show.showSpinner = true;
    axios
      .delete(`${URL}/api/parcs/${parcId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("tena vofafa", response.data);
        if (response.status === 204) {
          getParcs(JSON.parse(localStorage.getItem("user")).user.id, "all");
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Parc supprimé avec succès! 🗑️";
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de la suppression. ❌";
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

  function update(idParc) {
    show.showSpinner = true;

    console.log("nom_parcEdit", nom_parcEdit.value);
    console.log("descriptionEdit", descriptionEdit.value);
    console.log("adresseEdit", adresseEdit.value);
    console.log("nombre_batteriesEdit", nombre_batteriesEdit.value);
    console.log("emailEdit", emailEdit.value);
    console.log("phoneEdit", phoneEdit.value);
    console.log("choixEmailEdit", choixEmailEdit.value);
    console.log("choixPhoneEdit", choixPhoneEdit.value);
    console.log("idContactEmailEdit", idContactEmailEdit.value);
    console.log("idContactPhoneEdit", idContactPhoneEdit.value);
    console.log("parcIdEdit", parcIdEdit.value);

    let formData = {
      nom_parc: nom_parcEdit.value,
      description: descriptionEdit.value,
      adresse: adresseEdit.value,
      nombre_batteries: nombre_batteriesEdit.value,
      user_id: JSON.parse(localStorage.getItem("user")).user.id,
      emailEdit: emailEdit.value,
      phoneEdit: phoneEdit.value,
      choixEmailEdit: choixEmailEdit.value,
      choixPhoneEdit: choixPhoneEdit.value,
      idContactEmailEdit: idContactEmailEdit.value,
      idContactPhoneEdit: idContactPhoneEdit.value,
    };

    axios
      .put(`${URL}/api/parcs/${idParc}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Enregistré avec succès! ✅";
          getParcs(JSON.parse(localStorage.getItem("user")).user.id, "all");
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de la mise à jour. ❌";
        }

        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
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

  // Charger les parcs au montage du composant
  onMounted(() => {
    const userId = JSON.parse(localStorage.getItem("user")).user.id;
    getParcs(userId, "all");
  });

  return {
    parc,
    description,
    adresse,
    nombreBat,
    phone,
    email,
    parcsData,
    nom_parcEdit,
    descriptionEdit,
    adresseEdit,
    nombre_batteriesEdit,
    emailEdit,
    phoneEdit,
    choixEmailEdit,
    choixPhoneEdit,
    parcIdEdit,
    idContactEmailEdit,
    idContactPhoneEdit,
    register,
    getParcs,
    deleteParc,
    update,
  };
});
