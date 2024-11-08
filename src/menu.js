view_menuPrincipal();

function view_menuPrincipal() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido a sabiondo el juego de preguntas</h1>
    <h2>Menú Principal</h2>
    <button class="iniciar" onclick="view_iniciar_juego()">1. Iniciar Juego</button>
    <br><br>
    <button class="historico" onclick="ctrl_verHistorico()">2. Ver Histórico</button>
  `;
}

// Función para iniciar el juego
function ctrl_iniciarJuego() {  
  try {
    view_iniciar_juego();
  } catch (error) {
    console.error("Error al iniciar el juego:", error);
  }
}



// Función para volver al menú principal
function ctrl_irAMenuPrincipal() {
  view_menuPrincipal();
}

// Función para ver el histórico
function ctrl_verHistorico() {
  console.log('Botón "Ver Histórico" presionado'); // Mensaje de depuración
  view_historico();
}

// Nueva función para mostrar el histórico
async function view_historico() {
  try {
    console.log('Solicitando datos del histórico'); // Mensaje de depuración
    const response = await fetch('http://localhost:3000/historico'); // Llama a tu endpoint
    if (!response.ok) {
      throw new Error('Error en la respuesta de la red');
    }
    const historicoData = await response.json(); // Obtiene el JSON
    console.log('Datos del histórico recibidos:', historicoData); // Mensaje de depuración

    // Crea la vista del histórico
    let html = '<h1>Histórico de Puntajes</h1>';
    html += '<table><tr><th>Nickname</th><th>Ranking</th></tr>';
    
    historicoData.forEach(entry => {
      html += `<tr><td>${entry.Nickname}</td><td>${entry.Ranking}</td></tr>`;
    });

    html += '</table>';
    
    document.getElementById("root").innerHTML = html; // Muestra el histórico en el elemento con id "root"
  } catch (error) {
    console.error('Error al obtener el histórico:', error);
    document.getElementById("root").innerHTML = '<p>Error al cargar el histórico. Por favor, intenta de nuevo.</p>';
  }
}

// Control de la música de fondo
const music = document.getElementById("background-music");
const toggleButton = document.getElementById("toggle-music-btn");

function toggleMusic() {
  if (music.paused) {
    music.play();
    toggleButton.textContent = "🔊"; // Cambia el ícono cuando la música está activa
  } else {
    music.pause();
    toggleButton.textContent = "🔇"; // Cambia el ícono cuando la música está en pausa
  }
}

// Iniciar con el ícono correcto según el estado inicial de la música
window.onload = function() {
  if (music.paused) {
    toggleButton.textContent = "🔇";
  } else {
    toggleButton.textContent = "🔊";
  }
};
