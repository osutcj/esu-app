import { firestore } from '../util/database';
import {
  collection,
  addDoc,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

interface FeedPostInterface {
  id: string,
  user: string,
  text: string,
}

const COLL = "feedposts";

const FeedPostService = {
  get: async () => {
    const querySnapshot = await getDocs(
      collection(firestore, COLL)
    );

    const feedPostsData: FeedPostInterface[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as FeedPostInterface;
      feedPostsData.push({
        ...data,
        id: doc.id,
      });
    });

    return feedPostsData;
  },

  getById: async (id: string) => {
    const querySnapshot = await getDoc(doc(firestore, COLL, id));

    return querySnapshot.data() as FeedPostInterface;
  },

  insert: async (post: FeedPostInterface) => {
    const docRef = await addDoc(collection(firestore, COLL), post);
    return docRef;
  },

  update: async (id: string, post: FeedPostInterface | any) => {
    const postRef = doc(firestore, COLL, id);
    await updateDoc(postRef, post);
  },

  remove: async (id: string) => {
    await deleteDoc(doc(firestore, COLL, id));
  },
};

export default FeedPostService;
