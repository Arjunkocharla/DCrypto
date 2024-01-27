// src/utils/authUtils.js
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export const logout = async () => {
  try {
    await signOut(auth);
    // Add any additional logout logic here
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

