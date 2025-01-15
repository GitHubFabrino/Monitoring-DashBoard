export function formatDateAndTime(isoDateString) {
    // Créer un nouvel objet Date à partir de la chaîne de date ISO
    const date = new Date(isoDateString); // Vérifier si l'objet Date est valide
    if (isNaN(date.getTime())) {
      return undefined;
    } // Extraire et formater les composants de la date et de l'heure
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}   ${hours}:${minutes}`
  } 