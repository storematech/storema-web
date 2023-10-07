"use client"
import Item from "@/app/Components/Shop/Item"
import { useParams } from 'next/navigation'
interface Params {
    business_number: string | null,
    itemId?: string | null
}
export default function ItemPage() {
    const params: Params = useParams()
    console.log("item page", params)
    return (
        <Item params={params} />
    )
}