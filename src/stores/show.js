import { defineStore } from "pinia";
import { ref } from "vue";

export const useShow = defineStore("Show", () => {
  const showLogin = ref(true);
  const showLogout = ref(false);
  const showSingUp = ref(false);
  const personelAddImage = ref(false);

  const showDashBoard = ref(false);
  const showDesc = ref(false);
  const showSpinner = ref(false);
  const showProfilDetail = ref(false);
  const showNotificationDetail = ref(false);
  const showParcDetailData = ref({});
  const showParcDetail = ref(true);
  const showVoirAlerteData = ref(false);
  const showAddPersonnel = ref(false);
  const newpersonnelId = ref();

  const showDeleteMaintenanceData = ref();
  const showDeleteMaintenance = ref(false);

  const showDeleteParc = ref(false);
  const showParcNameDelete = ref("");
  const showParcNameDeleteId = ref("");

  const showDelete = ref(false);
  const showDeleteNamePersonnel = ref("");
  const showDeleteIdPersonnel = ref("");

  const showAlertBatterie = ref(false);
  const showAlertBatType = ref("");
  const showAlertBatterieMessage = ref("");
  const competerAlerteBatterieUnRead = ref(0);
  const showPrediction = ref(true);

  const showEditParc = ref(false);
  function showEditParcFunc() {
    showParcDetail.value = !showParcDetail.value;
    showEditParc.value = !showEditParc.value;
  }

  function showDeleteParcFunc(itemdelete, idParc) {
    showParcNameDelete.value = itemdelete;
    showParcNameDeleteId.value = idParc;
    showDeleteParc.value = !showDeleteParc.value;
  }

  function showParcDetailFunc(parcItem) {
    showParcDetail.value = true;
    showEditParc.value = false;
    showParcDetailData.value = parcItem;
  }

  const showNewParc = ref(false);
  function showNewParcFunc() {
    showNewParc.value = !showNewParc.value;
  }

  function showProfilDetailFunc() {
    // closeProfile()
    showDesc.value = false;
    showProfilDetail.value = !showProfilDetail.value;
  }
  function showLogoutFunc() {
    showDesc.value = false;
    showLogout.value = !showLogout.value;
  }

  const showAlert = ref(false);
  const showAlertMessage = ref("");
  const showAlertType = ref("");

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
  const showPerformance = ref(false);

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

    menuName === "Performance"
      ? (showPerformance.value = true)
      : (showPerformance.value = false);
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
  const showEstimation = ref(false);
  const showEstimationDetails = ref(false);
  const selectCard = ref({});
  // function setActiveItem(itemName) {
  //   showEstimationDetails.value=false
  //   activeMenuItem.value = itemName;
  //   itemName === "Acceuil"
  //     ? (showAcceuil.value = true)
  //     : (showAcceuil.value = false);

  //   itemName === "Création de parc"
  //     ? (showCreationParc.value = true)
  //     : (showCreationParc.value = false);

  //   itemName === "Calendrier de maintenance"
  //     ? (showCalendrierM.value = true)
  //     : (showCalendrierM.value = false);

  //   itemName === "Personnels"
  //     ? (showRapportP.value = true)
  //     : (showRapportP.value = false);

  //   itemName === "Plages de fonctionnement"
  //     ? (showPlageFonc.value = true)
  //     : (showPlageFonc.value = false);

  //   itemName === "Seuils d'alerte"
  //     ? (showSeuilA.value = true)
  //     : (showSeuilA.value = false);

  //   itemName === "Liste des incidents récents"
  //     ? (showListeIncidents.value = true)
  //     : (showListeIncidents.value = false);

  //   itemName === "Historique des incidents"
  //     ? (showHistoIncidents.value = true)
  //     : (showHistoIncidents.value = false);

  //   itemName === "Visualisation des données"
  //     ? (showVisualisationD.value = true)
  //     : (showVisualisationD.value = false);

  //   itemName === "Compression des données"
  //     ? (showConpressionD.value = true)
  //     : (showConpressionD.value = false);
  //   itemName === "Rapport mensuel de performance"
  //     ? (showRapportMensuel.value = true)
  //     : (showRapportMensuel.value = false);

  //   itemName === "Recommandations d'optimisation"
  //     ? (showRecommendation.value = true)
  //     : (showRecommendation.value = false);
  //   itemName === "Estimation"
  //     ? (showEstimation.value = true)
  //     : (showEstimation.value = false);
  // }
  function setActiveItem(itemName) {
    activeMenuItem.value = itemName;

    const itemMap = {
      Acceuil: showAcceuil,
      "Création de parc": showCreationParc,
      "Calendrier de maintenance": showCalendrierM,
      Personnels: showRapportP,
      "Plages de fonctionnement": showPlageFonc,
      "Seuils d'alerte": showSeuilA,
      "Liste des incidents récents": showListeIncidents,
      "Historique des incidents": showHistoIncidents,
      "Visualisation des données": showVisualisationD,
      "Compression des données": showConpressionD,
      "Rapport mensuel de performance": showRapportMensuel,
      "Recommandations d'optimisation": showRecommendation,
      Estimation: showEstimation,
      "Estimation detail": showEstimationDetails,
    };

    // Réinitialiser toutes les valeurs à false
    for (const key in itemMap) {
      itemMap[key].value = false;
    }

    // Activer l'élément sélectionné
    if (itemMap[itemName]) {
      itemMap[itemName].value = true;
    }
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
  const showBatterieItemId = ref();
  function showBattDetails(itemName, itemId) {
    console.log("id batt detail", itemId);
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

  function setShowGraph(option) {
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

  function showNotificationDetailFunc() {
    showNotification.value = false;
    showNotificationDetail.value = !showNotificationDetail.value;
  }

  const notifData = ref({});
  const showNotificationDetailOne = ref(false);

  function showNotificationDetailOneFunc(notif) {
    notifData.value = notif;
    showNotificationDetailOne.value = true;
  }

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
    showAlert.value = false;
    showAlertMessage.value = "";
    showAlertType.value = "";
  }

  return {
    showLogin,
    showSingUp,
    personelAddImage,
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
    competerAlerteBatterieUnRead,
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
    selectCard,
    showPrediction,
    showSeletHorodatage,
    showEmail,
    showEstimation,
    showEstimationDetails,
    showNotification,
    showSpinner,
    showAlert,
    showAlertMessage,
    showAlertBatterie,
    showAlertBatType,
    showAlertBatterieMessage,
    showAlertType,
    showProfilDetail,
    showLogout,
    showNotificationDetail,
    showNotificationDetailOne,
    notifData,
    showNewParc,
    showParcDetailData,
    showParcDetail,
    showDeleteParc,
    showPerformance,
    showParcNameDelete,
    showParcNameDeleteId,
    showDelete,
    showDeleteNamePersonnel,
    showDeleteIdPersonnel,
    showEditParc,
    showDeleteMaintenanceData,
    showDeleteMaintenance,
    showVoirAlerteData,
    showAddPersonnel,
    newpersonnelId,
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
    hideenAlert,
    showProfilDetailFunc,
    showLogoutFunc,
    showNotificationDetailFunc,
    showNotificationDetailOneFunc,
    showNewParcFunc,
    showParcDetailFunc,
    showDeleteParcFunc,
    showEditParcFunc,
  };
});
