import { collection, query, onSnapshot, where, doc, getDoc, QuerySnapshot, Firestore, collectionGroup, getDocs, DocumentReference, FieldPath } from "firebase/firestore";
import { db } from "@/config/config";
import firebase from "firebase/compat/app";
import { ProductInterface } from "@/models/Product";

async function getProductDataByProductId(product_id: string) {
    console.log("product_id in product details page",product_id)
    const productsCollection = collection(db, "product");

    // Create a query to find the product with a matching ID
    const productQuery = query(productsCollection, where(firebase.firestore.FieldPath.documentId(), "==", product_id));
    console.log("productQuery", productQuery)

    // Get the matching product documents
    const productSnapshot = await getDocs(productQuery);

    if (!productSnapshot.empty) {
        // If there are matching products, return the data of the first one (assuming there is only one match)
        const productData = productSnapshot.docs[0].data() as ProductInterface;
        console.log("productData", productData)
        return productData;
    } else {
        console.log("No matching product found")
        return null;
    }
}



const ProductDetails = async ({ product_id }: { product_id: string}) => {
    const productData = await getProductDataByProductId(product_id)
    return (
        productData && (
            <div>
                <h2>{productData.name}</h2>
                <p>{productData.description}</p>
            </div>
        )
    );
};



export default ProductDetails