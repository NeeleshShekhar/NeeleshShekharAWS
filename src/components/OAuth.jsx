import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { db } from "../config/firebase";

const OAuth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const userCredentials = await signInWithPopup(auth, provider);
      const user = userCredentials.user;
  
      // Check if the user is already registered
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      
      if (userSnapshot.exists()) {
        // User already exists, handle accordingly (maybe redirect or show a message)
        toast.success("This Google account is already registered.");
        return;
      }
  
      // User is not registered, proceed with creating a new user document
      const su = false;
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        timestamp: serverTimestamp(),
        user_uid: user.uid,
        superUser: su,
      });
  
      // Sign in successful
      toast.success("Successfully signed in!!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='mx-auto my-8 w-full max-w-[70%] '>
      <Button
        onClick={signInWithGoogle}
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ backgroundColor: "#0095a9" }} // You can customize the background color here
      >
        <FcGoogle size={22} style={{ marginRight: 8 }} />
        Sign in with Google
      </Button>
    </div>
  );
};

export default OAuth;
