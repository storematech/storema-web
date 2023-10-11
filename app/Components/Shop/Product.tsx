import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@/config/config";
import Link from "next/link";
import { ProductInterface } from "@/models/Product";

export default function Product({ product, storeUniqueId }: { product: ProductInterface, storeUniqueId: string | null }) {
    console.log("product id in product component",product.id)
    return (
        <div>
            <Link href={`/shop/${storeUniqueId}/product/${product.id}`}>
                <h2>{product?.name}</h2>
            </Link>
        </div>
    )
}