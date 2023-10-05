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

export function SignUp() {
  const [regPass, setRegPass] = useState("");
  const [regUser, setRegUser] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");

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

  return (
    <div>
      <label>email</label>
      <input
        type="text"
        value={regUser}
        placeholder="email"
        onChange={(e) => setRegUser(e.target.value)}
      />
      <br></br>
      <label>password</label>
      <input
        type="text"
        placeholder=""
        value={regPass}
        onChange={(e) => setRegPass(e.target.value)}
      />
      <br></br>

      <br />
      <label>First Name</label>
      <input
        type="text"
        value={firstName}
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label>Last Name</label>
      <input
        type="text"
        value={lastName}
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label>Country</label>
      <input
        type="text"
        value={country}
        placeholder="Country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <br />

      <button onClick={register}>Register</button>
    </div>
  );
}
