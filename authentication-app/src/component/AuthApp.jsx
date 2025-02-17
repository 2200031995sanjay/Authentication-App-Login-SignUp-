import {useState} from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAeEkEfORomqKWkMT4F1duB7QSt1cvDBqI",
    authDomain: "authentication-app-7d7b0.firebaseapp.com",
    projectId: "authentication-app-7d7b0",
    storageBucket: "authentication-app-7d7b0.firebasestorage.app",
    messagingSenderId: "1043865584618",
    appId: "1:1043865584618:web:7d76e5852720bd2ff1a893",
    measurementId: "G-9QCQH1F3VJ"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

export default function AuthApp() {

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setLogin] = useState(true);
    const [error, setError] = useState(null);
    
    const handleAuth = async (e) =>{
        e.preventDefault();
        setError(null);
        try{
            if(isLogin){
                await signInWithEmailAndPassword(auth, email, password);
                alert("Logged in successfully");
                setEmail("");
                setPassword("");
            }else{
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Account created successfully!");
                setEmail("");
                setPassword("");
            }
        }catch(err){
            setError(err.message);
        }
    }


  return (
    <div style={{ minHeight:"100vh",display:"flex",alignItems:"center", justifyConten:"center" }}>
      <form onSubmit={handleAuth} style={{ background: "#f2d0a4", padding: "20px", borderRadius: "8px", width: "300px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h2 style={{ color: "#c03221" }}>{isLogin? "Login": "Sign Up"}</h2>
      {error && <p style={{color:"red"}}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: "8px", marginBottom: "10px" }} />
      <button type="submit" style={{ background: "#c03221", color: "white", padding: "10px", width: "100%", border: "none", borderRadius: "4px" }}>{isLogin ? "Login" : "Sign Up"}</button>
      <p style={{marginTop:"10px"}}>
        {isLogin? "Don't have an account?":"Already have an account"}<span onClick={()=>{ setLogin(!isLogin), setEmail(""), setPassword("")}} style={{color:"#c03221", cursor:"pointer"}}>{isLogin? "Sign Up": "Login"}</span>
      </p>
        </form>

    </div>
  )
}
