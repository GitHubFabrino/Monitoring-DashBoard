class Cookies {
  // Méthode pour obtenir la valeur d'un cookie par son nom
  get(name) {
    // Utilise une expression régulière pour rechercher le cookie par son nom
    let matches = document.cookie.match(
      new RegExp(
        "(?:^|; )" + // Rechercher le début de la chaîne ou un point-virgule suivi d'un espace
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + // Échapper les caractères spéciaux dans le nom du cookie
          "=([^;]*)" // Capturer la valeur du cookie jusqu'à un point-virgule ou la fin de la chaîne
      )
    );
    // Si une correspondance est trouvée, renvoyer la valeur du cookie décodée ; sinon, renvoyer undefined
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

  // Méthode pour définir un cookie avec un nom, une valeur et des options supplémentaires
  set(name, value, options = { secure: true, samesite: "strict" }) {
    // Fusionne les options par défaut avec celles fournies par l'utilisateur
    options = {
      path: "/", // Définit le chemin par défaut du cookie
      ...options,
    };
    // Si l'option expires est une date, la convertir en chaîne de caractères UTC
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    // Crée la chaîne de cookie en encodant le nom et la valeur du cookie
    let updatedCookie =
      encodeURIComponent(name) + "=" + encodeURIComponent(value);
    // Ajoute les options supplémentaires au cookie
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      // Ajoute la valeur de l'option si elle n'est pas true
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    // Définit le cookie dans le document
    document.cookie = updatedCookie;
  }

  // Méthode pour supprimer un cookie par son nom
  delete(name) {
    // Définit le cookie avec une durée de vie expirée pour le supprimer
    this.set(name, "", {
      "max-age": 1,
    });
  }
}

export { Cookies };
