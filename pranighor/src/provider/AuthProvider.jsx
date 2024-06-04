import app from "@/utils/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const auth = getAuth(app)
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const googleProvider = new GoogleAuthProvider()
    const twitterProvider = new TwitterAuthProvider()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });
        return unsubscribe;
    }, [auth])
    const signUpUser = (userEmail, userPassword) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, userEmail, userPassword)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleGoogleAuth = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const handleTwitterAuth = () => {
        setLoading(true)
        return signInWithPopup(auth, twitterProvider)
    }
    const userUpdate = (userName, userPhoto) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: userPhoto
        })
    }
    const userSignOut = () => {
        return signOut(auth)
    }
    const authValues = { loading, user, signUpUser, signInUser, handleGoogleAuth, handleTwitterAuth, userUpdate, userSignOut }
    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;