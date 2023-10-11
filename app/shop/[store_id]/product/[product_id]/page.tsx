"use client"
import { useParams } from 'next/navigation'
import ProductDetails from '@/app/Components/Shop/ProductDetails'

export default function ProductPage() {
    const { product_id }: { product_id: string } = useParams()
    console.log("product page", product_id)
    return (
        <ProductDetails product_id={product_id} />
    )
}