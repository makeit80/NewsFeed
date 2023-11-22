import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { useNavigate } from 'react-router';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTO_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

console.log(firebaseConfig) 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
//자동 로그인 방지
provider.setCustomParameters({
  prompt: 'select_account'
});

export async function googleLogin(email, password) {
  return await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
    })
    .catch((error) => console.error(error));
}

export async function signUp(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => console.error(error));
}

export async function logout() {
  return await signOut(auth)
    .then(() => console.log('로그아웃 완료'))
    .catch((error) => console.error(error));
}

export function onAuthStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      //로그인 되어 있으면 로그아웃 버튼 존재
      console.log(user);
      const uid = user.uid;
      callback(user);
    }
  });
}
