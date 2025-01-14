import { defineStore } from "pinia";
import { ref } from "vue";

export const useShow = defineStore("Show", () => {
  const showLogin = ref(true);
  const showSingUp = ref(false);
  const showDashBoard = ref(false);
  const showDesc = ref(false);
  const showSpinner = ref(false)

  const showAlert = ref(false)
  const showAlertMessage = ref('')
  const showAlertType = ref('')

  function showLoginFunc() {
    showLogin.value = true;
    showSingUp.value = false;
  }
  function showSingUpFunc() {
    showLogin.value = false;
    showSingUp.value = true;
  }
  function showDashBoardFunc() {
    showLogin.value = false;
    showDashBoard.value = true;
  }

  function showDescFunc() {
    showDesc.value = !showDesc.value;
  }

  const activeMenu = ref("");
  const showParc = ref(false);
  const showBatterie = ref(false);
  const showIncident = ref(false);
  const showHistorique = ref(false);
  const showStatistique = ref(false);

  function setActiveMenu(menuName) {
    activeMenu.value = menuName;
    // setActiveItem("");
    menuName === "Gestion du parc"
      ? (showParc.value = true)
      : (showParc.value = false);

    menuName === "Paramètres de la batterie"
      ? (showBatterie.value = true)
      : (showBatterie.value = false);

    menuName === "Gestion des incidents"
      ? (showIncident.value = true)
      : (showIncident.value = false);

    menuName === "Historique des données"
      ? (showHistorique.value = true)
      : (showHistorique.value = false);

    menuName === "Statistiques et rapports"
      ? (showStatistique.value = true)
      : (showStatistique.value = false);
  }

  const activeMenuItem = ref("");
  const showAcceuil = ref(true);
  const showCreationParc = ref(false);
  const showCalendrierM = ref(false);
  const showRapportP = ref(false);
  const showPlageFonc = ref(false);
  const showSeuilA = ref(false);
  const showListeIncidents = ref(false);
  const showHistoIncidents = ref(false);
  const showVisualisationD = ref(false);
  const showConpressionD = ref(false);
  const showRapportMensuel = ref(false);
  const showRecommendation = ref(false);
  function setActiveItem(itemName) {
    activeMenuItem.value = itemName;
    itemName === "Acceuil"
      ? (showAcceuil.value = true)
      : (showAcceuil.value = false);

    itemName === "Création de parc"
      ? (showCreationParc.value = true)
      : (showCreationParc.value = false);

    itemName === "Calendrier de maintenance"
      ? (showCalendrierM.value = true)
      : (showCalendrierM.value = false);

    itemName === "Rapports de performance"
      ? (showRapportP.value = true)
      : (showRapportP.value = false);

    itemName === "Plages de fonctionnement"
      ? (showPlageFonc.value = true)
      : (showPlageFonc.value = false);

    itemName === "Seuils d'alerte"
      ? (showSeuilA.value = true)
      : (showSeuilA.value = false);

    itemName === "Liste des incidents récents"
      ? (showListeIncidents.value = true)
      : (showListeIncidents.value = false);

    itemName === "Historique des incidents"
      ? (showHistoIncidents.value = true)
      : (showHistoIncidents.value = false);

    itemName === "Visualisation des données"
      ? (showVisualisationD.value = true)
      : (showVisualisationD.value = false);

    itemName === "Compression des données"
      ? (showConpressionD.value = true)
      : (showConpressionD.value = false);
    itemName === "Rapport mensuel de performance"
      ? (showRapportMensuel.value = true)
      : (showRapportMensuel.value = false);

    itemName === "Recommandations d'optimisation"
      ? (showRecommendation.value = true)
      : (showRecommendation.value = false);
  }

  const showBatterieItem = ref("");
  const showBatt1 = ref(false);
  const showBatt2 = ref(false);
  const showBatt3 = ref(false);
  function setShowBatt(itemName) {
    showBatterieItem.value = itemName;
    itemName === "bat1" ? (showBatt1.value = true) : (showBatt1.value = false);
    itemName === "bat2" ? (showBatt2.value = true) : (showBatt2.value = false);
    itemName === "bat3" ? (showBatt3.value = true) : (showBatt3.value = false);
  }

  const showBatt = ref(false);
  const showBatterieItemId = ref()
  function showBattDetails(itemName , itemId) {
    console.log("detail");
    showBatterieItem.value = itemName;
    showBatterieItemId.value = itemId;
    showBatt.value = !showBatt.value;
  }

  function closeBattDetails() {
    showBatt.value = !showBatt.value;
  }

  const showTension = ref(true);
  const showCourant = ref(false);
  const showTensionCourant = ref(false);
  const showGraph = ref("");
  console.log(showGraph);

  function setShowGraph(option) {
    // console.log(option);
    showGraph.value = option;
    option === "Tension"
      ? (showTension.value = true)
      : (showTension.value = false);
    option === "Courant"
      ? (showCourant.value = true)
      : (showCourant.value = false);
    option === "TensionCourant"
      ? (showTensionCourant.value = true)
      : (showTensionCourant.value = false);
  }

  const showCalendrierOption = ref(true);
  const showRecents = ref(true);
  const showHistoriqueCale = ref(false);

  function setShowOptionCal(option) {
    showCalendrierOption.value = option;
    option === "recents"
      ? (showRecents.value = true)
      : (showRecents.value = false);
    option === "historique"
      ? (showHistoriqueCale.value = true)
      : (showHistoriqueCale.value = false);
  }

  const showAddMaintenance = ref(false);

  function showAddMaintenanceFunc() {
    showAddMaintenance.value = !showAddMaintenance.value;
  }

  const showCreationParamBatt = ref(false);
  function showCreationParamBattFunc() {
    showCreationParamBatt.value = !showCreationParamBatt.value;
  }

  const showVisBat1 = ref(true);
  const showVisBat2 = ref(false);
  const showVisBat3 = ref(false);

  const showVisBat1Horo = ref(false);
  const showVisBat2Horo = ref(false);
  const showVisBat3Horo = ref(false);

  const showVisSelect = ref("");

  function setShowVisSelect(option) {
    showVisSelect.value = option;

    if (option === "bat1") {
      showVisBat1.value = true;
      showVisBat1Horo.value = true;
    } else {
      showVisBat1.value = false;
      showVisBat1Horo.value = false;
    }

    if (option === "bat2") {
      showVisBat2.value = true;
      showVisBat2Horo.value = true;
    } else {
      showVisBat2.value = false;
      showVisBat2Horo.value = false;
    }

    if (option === "bat3") {
      showVisBat3.value = true;
      showVisBat3Horo.value = true;
    } else {
      showVisBat3.value = false;
      showVisBat3Horo.value = false;
    }
  }

  const showJour = ref(false);
  const showSemaine = ref(false);
  const showMois = ref(false);
  const showAnnee = ref(false);

  const showSeletHorodatage = ref("Jour");

  function setshowSeletHorodatage(option) {
    showSeletHorodatage.value = option;
    option === "Jour" ? (showJour.value = true) : (showJour.value = false);

    option === "Semaine"
      ? (showSemaine.value = true)
      : (showSemaine.value = false);

    option === "Mois" ? (showMois.value = true) : (showMois.value = false);
    option === "Année" ? (showAnnee.value = true) : (showAnnee.value = false);

    showVisBat1Horo.value = false;
    showVisBat2Horo.value = false;
    showVisBat3Horo.value = false;
  }

  const showNotification = ref(false);
  const showEmail = ref(false);

  function showNotificationFunc() {
    showNotification.value = !showNotification.value;
    if (showEmail.value == true) {
      showEmail.value = false;
    }
  }

  function showEmailFunc() {
    showEmail.value = !showEmail.value;
    if (showNotification.value == true) {
      showNotification.value = false;
    }
  }

  function hideenAlert() {
    showAlert.value = false
    showAlertMessage = ''
    showAlertType = ''
    
  }

  return {
    showLogin,
    showSingUp,
    showDashBoard,
    showDesc,
    activeMenu,
    showParc,
    showBatterie,
    showIncident,
    showHistorique,
    showStatistique,
    activeMenuItem,
    showCreationParc,
    showCalendrierM,
    showRapportP,
    showPlageFonc,
    showSeuilA,
    showListeIncidents,
    showHistoIncidents,
    showVisualisationD,
    showConpressionD,
    showRapportMensuel,
    showRecommendation,
    showAcceuil,
    showBatterieItem,
    showBatt1,
    showBatt2,
    showBatt3,
    showBatt,
    showBatterieItemId,
    showTension,
    showCourant,
    showTensionCourant,
    showCalendrierOption,
    showRecents,
    showHistoriqueCale,
    showAddMaintenance,
    showCreationParamBatt,
    showVisBat1,
    showVisBat2,
    showVisBat3,
    showVisBat1Horo,
    showVisBat2Horo,
    showVisBat3Horo,
    showVisSelect,
    showJour,
    showSemaine,
    showMois,
    showAnnee,
    showSeletHorodatage,
    showEmail,
    showNotification,
    showSpinner,
    showAlert,
    showAlertMessage,
    showAlertType,
    showLoginFunc,
    showSingUpFunc,
    showDashBoardFunc,
    showDescFunc,
    setActiveMenu,
    setActiveItem,
    setShowBatt,
    showBattDetails,
    setShowGraph,
    closeBattDetails,
    setShowOptionCal,
    showAddMaintenanceFunc,
    showCreationParamBattFunc,
    setShowVisSelect,
    setshowSeletHorodatage,
    showNotificationFunc,
    showEmailFunc,
    hideenAlert

  };
});
