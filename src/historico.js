
// Función para obtener el histórico desde el servidor
async function obtenerHistorico() {
  try {
    const response = await fetch('http://localhost:3000/historico');  // URL del endpoint
    const historico = await response.json();

    // Guardar los datos en el modelo para usarlos en la tabla
    modelo.historico = historico.map(jugador => ({
      nickname: jugador.Nickname,
      totalAcumulado: jugador.Ranking
    }));

    // Actualizar la vista para mostrar el histórico
    view_historico();
  } catch (error) {
    console.error('Error al obtener el histórico:', error);
  }
}

// Modificar `view_historico` para que llame a `obtenerHistorico` antes de mostrar la tabla
function view_historico() {
  document.getElementById("root").innerHTML = `
    <h1>Bienvenido al juego de preguntas</h1>
    <h3>Tabla de histórico de partidas:</h3>
    <table>${mostrarHistorico()}</table>
    <br><br>
    <button onclick="ctrl_irAMenuPrincipal()">Regresar al menú principal</button>
  `;
}

// Modificar `mostrarHistorico` para que use los datos obtenidos
function mostrarHistorico() {
  if (!modelo.historico || modelo.historico.length === 0) {
    return `<tr><td colspan="2">No hay partidas en el histórico</td></tr>`;
  }

  let tabla = `<tr><th>Nickname</th><th>Acumulado</th></tr>`;
  
  modelo.historico.forEach((partida) => {
    tabla += `<tr><td>${partida.nickname}</td><td>${partida.totalAcumulado}</td></tr>`;
  });
  
  return tabla;
}

// Llama a `obtenerHistorico` para cargar y mostrar los datos al abrir la vista
function ctrl_verHistorico() {
  obtenerHistorico();
}

function ctrl_irAMenuPrincipal() {
  view_menuPrincipal();
}
