import { DocumentReference } from "firebase/firestore";

export interface ProductInterface {
  id: string;
  name: string;
  description: string;
  store: DocumentReference;
}
