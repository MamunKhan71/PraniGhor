import useAxiosPublic from "@/hooks/useAxiosPublic";
import app from "@/utils/firebase.config";
import axios from "axios";
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
            const userEmail = currentUser?.email || user?.email
            const loggedUser = { email: userEmail }
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                axios.post('https://pranighor.vercel.app/jwt', loggedUser, { withCredentials: true })
                    .then(res => console.log(res.data))
            }
            else {
                axios.post('https://pranighor.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then((res => console.log(res.data)))
            }
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
    const userUpdate = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const userSignOut = () => {
        localStorage.removeItem('isAuth')
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