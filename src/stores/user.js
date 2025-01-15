import { defineStore } from "pinia";
import { useShow } from "@/stores/show";
import { useUrl } from "@/stores/url";
import { ref } from "vue";
import axios from "axios";

export const useUser = defineStore("User", () => {
  const show = useShow();
  const URL = useUrl().url;

  const email = ref("");
  const password = ref("");
  const name = ref("");
  const nom_photo_profile = ref("");
  const validation_compte = ref("");
  const userpseudo = ref("");
  const userphone = ref("");
  const useradresse = ref("");

  const Oldemail = ref("");
  const Oldpassword = ref("");
  const Oldname = ref("");
  const Oldpseudo = ref("");
  const Oldphone = ref("");
  const Oldadresse = ref("");

  const userInfo = ref({});
  const userName = ref("");
  const userEmail = ref("");
  const OlduserName = ref("");
  const OlduserEmail = ref("");
  const isEditing = ref(false);

  function register() {
    show.showSpinner = true;
    let formData = new FormData();
    formData.append("email", email.value);
    formData.append("password", password.value || "");
    formData.append("name", name.value);

    formData.append("username", userpseudo.value);
    formData.append("phone", userphone.value || "");
    formData.append("adresse", useradresse.value);

    formData.append("nom_photo_profile", nom_photo_profile.value || "");
    formData.append("validation_compte", validation_compte.value || "");

    show.showSpinner = true;
    axios
      .post(`${URL}/api/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.status === 201) {
          show.showSingUp = false;
          show.showDashBoard = true;
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Enregistré";
          userInfo.value = JSON.stringify(response.data);
          userName.value = response.data.name
          userEmail.value = response.data.email
          console.log("eeeeeeeeeeee",userInfo.value );
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
      })
      .catch((err) => {
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Nom ou email existe déjà";
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

  function login() {
    show.showSpinner = true;
    let formData = new FormData();
    formData.append("email", email.value);
    formData.append("password", password.value);

    console.log("email", email.value);
    console.log("mdp", password.value);
    axios
      .post(`${URL}/api/login`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        if (response.status === 200) {
          show.showLogin = false;
          show.showDashBoard = true;
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Enregistré";

          document.cookie = `access_token=${response.data.access_token};path=/;max-age=${response.data.expires_in}`;
          localStorage.setItem("user", JSON.stringify(response.data));
          userInfo.value = response.data.user;
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = response.data.error;
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
        show.showAlertMessage = "Mot de passe ou email incorrect";
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

  // Nouvelle fonction pour mettre à jour le profil
  function updateProfile(userId) {
    let formData = {
      name: userName.value,
      email: userEmail.value,
      username: userpseudo.value,
      phone: userphone.value,
      adresse: useradresse.value,
    };
    console.log("UPDATE", formData);

    axios
      .put(`${URL}/api/user/${userId}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      })
      .then((response) => {
        console.log("response", response.data);
        if (response.status === 200) {
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Profil mis à jour";
          userInfo.value = response.data;
          console.log("userInfo", userInfo.value.name);

          isEditing.value = false;
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de la mise à jour";
          userName.value = OlduserName.value;
          userEmail.value = OlduserEmail.value;
        }

        setTimeout(() => {
          show.showAlert = false;
          show.showAlertType = "";
          show.showAlertMessage = "";
        }, 3000);
      })
      .catch((err) => {
        userName.value = OlduserName.value;
        userEmail.value = OlduserEmail.value;
        show.showSpinner = false;
        show.showAlert = true;
        show.showAlertType = "warning";
        show.showAlertMessage = "Erreur lors de la mise à jour du profil";
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

  function logout() {
    show.showSpinner = true;
    axios
      .post(
        `${URL}/api/logout`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      )
      .then((response) => {
        console.log("response", response.data);
        if (response.status === 200) {
          show.showLogout = false;
          show.showDashBoard = false;
          show.showLogin = true;
          show.showAlert = true;
          show.showAlertType = "success";
          show.showAlertMessage = "Déconnexion réussie";
          document.cookie = `access_token=;path=/;max-age=0`;
          localStorage.removeItem("user");
        } else {
          show.showAlert = true;
          show.showAlertType = "danger";
          show.showAlertMessage = "Échec de la déconnexion";
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
        show.showAlertMessage = "Erreur lors de la déconnexion";
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

  return {
    email,
    password,
    name,
    nom_photo_profile,
    validation_compte,
    userInfo,
    userName,
    userEmail,
    OlduserName,
    OlduserEmail,
    isEditing,
    userpseudo,
    userphone,
    useradresse,
    Oldemail,
    Oldpassword,
    Oldname,
    Oldpseudo,
    Oldphone,
    Oldadresse,
    register,
    login,
    updateProfile,
    logout,
  };
});
