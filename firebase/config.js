// Для роботи із firebase обовʼязково треба ініціалізувати проект
import "firebase/auth";

import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCclLouXJq-P-NZSW9ZKM77ctwe_eInhxE",
  authDomain: "myawesomeproject-b1d42.firebaseapp.com",
  databaseURL:
    "https://myawesomeproject-b1d42-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "myawesomeproject-b1d42",
  storageBucket: "myawesomeproject-b1d42.appspot.com",
  messagingSenderId: "806239908840",
  appId: "1:806239908840:web:aa943986c95bf25f3eaa5d",
  measurementId: "G-3VLEV0NYZL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export default initializeApp(firebaseConfig);
