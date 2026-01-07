// Configuración e inicialización de Firebaseimport { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCm1lRH0MOrEGfJo7q9UXcILgmXKapAftE",
  authDomain: "poemasapp-a72d3.firebaseapp.com",
  projectId: "poemasapp-a72d3",
  storageBucket: "poemasapp-a72d3.firebasestorage.app",
  messagingSenderId: "996053268517",
  appId: "1:996053268517:web:d0b08bcc0d0dcf42e4e7cc"
};

// Inicialización
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Autenticación anónima
signInAnonymously(auth)
  .then(() => console.log("✅ Usuario anónimo autenticado"))
  .catch(err => console.error("❌ Error en auth:", err));

export { db };
