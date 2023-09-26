"use client"
import { useState, useEffect } from "react";

import {
    collection,
    query,
    onSnapshot,

} from "firebase/firestore";
import { db } from "@/config/config";

interface ItemInterface {
    item_name: string,
    item_category_text: string
}
export default function Categories({ params }: { params: { business_number: string | null } }) {
    // for now, display all item of one store

    const [items, setItems] = useState<ItemInterface[]>([])
    useEffect(() => {
        const collectionName = `_${params.business_number}_items`;

        const q = query(collection(db, collectionName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr: any = [];
            querySnapshot.forEach((doc) => {
                itemsArr.push({ ...doc.data(), id: doc.id });
            });
            setItems(itemsArr);
            console.log("items data", itemsArr)
            return () => unsubscribe()
        });
    }, [params.business_number]);
    return (
        <div>
            <h1>All Items</h1>
            {items.map((item: ItemInterface, index: number) => (
                <div key={index}>
                    <h3>{item.item_name}</h3>
                </div>
            ))}

        </div>
    )
}

