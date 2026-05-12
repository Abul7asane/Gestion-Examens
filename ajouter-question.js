// Écouter le clic sur "Ajouter une proposition"
document.getElementById('add-proposition').addEventListener('click', () => { 
 
  // Créer un conteneur <div> 
  const propositionDiv = document.createElement('div');
 
  // Créer la case à cocher (checkbox) 
  const checkbox = document.createElement('input'); 
  checkbox.type = 'checkbox'; 
  checkbox.name = 'proposition';
 
  // Créer le champ texte de la proposition 
  const input = document.createElement('input'); 
  input.type = 'text'; 
  input.name = 'proposition-text';
 
  // Ajouter checkbox et input dans le conteneur 
  propositionDiv.appendChild(checkbox);
  propositionDiv.appendChild(input);
 
  // Ajouter le conteneur dans la zone des propositions 
  document.getElementById('propositions').appendChild(propositionDiv);
  // Afficher le champ de proposition s'il est caché
  if(document.getElementById('field-proposition').style.display === 'none') {
    document.getElementById('field-proposition').style.display = 'block';
  }
});

document.getElementById('form-question').addEventListener('submit', function(e) {
  e.preventDefault(); 
 
  // Lire les valeurs du formulaire
  const proprietaire = document.getElementById('proprietaire').value;
  const nomExamen = document.getElementById('examen').value;
  const enonce = document.getElementById('enonce').value;
  const duree = document.getElementById('duree').value;
  const points = document.getElementById('points').value;
  
 
  // Collecter les propositions depuis le DOM 
  const propositions = []; 
  document.querySelectorAll('#propositions div').forEach(div => { 
    const checkbox = div.querySelector('input[type="checkbox"]'); 
    const textInput = div.querySelector('input[type="text"]');
    propositions.push({ checked: checkbox.checked, text: textInput.value });
  }); 
 
  // Récupérer les examens du localStorage 
  const key = 'examens_' + proprietaire; 
  const examens = JSON.parse(localStorage.getItem(key)) || [];
 
  // Trouver l'examen par son nom 
  const exam = examens.find(examen => examen.nom === nomExamen);
  // Vérifier que l'examen existe 
  if (!exam) { 
    alert('Examen non trouvé pour ce propriétaire !');
    return; 
  } 
  // Construire la question et l'ajouter 
  const question = { enonce, duree, points, propositions };
  exam.questions.push(question);
  
  localStorage.setItem(key, JSON.stringify(examens));

  alert('Question ajoutée avec succès !');

  this.reset(); 
  document.getElementById('propositions').innerHTML = '';
  document.getElementById('field-proposition').style.display = 'none';
});
