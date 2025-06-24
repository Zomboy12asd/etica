let scores = [0, 0, 0];
let decisions = [];
let currentStep = 0;

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

function showSection(id) {
  ['inicio', 'tips', 'minijuegos', 'nosotros', 'encuesta'].forEach(sec => {
    document.getElementById(sec).classList.add('hidden');
  });
  document.getElementById(id).classList.remove('hidden');
  if (id === 'minijuegos') startStory();
}

const tips = [
  'No publiques fotos sin permiso.',
  'Piensa antes de compartir en redes.',
  'Respeta la privacidad de los demás.',
  'Verifica la información antes de difundirla.',
  'No descargues software pirata.',
  'Evita el ciberacoso en cualquier forma.',
  'Protege tus contraseñas y datos personales.',
  'Usa la tecnología para construir, no para destruir.',
  'No uses inteligencia artificial para hacer trampa.',
  'Da crédito a los autores de los contenidos.',
  'Configura bien la privacidad de tus dispositivos.',
  'No uses dispositivos ajenos sin autorización.',
  'Revisa los permisos de las apps.',
  'Piensa en las consecuencias de lo que publicas.',
  'Cambia tus contraseñas regularmente.'
];

function showTip() {
  const tip = tips[Math.floor(Math.random() * tips.length)];
  document.getElementById('tip-content').textContent = tip;
}

function startStory() {
  currentStep = 0;
  decisions = [];
  document.getElementById('final-results').classList.add('hidden');
  document.getElementById('next-button').classList.remove('hidden');
  document.getElementById('restart-button').classList.add('hidden');
  document.getElementById('game-container').classList.remove('hidden');
  showDecision();
}

function showDecision() {
  const storyElement = document.getElementById('story');
  const container = document.getElementById('game-container');
  let storyText = '';
  let optionsHTML = '';

  const steps = [
    ["Juan es un estudiante...", ["Ayudar", "No ayudar"]],
    ["Pedro copia sin citar...", ["Decir", "Ignorar"]],
    ["Pedro se molesta...", ["Insistir", "Dejar"]],
    ["Pedro acepta pero se aleja...", ["Celebrar", "Disculparse"]],
    ["Pedro se aleja más...", ["Hablar", "Dejar"]],
    ["Pedro agradece...", ["Seguir", "Distanciar"]],
    ["Terminan la tarea...", ["CelebrarAmistad", "Ignorar"]]
  ];

  if (currentStep < steps.length) {
    const [text, options] = steps[currentStep];
    storyText = text;
    optionsHTML = options.map(opt => `<button onclick="makeDecision('${opt}')">${opt}</button>`).join('');
  } else {
    showFinalResults();
    return;
  }

  storyElement.textContent = storyText;
  container.innerHTML = optionsHTML;
}

function makeDecision(decision) {
  decisions.push(decision);
  currentStep++;
  showDecision();
}

function showFinalResults() {
  document.getElementById('next-button').classList.add('hidden');
  document.getElementById('game-container').classList.add('hidden');
  document.getElementById('final-results').classList.remove('hidden');
  document.getElementById('restart-button').classList.remove('hidden');

  let correct = ['ayudar', 'decir', 'insistir', 'hablar', 'seguir', 'celebrarAmistad'];
  let html = "<h3>Decisiones de Juan:</h3><ul class='decision-list'>";
  decisions.forEach((d, i) => {
    const isCorrect = correct.includes(d);
    html += `<li>Decisión ${i + 1}: ${d} - <span class='${isCorrect ? 'correct' : 'incorrect'}'>${isCorrect ? 'Correcta' : 'Incorrecta'}</span></li>`;
  });
  html += "</ul><h3>Reflexión:</h3><p class='reflection'>Las decisiones reflejan la importancia de actuar con ética y responsabilidad...</p>";
  document.getElementById('final-results').innerHTML = html;
}

function restartStory() {
  startStory();
}

function submitSurvey() {
  const val = document.getElementById('satisfaction').value;
  const com = document.getElementById('comments').value;
  const fb = document.getElementById('survey-feedback');
  fb.textContent = `Gracias por tu calificación de ${val} estrellas. Tus comentarios: ${com}`;
  fb.classList.remove('hidden');
  document.getElementById('survey-form').reset();
}
