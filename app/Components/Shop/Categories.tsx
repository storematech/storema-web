"use client"
import { useState, useEffect } from "react";

import {
    collection,
    query,
    onSnapshot,
    where,

} from "firebase/firestore";
import { db } from "@/config/config";

interface ItemInterface {
    id: string,
    item_name: string,
    item_category_text: string
}
export default function Categories({ params }: { params: { business_number: string | null } }) {

    const [itemsOfCategory, setItemsOfCategory] = useState<{ [key: string]: ItemInterface[] }>({})

    useEffect(() => {
        // map to store items of a category
        const itemsOfCategoryMap: { [key: string]: ItemInterface[] } = {}

        const collectionName = `_${params.business_number}_items`;

        const q = query(collection(db, collectionName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const itemData = { ...doc.data(), id: doc.id };
                const category = itemData.item_category_text;
                console.log("cateogry", category, itemData)
                if (!itemsOfCategoryMap[category]) {
                    itemsOfCategoryMap[category] = []
                }
                itemsOfCategoryMap[category].push(itemData)
            });
            setItemsOfCategory(itemsOfCategoryMap)
            console.log("itemsOfCategoryMap", itemsOfCategoryMap, itemsOfCategory)
            return () => unsubscribe()
        });
    }, [params.business_number]);
    return (
        <div>
            {Object.keys(itemsOfCategory).map((category: string, index: number) => (
                <div key={index}>
                    <h2 className="text-3xl">{category}</h2>
                    {itemsOfCategory[category].map((item:ItemInterface, index) => (
                        <div key={index}>
                            <h3>{item.item_name}</h3>
                        </div>
                    ))}

                </div>
            ))}

        </div>
    )
}

