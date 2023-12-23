import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  DocumentReference,
  DocumentData,
} from 'firebase/firestore'

import { app } from '../config/firebaseConfig'

const db = getFirestore(app)

const checkUserExistence = async (uid: string): Promise<boolean> => {
  const userRef: DocumentReference<DocumentData> = doc(db, 'users', uid)

  try {
    const userSnapshot = await getDoc(userRef)
    return userSnapshot.exists()
  } catch (error) {
    console.error('Error checking user existence:', error)
    return false
  }
}

export { checkUserExistence }
