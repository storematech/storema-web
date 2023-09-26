"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import {
    collection,
    query,
    onSnapshot,
    where
    
  } from "firebase/firestore";
   "firebase/firestore";
import { db } from "@/config/config";

interface ItemData{
item_name:string,
item_image_1:string

}
export default function Item({params}:{params:{business_number:string|null, itemId:string|null}}){
    const [item, setItem] = useState<ItemData|null>(null)


    useEffect(() => {
        const collectionName = `_${params.business_number}_items`;
    
        const q = query(collection(db, collectionName), where("item_id","==",params.itemId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let itemArr: any = [];
          querySnapshot.forEach((doc) => {
            itemArr.push({ ...doc.data(), id: doc.id });
          });
          setItem(itemArr[0]);
          console.log("item page data", itemArr[0])
          return () => unsubscribe()
        });
      }, []);

      if(!item){
        return <div>Loading...</div>
      }
    return(
<div>
 <h1>{item.item_name}</h1>
 <Image alt={"image"} src={item.item_image_1} height={200} width={200}/>

</div>
    )
}