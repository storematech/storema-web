"use client"
import Store from "@/app/Components/Shop/Store";
import { useParams } from 'next/navigation'


const StorePage = () => {
  const { store_id }: { store_id: string } = useParams()

  console.log("store_id prams",store_id,typeof(store_id))

  return (
    <div>
      <Store store_id={store_id}/>
    </div>
  )
}

export default StorePage