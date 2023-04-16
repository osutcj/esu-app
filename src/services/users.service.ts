import { firestore } from "../util/database";
import {
  collection,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { UserType } from "../types/users";

const COLL = "users";

const UserService = {
  get: async () => {
    const querySnapshot = await getDocs(collection(firestore, COLL));

    const userData: UserType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as UserType;
      userData.push({
        ...data,
        id: doc.id,
      });
    });

    return userData;
  },

  getById: async (id: string | undefined) => {
    if (id == undefined) {
      console.log("Could not retrive user");
      return;
    }
    const querySnapshot = await getDoc(doc(firestore, COLL, id));

    return querySnapshot.data();
  },

  insert: async (user: UserType) => {
    const userDoc = await UserService.getById(user.id);

    if (!userDoc) {
      const docRef = await setDoc(doc(firestore, COLL, user.id), user);
      return docRef;
    }
    return userDoc;
  },

  update: async (id: string, user: UserType | any) => {
    const userRef = doc(firestore, COLL, id);
    await updateDoc(userRef, user);
  },

  remove: async (id: string) => {
    await deleteDoc(doc(firestore, COLL, id));
  },
};

export default UserService;
