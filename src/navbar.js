import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect,useState } from "react";
import { db } from "./firebase-config";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function NavBar() {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const logout = async () => {
    await signOut(auth);
  };


  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    //   if (currentUser) {    
    //     try {
    //     //   const db = getFirestore();
    //       const userDocRef = doc(db, 'users', currentUser.uid); // Assuming 'users' is your Firestore collection

    //       const userDocSnapshot = await getDoc(userDocRef);
    //       if (userDocSnapshot.exists()) {
    //         const userData = userDocSnapshot.data();
    //         const userDisplayName = userData.firstName; // Adjust the property name accordingly
    //         setUserName(userDisplayName);
    //       } else {
    //         console.log('User document not found in Firestore');
    //       }
    //     } catch (error) {
    //       console.error('Error fetching user data from Firestore:', error);
    //     }
    //   }
    });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Navbar
      </a>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              About
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Services
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Contact
            </a>
          </li>
        </ul>
      </div>

      <span className="navbar-text">{user?.email}</span>
      {user ? (<span className="navbar-text">
        <button onClick={logout}>Logout</button>
      </span>) : (<></>)}
    </nav>
  );
}

export default NavBar;
