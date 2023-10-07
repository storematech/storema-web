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

  

  return (
    <main>
      home page
      
    </main>

  )
}
