// Funciones para leer/escribir progreso en Firestore

import { db } from './firebaseConfig.js';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const docRef = doc(db, "usuarios", "progreso_poemas");

export async function obtenerProgreso() {
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  } else {
    await setDoc(docRef, { vistos: [], poemaHoy: null });
    return { vistos: [], poemaHoy: null };
  }
}

export async function guardarProgreso(vistos, poemaHoy) {
  await setDoc(docRef, { vistos, poemaHoy });
}
