import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  DocumentData,
} from 'firebase/firestore'
import { app } from '../config/firebaseConfig' // Assuming your Firebase configuration file is named 'firebaseConfig.tsx'

interface UserData {
  uid: string
  firstName: string
  lastName: string
  phoneNumber: string
  dob: string
}

const db = getFirestore(app)

// Function to add user data to Firestore during registration
const registerUser = async (userData: UserData): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userData.uid)
    await setDoc(userRef, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      dob: userData.dob,
      uid: userData.uid,
    })
    console.log('User data successfully added to Firestore.')
  } catch (error) {
    console.error('Error adding user data to Firestore:', error)
    throw error // Propagate the error to handle it in the component
  }
}

// Function to query users based on a specific condition
const queryUsers = async (
  field: string,
  value: string,
): Promise<DocumentData[]> => {
  try {
    const q = query(collection(db, 'users'), where(field, '==', value))
    const querySnapshot = await getDocs(q)

    const users: DocumentData[] = []
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() })
    })

    return users
  } catch (error) {
    console.error('Error querying users from Firestore:', error)
    throw error // Propagate the error to handle it in the component
  }
}

const doesUserExist = async (
  field: string,
  value: string
): Promise<boolean> => {
  try {
    console.log(field , 'field')
    console.log(value , 'value')
    const q = query(collection(db, 'users'), where(field, '==', value));
    const querySnapshot = await getDocs(q);

    console.log('Query Snapshot:', querySnapshot);

    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking user existence in Firestore:', error);
    throw error;
  }
};

export { registerUser, queryUsers, doesUserExist };
