import { firestore } from "../util/database";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const COLL = "posts";

export type PostType = {
  id?: string;
  message: string;
  time: string;
};

const PostService = {
  get: async () => {
    const querySnapshot = await getDocs(collection(firestore, COLL));

    const postsData: PostType[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as PostType;
      postsData.push({
        ...data,
        id: doc.id,
      });
    });

    return postsData;
  },

  getById: async (id: string) => {
    const querySnapshot = await getDoc(doc(firestore, COLL, id));

    return querySnapshot.data();
  },

  insert: async (game: PostType) => {
    const docRef = await addDoc(collection(firestore, COLL), game);
    return docRef;
  },

  update: async (id: string, game: PostType | any) => {
    const postRef = doc(firestore, COLL, id);
    await updateDoc(postRef, game);
  },

  remove: async (id: string) => {
    await deleteDoc(doc(firestore, COLL, id));
  },
};

export default PostService;
