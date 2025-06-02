// backend/server.js

const express = require('express'); // On importe express qui est un framework node js
const fs = require('fs'); // On importe la librairie fs qui permet de lire et ecrire dans des fichiers
const cors = require('cors'); // Cors ici est une librairie qui permet de passe outre le blocage cors
const app = express(); // On utilise express qui est un framework node js
const port = 3000; // On définit su quel port sera lancé le backend

app.use(cors());
app.use(express.json());

// ici on créer une route en méthode post nommée '/log'
// Cette route premet d'enregistrer une interaction utilisateur
app.post('/log', (req, res) => {
    const log = req.body;

    // Lire le fichier actuel
    fs.readFile('data.json', (err, data) => {
        const logs = data.length ? JSON.parse(data) : [];
        logs.push(log);

        // Écrire à nouveau dans le fichier
        fs.writeFile('data.json', JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error('Erreur d’écriture', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Backend en écoute sur http://localhost:${port}`);
});
