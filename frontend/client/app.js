// Numéro WhatsApp du propriétaire : indicatif pays + numéro, sans « + » ni espaces
const NUMERO_WHATSAPP = '237696058448';

const conteneur = document.getElementById('catalogue');
const message = document.getElementById('message');

function formaterPrix(prix) {
  return Number(prix).toLocaleString('fr-FR') + ' FCFA';
}

function commanderViaWhatsApp(nom, prix) {
  const texte = `Bonjour ! Je suis intéressé par *${nom}* à ${formaterPrix(prix)}. Est-il disponible ?`;
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texte)}`;
  window.open(url, '_blank');
}

function creerCarte(produit) {
  const carte = document.createElement('article');
  carte.className = 'carte';

  // Image, ou espace vide si le produit n'a pas encore de photo
  if (produit.image_url) {
    const img = document.createElement('img');
    img.src = produit.image_url;
    img.alt = produit.nom;
    carte.appendChild(img);
  } else {
    const vide = document.createElement('div');
    vide.className = 'sans-image';
    vide.textContent = 'Photo bientôt disponible';
    carte.appendChild(vide);
  }

  const nom = document.createElement('h2');
  nom.textContent = produit.nom;
  carte.appendChild(nom);

  if (produit.description) {
    const desc = document.createElement('p');
    desc.className = 'description';
    desc.textContent = produit.description;
    carte.appendChild(desc);
  }

  const prix = document.createElement('p');
  prix.className = 'prix';
  prix.textContent = formaterPrix(produit.prix);
  carte.appendChild(prix);

  const stock = document.createElement('p');
  stock.className = produit.stock > 0 ? 'stock' : 'stock epuise';
  stock.textContent = produit.stock > 0 ? `${produit.stock} en stock` : 'Épuisé';
  carte.appendChild(stock);

  const bouton = document.createElement('button');
  bouton.textContent = 'Commander via WhatsApp';
  bouton.disabled = produit.stock <= 0;
  bouton.addEventListener('click', () => commanderViaWhatsApp(produit.nom, produit.prix));
  carte.appendChild(bouton);

  return carte;
}

async function chargerCatalogue() {
  try {
    const reponse = await fetch('/api/produits');
    if (!reponse.ok) throw new Error('Réponse invalide du serveur');
    const produits = await reponse.json();

    if (produits.length === 0) {
      message.textContent = 'Aucun produit disponible pour le moment.';
      return;
    }

    message.remove();
    produits.forEach((produit) => conteneur.appendChild(creerCarte(produit)));
  } catch (erreur) {
    console.error(erreur);
    message.textContent = 'Impossible de charger le catalogue. Réessayez plus tard.';
  }
}

chargerCatalogue();