// Écouter la soumission du formulaire 
document.getElementById('form-examen').addEventListener('submit', function(event) {
 
  // Empêcher le rechargement de la page 
  event.preventDefault();
 
  // Construire l'objet examen 
  const examen = { 
    nom : document.getElementById('nom').value,
    duree : document.getElementById('duree').value,
    description : document.getElementById('description').value,
    proprietaire : document.getElementById('proprietaire').value,
    questions: [] 
  }; 
 
  // Construire la clé de stockage basée sur le propriétaire 
  const key = 'examens_' + examen.proprietaire;
 
  // Lire les examens existants (ou tableau vide si rien) 
  let examens = JSON.parse(localStorage.getItem(key)) || [];
 
  // Ajouter le nouvel examen et sauvegarder 
  examens.push(examen);
  localStorage.setItem(key, JSON.stringify(examens));
 
  alert('Examen ajouté avec succès !'); 
  this.reset(); 
}); 