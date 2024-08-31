import { auth, db } from '../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { SignUpRequest, UserInfo } from '../types/user';
import { ref, set, get } from 'firebase/database';

const createUser = async (request: SignUpRequest) => {
  const { email, password, ...info } = request;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { uid } = userCredential.user;
    const userInfo: UserInfo = {
      userId: uid,
      email,
      ...info,
    };
    setUserProfile(userInfo);
  } catch (error) {
    throw error;
  }
};

const getAuthStateChange = () => {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log('User signed in:', uid);
    } else {
      // User is signed out
      console.log('User signed out');
    }
  });
};

const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user: User = userCredential.user;
    const accessToken = await user.getIdToken();
    if (user) {
      return {
        accessToken,
      };
    }
  } catch (error) {
    throw error;
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('logout success');
  } catch (error) {
    throw error;
  }
};

const getAuthUser = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
};

const setUserProfile = async (request: UserInfo) => {
  const { userId, ...userInfo } = request;
  try {
    const userRef = ref(db, `user/${userId}`);
    await set(userRef, userInfo);
  } catch (error) {
    throw error;
  }
};

const getUserProfile = async (userId: string) => {
  try {
    const userRef = ref(db, `user/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val(); // 返回獲取到的數據
    } else {
      throw new Error('User not found'); // 這裡拋出錯誤，如果沒有找到用戶
    }
  } catch (error) {
    throw error;
  }
};

export default { createUser, signInUser, signOutUser, getAuthStateChange, getAuthUser, setUserProfile, getUserProfile };
