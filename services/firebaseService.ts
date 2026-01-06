
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, collection, query, limit, getDocs } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { AppData, HistoryData } from '../types';

// NOTE: You will need to replace these with your actual Firebase config from the Firebase Console
// For now, these are placeholders that would be typically injected via environment variables.
const firebaseConfig = {
  apiKey: "AIzaSyCr0Lk5ZO3v5n5GznAyFaD6yOLDQBknZKM",
  authDomain: "current-affairs-67640.firebaseapp.com",
  projectId: "current-affairs-67640",
  storageBucket: "current-affairs-67640.firebasestorage.app",
  messagingSenderId: "185812252440",
  appId: "1:185812252440:web:a009a7f8facb39a9d5106d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTION_NAME = 'daily_content';

/**
 * Fetches data for a specific date from the central database
 */
export const getRemoteDailyData = async (dateKey: string): Promise<AppData | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, dateKey);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as AppData;
    }
    return null;
  } catch (error) {
    console.error("Firebase Read Error:", error);
    return null;
  }
};

/**
 * Saves data to the central database for all users to see
 */
export const saveRemoteDailyData = async (dateKey: string, data: AppData): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, dateKey);
    await setDoc(docRef, data);
  } catch (error) {
    console.error("Firebase Write Error:", error);
  }
};

/**
 * Fetches recent history from the central database to populate the archive
 */
export const getRecentHistory = async (days: number = 7): Promise<HistoryData> => {
  const history: HistoryData = {};
  try {
    const q = query(collection(db, COLLECTION_NAME), limit(days));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      history[doc.id] = doc.data() as AppData;
    });
  } catch (error) {
    console.error("Firebase History Error:", error);
  }
  return history;
};
