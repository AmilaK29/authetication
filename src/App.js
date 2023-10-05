import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore"; // Import Firestore functions
import { auth } from "./firebase-config";
import NavBar from "./navbar";
import { db } from "./firebase-config";

import { Login } from "./login";
import { SignUp } from "./signup";


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [regUser, setRegUser] = useState("");
  const [loginUser, setLoginUser] = useState("");
  const [regPass, setRegPass] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setUser(user);
  //   } else {
  //     setUser({});
  //   }
  // })

  const register = async () => {
    console.log(regUser, regPass);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regUser, regPass);
      const user = userCredential.user; // Extract the user object from the userCredential
      const userId = user.uid; // Get the user's UID
      console.log(typeof userId);

      // Add a new document in collection "cities"
      await setDoc(doc(db, "users", userId), {
        firstName: firstName,
        lastName: lastName,
        country: country,
      });
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Invalid Register");
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, loginUser, loginPass);
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <NavBar />
      <Router>
      <Routes>
        {/* <Route path="/" element={user ? <Navigate to="/register" /> : <Login />} /> */}
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={user ? <Navigate to="/register" /> : <SignUp/>} /> */}
        <Route path="/register" element={user ? <SignUp /> : <Navigate to="/" />} />
      </Routes>
    </Router>
      
      
      
    </div>
  );
}

export default App;
