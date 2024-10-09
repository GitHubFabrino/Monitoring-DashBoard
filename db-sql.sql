CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
);



CREATE TABLE Utilisateur (
    id INT AUTO_INCREMENT PRIMARY KEY,
    telephone VARCHAR(20),
    poste VARCHAR(50),
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    url_image VARCHAR(255),
    user_id int,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    
);
CREATE TABLE Client (
    id INT AUTO_INCREMENT PRIMARY KEY,
    prenom VARCHAR(50) NOT NULL,
    nom VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telephone VARCHAR(20),
    entreprise VARCHAR(100),
    poste VARCHAR(50),
    url_image VARCHAR(255),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Entreprise (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    proprietaire VARCHAR(100),
    responsable VARCHAR(100),
    nom_de_domaine VARCHAR(100),
    telephone VARCHAR(20),
    secteur_activite VARCHAR(100),
    ville VARCHAR(100),
    code_postal VARCHAR(20),
    url_image VARCHAR(255),
    email VARCHAR(255),
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Note (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    contenu TEXT NOT NULL,
    client_id INT,
    entreprise_id INT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES Client(id),
    FOREIGN KEY (entreprise_id) REFERENCES Entreprise(id)
);
CREATE TABLE Activite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    contenu TEXT NOT NULL,
    client_id INT,
    entreprise_id INT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES Client(id),
    FOREIGN KEY (entreprise_id) REFERENCES Entreprise(id)
);
CREATE TABLE Tache (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    contenu TEXT NOT NULL,
    client_id INT,
    entreprise_id INT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES Client(id),
    FOREIGN KEY (entreprise_id) REFERENCES Entreprise(id)
);
CREATE TABLE Email (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destinataire VARCHAR(255) NOT NULL,
    envoyeur VARCHAR(255) NOT NULL,
    objet VARCHAR(255) NOT NULL,
    date_envoi DATE NOT NULL,
    heure_envoi TIME NOT NULL
);
CREATE TABLE Appel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destinataire VARCHAR(255) NOT NULL,
    envoyeur VARCHAR(255) NOT NULL,
    duree TIME NOT NULL,
    note TEXT,
    date_appel DATE NOT NULL,
    heure_appel TIME NOT NULL
);
