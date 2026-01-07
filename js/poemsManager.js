// Lógica de selección, reinicio y marcado de poemas

export function obtenerPoemaDelDia(poemas, progreso) {
  const today = new Date().toDateString();
  let poema;

  if (progreso.poemaHoy && progreso.poemaHoy.fecha === today) {
    poema = poemas.find(p => p.id === progreso.poemaHoy.id);
  } else {
    poema = obtenerPoemaAleatorioNoVisto(poemas, progreso.vistos);
  }

  return poema;
}

export function obtenerPoemaAleatorioNoVisto(poemas, vistos) {
  let noVistos = poemas.filter(p => !vistos.includes(p.id));

  if (noVistos.length === 0) {
    // Reiniciar si ya se vieron todos
    noVistos = [...poemas];
    vistos.length = 0;
  }

  const randomIndex = Math.floor(Math.random() * noVistos.length);
  return noVistos[randomIndex];
}
