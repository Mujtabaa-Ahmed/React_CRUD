import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const productCollection = collection(db, 'products');

// CREATE
export const addProduct = async (product) => {
  return await addDoc(productCollection, product);
};

// READ
export const getProducts = async () => {
  const data = await getDocs(productCollection);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

// UPDATE
export const updateProduct = async (id, updatedProduct) => {
  const productDoc = doc(db, 'products', id);
  return await updateDoc(productDoc, updatedProduct);
};

// DELETE
export const deleteProduct = async (id) => {
  const productDoc = doc(db, 'products', id);
  return await deleteDoc(productDoc);
};
