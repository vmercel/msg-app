import { initializeApp } from "firebase/app";
import { getMessagesByOwner, getMessages } from '../services/MessageService.js';
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDzb1Sf-pDdWd8UX28XWFjOKc_In6E1jY0",
    authDomain: "mailbox-f6a6a.firebaseapp.com",
    databaseURL: "https://mailbox-f6a6a-default-rtdb.firebaseio.com",
    projectId: "mailbox-f6a6a",
    storageBucket: "mailbox-f6a6a.appspot.com",
    messagingSenderId: "365094208052",
    appId: "1:365094208052:web:1743fc24312b3acca60061",
    measurementId: "G-4N1QG52XDH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async() => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logInWithEmailAndPassword = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const registerWithEmailAndPassword = async(displayName, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            displayName,
            authProvider: "local",
            email,
        });
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const msg = getMessages();
const saveMessage = async() => {
    for (let i=0;i<msg.length; i++){
    try {
        //const res = await createUserWithEmailAndPassword(auth, email, password);
        //const user = res.user;
        await addDoc(collection(db, "messages"), {
            id: msg[i].id,
            subject: msg[i].subject,
            content: msg[i].content,
            isRead: msg[i].isRead,
            owner: msg[i].owner,
        });
        console.log("Operation Successful");
    }
     catch (err) {
        console.error(err);
        alert(err.message);
    }
}
};

const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};




export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    saveMessage,

};