import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where, doc, getDoc, QuerySnapshot, Firestore, collectionGroup, getDocs, DocumentReference } from "firebase/firestore";
import { db } from "@/config/config";
import Image from "next/image";
import Product from "./Product";
import { StoreInterface } from "@/models/Store";
import { ProductInterface } from "@/models/Product";

export default function Store({store_id}:{store_id:string}) {
  const [store, setStore] = useState<StoreInterface | null>(null);
  const [products, setProducts] = useState<ProductInterface[] | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const storeUniqueId: string = store_id


  useEffect(() => {

    console.log("storeUniqueId", storeUniqueId)

    async function getStoreDataByStoreUniqueId(storeUniqueId: string | null) {
      const storeUniqueIDCollection = collection(db, "store-unique-id");
      const storeUniqueIDQuery = query(storeUniqueIDCollection, where("unique-id", "==", storeUniqueId));

      const unsubscribe = onSnapshot(storeUniqueIDQuery, (querySnapshot) => {
        querySnapshot.forEach(async (storeIdDoc) => {
          console.log("storeId doc", storeIdDoc);

          // Access the ref property of the "store" field in the "store-unique-id" document
          const storeRef = storeIdDoc.get("store");
          console.log("storeRef", storeRef);

          // Use storeRef to get the document in the "store" collection
          const storeDoc = await getDoc(storeRef);

          if (storeDoc.exists()) {
            const storeData = storeDoc.data() as StoreInterface;
            console.log("storeDoc data", storeData);
            setStore(storeData);

            const productsCollection = collection(db, "product");
            const productsQuery = query(productsCollection, where("store", "==", storeRef));
            console.log("productsQuery", productsQuery)

            const productSnapshot = await getDocs(productsQuery);
            console.log("productSnapshot", productSnapshot, productSnapshot.empty)

            if (!productSnapshot.empty) {
              const productData = productSnapshot.docs.map((productDoc) => {

                const productData = productDoc.data() as ProductInterface;
                productData.id=productDoc.id
              console.log("store component",productData)

                return productData;
              });
              console.log("Products associated with the store:", productData);
              setProducts(productData);
            } else {
              console.log("No products found for this store.");
            }

          } else {
            console.log("Store document not found.");
          }
        });
      });
      return () => {
        // Unsubscribe from the snapshot listener when the component unmounts
        unsubscribe();
      };
    }

    getStoreDataByStoreUniqueId(storeUniqueId);


  }, []);


  return (
    <main>
      <h1>Store Page</h1>
      {store && (
        <div>
          <h1>{store.name}</h1>
          <Image
            src={store["logo-url"]}
            alt={`${store.name} logo`}
            width={100}
            height={100}
          />
        </div>
      )}
      
      {products && (
        <div>
          <h2>Products</h2>
          {products.map((product: ProductInterface, index: number) => (
            <div key={index}>
              <Product product={product} storeUniqueId={storeUniqueId} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
