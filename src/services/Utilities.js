import React, {useState, useEffect} from 'react';
import { auth, db } from "../context/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";


//const API_URL = "https://mail-app-api.vercel.app/api/v1/messages";
const API_URL = "https://msg-api.vercel.app/messages"

const MessageFetcher = () => {
    const [messages, setMessages] = useState([])

    const fetchData = () => {
      fetch(`${API_URL}`)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setMessages(data.data);
          console.log(data.data);
        })
    }
  
    useEffect(() => {
      fetchData()
    }, [])
}


const GetUserName = () => {
    const [user, loading, error] = useAuthState(auth);
    const [nname, setNname] = useState("");
    const fetchUserByName = async() => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            console.log(data);

            setNname(data.displayName);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }
    };
    useEffect(() => {
        if (loading) return;
        //if (!user) return navigate("HomeStack",{screen: "Home"});

        fetchUserByName();
    }, [user,loading]);

    console.log("USER IS", `${nname}`);
}



const  GetMessagesByOwner = (MESSAGES, owner)=> {
    const temp = MESSAGES.filter((message) => (message.owner === owner));
    if (temp.length === 0) {
      return [{ "id": 123456789, "subject": "No Message Found", "content": "You have no new Message. Check again later", "isRead": true, "owner": "Me" }]//MESSAGES.filter((message) => (message.owner === "Undefined"));
    } else {
      return temp;
    }
  }

  export {MessageFetcher, GetUserName, GetMessagesByOwner}