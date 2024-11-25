// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ToastAndroid } from "react-native";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsomsQx-zY-8FuQd8MGJq4D26DkgyUPVM",
  authDomain: "placemaps-9a79c.firebaseapp.com",
  projectId: "placemaps-9a79c",
  storageBucket: "placemaps-9a79c.firebasestorage.app",
  messagingSenderId: "629758455160",
  appId: "1:629758455160:web:f67f36cda0f7a54ff52c8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add favorite place
export const handleSetFavorite = async (place: any, user: any) => {
  try {
    await setDoc(doc(db, "favorite-places-list", place.id), {
      ...place,
      email: user?.primaryEmailAddress?.emailAddress,
    });
    ToastAndroid.show("Producto agregado a favoritos", ToastAndroid.TOP);
  } catch (error) {
    console.error("Error al agregar producto:", error);
  }
};

// Remove favorite place
export const deleteFavorite = async (id: string) => {
  try {
    await deleteDoc(doc(db, "favorite-places-list", id));
    ToastAndroid.show("Eliminado de favoritos.", ToastAndroid.TOP);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
};

// Get favorite list
export const getFav = async (user: any) => {
  const q = query(
    collection(db, "favorite-places-list"),
    where("email", "==", user?.primaryEmailAddress?.emailAddress)
  );
  const result: any[] = [];
  const querySnapshot = await getDocs(q);
  await querySnapshot.forEach((doc) => {
    result.push(doc.data());
    return doc.data();
  });
  return result;
};
