import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
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
import { useNavigate} from 'react-router-dom';


export function Login(){
    const navigate = useNavigate();
    const [loginPass, setLoginPass] = useState("");
    const [loginUser, setLoginUser] = useState("");
    const [user, setUser] = useState({});

    const [resetPass, setResetPass] = useState("");

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      }, []);

      const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(auth, loginUser, loginPass);
          navigate('/register');
          console.log(user);
        } catch (error) {
          console.log(error.message);
        }
      };

      const handleReset = async () => {
        try {
          await sendPasswordResetEmail(auth, resetPass);
          alert("Reset email sent. Check the mailbox.");
        } catch (error) {
          console.log(error.message);
        }
      };

    return(
        <div>
        <label>user mail : </label>
        <input
          type="text"
          value={loginUser}
          placeholder="user mail"
          onChange={(e) => setLoginUser(e.target.value)}
        />
        <br></br>
        <label>password</label>
        <input
          type="text"
          value={loginPass}
          placeholder="password"
          onChange={(e) => setLoginPass(e.target.value)}
        />

        <br></br>
        <button onClick={login}>Login</button>

        <div>
            <input type="text" id="remember" name="remember" onChange={(e) => setResetPass(e.target.value)}/>
            <button onClick={handleReset}>Reset Password</button>
        </div>
      </div>
    )
}