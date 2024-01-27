import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useCurrentUserDetails = () => {
  const [currentUserDetails, setCurrentUserDetails] = useState({ userId: null, userName: null });
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        // Once a user is authenticated, set their user ID and name
        setCurrentUserDetails({ 
          userId: user.uid,
          userName: user.displayName || 'Anonymous' // Fallback to 'Anonymous' if displayName is not set
        });
      } else {
        // Reset to null if no user is authenticated
        setCurrentUserDetails({ userId: null, userName: null });
      }
    });
    
    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);
  
  return currentUserDetails;
};

export default useCurrentUserDetails;