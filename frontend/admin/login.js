const formulaire = document.getElementById('form-login');
const erreur = document.getElementById('erreur');

// Déjà connecté : on va directement au tableau de bord
if (localStorage.getItem('token')) {
  window.location.href = 'dashboard.html';
}

formulaire.addEventListener('submit', async (e) => {
  e.preventDefault();
  erreur.hidden = true;

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const reponse = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const donnees = await reponse.json();

    if (!reponse.ok) {
      erreur.textContent = donnees.erreur || 'Connexion impossible';
      erreur.hidden = false;
      return;
    }

    localStorage.setItem('token', donnees.token);
    window.location.href = 'dashboard.html';
  } catch (err) {
    console.error(err);
    erreur.textContent = 'Serveur injoignable. Réessayez plus tard.';
    erreur.hidden = false;
  }
});