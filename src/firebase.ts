// 3rd Party
import firebase from 'firebase';

// Other
import { API_KEY, AUTH_DOMAIN, DATABASE_URL } from './secrets';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();
