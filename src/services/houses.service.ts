import { firestore, db } from '../util/database';
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const COLL = "houses"
export type HouseType = {
    id: string,
    name: string,
    score: number
}

const HouseService = {
  get: async () => {
    const querySnapshot = await getDocs(
      collection(firestore, COLL)
    );

    const housesData: HouseType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as HouseType;
      housesData.push({
        ...data,
        id: doc.id,
      });
    });

    return housesData;
  },

  getById: async (id: string) => {
    const querySnapshot = await getDoc(doc(firestore, COLL, id));

    return querySnapshot.data();
  },

  insert: async (game: HouseType) => {
    const docRef = await addDoc(collection(firestore, COLL), game);
    return docRef;
  },

  update: async (id: string, game: HouseType | any) => {
    const houseRef = doc(firestore, COLL, id);
    await updateDoc(houseRef, game);
  },

  remove: async (id: string) => {
    await deleteDoc(doc(firestore, COLL, id));
  },
};

export default HouseService;