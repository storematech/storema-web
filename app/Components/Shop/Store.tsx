import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where, doc, getDoc, QuerySnapshot } from "firebase/firestore";
import { db } from "@/config/config";
import Image from "next/image";
import Categories from "./Categories";

interface StoreInterface {
  name: string;
  "profile-picture-url": string;
  products: string[]; // an array of product references in store doc
}

export default function Store({
  params,
}: {
  params: { store_name: string | null };
}) {
  const [store, setStore] = useState<StoreInterface | null>(null);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (params.store_name) {
      // const storeId = decodeURIComponent(params.store_name).toLowerCase()
      // console.log("storeId",storeId)
      // const storeIdQuery = query(collection(db, "store-unix-id"), where("id", "==", storeId));

      // const unsubscribeStore =onSnapshot(storeIdQuery,(querySnapshot)=>{
      //   querySnapshot.forEach((storeIdDoc)=>{
      //     const storeIdData =storeIdDoc.data()
      //     console.log("storeId data",storeIdData)
      //   })
      // })

      // console.log("storeId params", storeId)
      // const storeIdQuery = query(collection(db, "store-unix-id"), where("id", "==", "Store-Test-1"));
      // console.log("storeIdQuery", storeIdQuery)

      const storeName = decodeURIComponent(params.store_name)
      console.log("storename",storeName)

      const storeQuery = query(collection(db, "store"), where("name", "==", storeName));

      const unsubscribeStore = onSnapshot(storeQuery, (querySnapshot) => {
        querySnapshot.forEach(async (storeDoc) => {
          const storeData = storeDoc.data() as StoreInterface;
          console.log("store data", storeData);
          const productRefs = storeData.products;
          console.log("productsRef", productRefs);

          // Create an array of promises for fetching product data
          const productDataPromises = productRefs.map(async (productRef) => {
            // Construct the reference to the product document
            console.log("productRef",productRef,productRef.id)
            const productDocRef = doc(db, "product", productRef.id);
            const productDocSnap = await getDoc(productDocRef);
            const productData = productDocSnap.data();
            console.log("product data", productData); // Log the product data here
            return productData;
          });

          // Wait for all product data promises to resolve
          const productData = await Promise.all(productDataPromises);
          console.log("last product data", productData);

          setStore({ ...storeData, id: storeDoc.id });
          setProducts(productData);
        });
      });

      return () => {
        unsubscribeStore();
      };
    }
  }, [params.store_name]);

  return (
    <main>
      <h1>Store Page</h1>
      {store && (
        <div>
          <h1>{store.name}</h1>
          <Image
            src={store["profile-picture-url"]}
            alt={`${store.name} profile picture`}
            width={100}
            height={100}
          />
          {/* <Categories params={params} /> */}
        </div>
      )}
      {products.length > 0 && (
        <div>
          <h2>Products</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
