"use client"
import Store from "@/app/Components/Shop/Store";
import { useParams } from 'next/navigation'


const StorePage = () => {
  const params = useParams()

  return (
    <div>
      <Store params={params}/>
    </div>
  )
}

export default StorePage