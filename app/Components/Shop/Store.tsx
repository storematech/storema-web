"use client"
import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "@/config/config";
interface StoreInterface{
  business_name:string,
  business_type:string
}

export default function Store({params}:{params:{business_number:string|null}}) {
  const [store, setStore] = useState<StoreInterface[]>([])

  useEffect(() => {
    const collectionName = `_${params.business_number}_business`;

    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let storeArr:any = [];
      querySnapshot.forEach((doc) => {
        console.log("doc", doc)
        storeArr.push({ ...doc.data(), id: doc.id });
      });
      setStore(storeArr);
      console.log("store data", storeArr)
      console.log("buinsess page", params)
      return () => unsubscribe()
    });
  }, []);

  return (
    <main>
      store page
      {store.length > 0 && (
      <div>
        <h1>{store[0].business_name}</h1>
        <p>{store[0].business_type}</p>
      </div>
    )}
    </main>

  )
}
