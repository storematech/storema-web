"use client"
import { useState, useEffect } from "react"
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "@/config/config";
interface BusinessInterface {
  business_name: string,
  business_type: string
}
import Link from "next/link";

export default function Home() {
  const [business, setBusiness] = useState<BusinessInterface[]>([])

  useEffect(() => {
    const q = query(collection(db, "_6006413187_business"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let businessArr: any = [];
      querySnapshot.forEach((doc) => {
        console.log("doc", doc)
        businessArr.push({ ...doc.data(), id: doc.id });
      });
      setBusiness(businessArr);
      console.log("business data", businessArr)
      return () => unsubscribe()
    });
  }, []);

  return (
    <main>
      home page
      
    </main>

  )
}
