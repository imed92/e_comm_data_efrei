// frontend/script.js

// Définir l’URL du backend (ici en local sur le port 3000)
const backendUrl = 'http://localhost:3000';

// Sélectionner tous les boutons "Voir" et leur attacher un événement click
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Récupérer l’ID du produit depuis l’attribut data-id du conteneur parent
        const productId = button.closest('.product').dataset.id;

        // Appeler la fonction pour logger l’interaction "view" avec ce produit
        logInteraction('view', productId);

        // Afficher une alerte à l’utilisateur
        alert(`Vous consultez le produit ${productId}`);
    });
});

// Sélectionner tous les boutons "Ajouter au panier" et leur attacher un événement click
document.querySelectorAll('.cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Récupérer l’ID du produit depuis l’attribut data-id du conteneur parent
        const productId = button.closest('.product').dataset.id;

        // Appeler la fonction pour logger l’interaction "add_to_cart" avec ce produit
        logInteraction('add_to_cart', productId);

        // Afficher une alerte à l’utilisateur
        alert(`Produit ${productId} ajouté au panier`);
    });
});

// Fonction pour envoyer les interactions utilisateur au backend
function logInteraction(action, productId) {
    fetch(`${backendUrl}/log`, {  // Faire une requête POST vers /log
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },  // Indiquer qu’on envoie du JSON
        body: JSON.stringify({
            action: action,                      // Type d’action (view ou add_to_cart)
            productId: productId,                // ID du produit concerné
            timestamp: new Date().toISOString()  // Date et heure au format ISO
        })
    })
    .then(res => {
        // Vérifier si la requête a échoué (par exemple serveur non disponible)
        if (!res.ok) console.error('Erreur de log');
    });
}
