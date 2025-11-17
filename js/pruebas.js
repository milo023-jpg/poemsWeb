import { obtenerProgreso, guardarProgreso } from './firestoreService.js';
import { obtenerPoemaDelDia } from './poemsManager.js';

async function init() {
  try {
    // 1️⃣ Cargar poemas y progreso desde Firebase
    //const res = await fetch('data/poemas.json');
    const res = await fetch('https://raw.githubusercontent.com/milo023-jpg/poemsWeb/refs/heads/main/data/poemas.json');
    const poemas = await res.json();
    const progreso = await obtenerProgreso();

    // 2️⃣ Obtener poema del día
    const today = new Date().toDateString();
    const poema = obtenerPoemaDelDia(poemas, progreso);

    // 3️⃣ Si es nuevo poema hoy, actualizar progreso
    if (!progreso.poemaHoy || progreso.poemaHoy.fecha !== today) {
      const nuevosVistos = [...new Set([...progreso.vistos, poema.id])];
      const nuevoPoemaHoy = { id: poema.id, fecha: today };
      await guardarProgreso(nuevosVistos, nuevoPoemaHoy);
      progreso.vistos = nuevosVistos;
    }

    // 4️⃣ Mostrar poema del día
    mostrarPoema(poema);

    // 5️⃣ Mostrar todos los poemas, marcando los vistos
    mostrarListaPoemas(poemas, progreso.vistos);


  } catch (error) {
    console.error("❌ Error al inicializar:", error);
    document.getElementById('poema-container').textContent =
      'Error al cargar los poemas 😢';
  }
}

function mostrarPoema(poema) {
  document.getElementById('titulo').textContent = poema.titulo;
  document.getElementById('texto').textContent = poema.texto;
}

function mostrarListaPoemas(poemas, vistos) {
  const lista = document.getElementById('lista-poemas');
  const contador = document.getElementById('contador-poemas');
  lista.innerHTML = '';

  // Filtra solo poemas vistos
  const poemasVistos = poemas.filter(poema => vistos.includes(poema.id));
  
  // Mostrar contador de progreso
  contador.textContent = `Has visto ${vistos.length} de ${poemas.length} poemas`;

  // Si no hay poemas vistos
  if (poemasVistos.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Aún no has leído ningún poema 💗';
    li.style.opacity = '0.7';
    li.style.fontStyle = 'italic';
    lista.appendChild(li);
    return;
  }

  // Mostrar todos los poemas, marcando los vistos
  poemasVistos.forEach(poema => {
    const li = document.createElement('li');
    li.textContent = `${poema.id}. ${poema.texto}`;
    li.classList.add('visto');
    lista.appendChild(li);


    // Al hacer clic en un poema, se muestra su contenido
    li.addEventListener('click', () => mostrarPoema(poema));
    lista.appendChild(li);
  });
}


init();
