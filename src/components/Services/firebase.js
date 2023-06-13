import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  query,
  where,
  getDoc,
  addDoc,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyABGyiP5M4sylTT_jAYTbK6trEGrEWGJYo",
  authDomain: "react-coder-2ce5d.firebaseapp.com",
  projectId: "react-coder-2ce5d",
  storageBucket: "react-coder-2ce5d.appspot.com",
  messagingSenderId: "344782737638",
  appId: "1:344782737638:web:0fb1476977a5f5c1702b27",
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

export async function getData() {
  const productsCollectionRef = collection(db, "products");
  const productsSnapshot = await getDocs(productsCollectionRef);
  const arrayDocs = productsSnapshot.docs;
  const dataDocs = arrayDocs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });

  return dataDocs;
}

export async function getItemData(idUrl) {
  const docRef = doc(db, "products", idUrl);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
}

export async function getCategoryData(idCategory) {
  const productsCollectionRef = collection(db, "products");
  const q = query(productsCollectionRef, where("category", "==", idCategory));
  const productsSnapshot = await getDocs(q);
  const arrayDocs = productsSnapshot.docs;
  const dataDocs = arrayDocs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return dataDocs;
}

export async function createOrder(data) {
 const ordersCollectionRef = collection(db, "orders");

 const response = await addDoc(ordersCollectionRef, data);
 return response.id;

}
