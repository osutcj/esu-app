import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { app } from '../firebase';

export const db = getDatabase();
export const firestore = getFirestore(app);