"use client"
import { useState, useEffect } from "react";

import {
  collection,
  query,
  onSnapshot,
  
} from "firebase/firestore";
import { db } from "@/config/config";
import Categories from "./Categories";
interface StoreInterface {
  business_name: string,
  business_type: string
}

export default function Store({ params }: { params: { business_number: string | null } }) {
  const [store, setStore] = useState<StoreInterface[]>([])

  useEffect(() => {
    const collectionName = `_${params.business_number}_business`;

    const q = query(collection(db, collectionName));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let storeArr: any = [];
      querySnapshot.forEach((doc) => {
        storeArr.push({ ...doc.data(), id: doc.id });
      });
      setStore(storeArr);
      console.log("store data", storeArr)
      return () => unsubscribe()
    });
  }, []);

  return (
    <main>
      <h1>      store page
      </h1>
      {store.length > 0 && (
        <div>
          <h1>{store[0].business_name}</h1>
          <p>{store[0].business_type}</p>
          <Categories params={params}/>
        </div>
      )}
    </main>

  )
}
