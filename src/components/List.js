import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import './List.css';
import Navbar from "./navbar/Header";
import { auth, db } from "../context/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { MessageContext } from "../context/MessageContext"



const API_URL = "https://msg-api.vercel.app/messages"




const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function MList() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [nname, setNname] = useState("");
  // const navigate = useNavigate();
  const fetchUserByName = async () => {
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
    fetchUserByName();
  }, [user, loading]);

  console.log("USER IS", `${nname}`);

  //////////////// FILTER MESSAGES BY OWNER FUNCTION /////////////////////
  function getMessagesByOwner(MESSAGES, owner) {
    const temp = MESSAGES.filter((message) => (message.owner === owner));
    if (temp.length === 0) {
      return [{ "id": 123456789, "subject": "No Message Found", "content": "You have no new Message. Check again later", "isRead": true, "owner": "Me" }];//MESSAGES.filter((message) => (message.owner === "Undefined"));
    } else {
      return temp;
    }
  }
  /////////////////// END OF MESSAGE FILTERING ////////////////////////////




  const Msgs = React.useContext(MessageContext);
  const Data = getMessagesByOwner(Msgs, nname);
  console.log(Data);
  var total = Data.length;
  let counter = 0;
  for (let i = 0; i < Data.length; i++) {
    if (Data[i].isRead === false) { counter++; }
  };








  // the value of the search field 
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  // the search result
  const [foundMessages, setFoundMessages] = useState([]);


  const filter = (e) => {

    const keyword = e.target.value;

    if (keyword) {
      const results = Data.filter((message) => {
        return message.subject.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundMessages(results);
    } else {
      setFoundMessages(Data);
      //If the text field is empty, show all users
    }

    setName(keyword);
  };



  return ( <>
    <Navbar />

    <div className="container" >
      <input type="search"
        value={name}
        onChange={filter}
        //onChange={ setFoundMessages(Data.filter((msg)=>{msg.subject.toLowerCase().startWith(name.toLowerCase())}))}
        className="input"
        placeholder="Filter" /
      >
    </div>
    <div className="message-list" > {

      foundMessages && foundMessages.length > 1 ? (
        foundMessages.map((message) => (
          <li key={message.id}
            className="message"
            onClick={
              () => navigate(`/details/`, { state: { id: message.id } })
            } >
            <span className="message-id" > {message.id} < /span> <span className="message-subject" > {message.subject} < /span>
              <br />
              <div className="message-content" > {message.content.slice(0, 20) + " . . . "}
              </div> </li >
              ))
              ) :  (
             Data.map((message) => (
              <li key={message.id}
                className="message"
                onClick={
                  () => navigate(`/details/`, { state: { id: message.id } })
                } >
                <span className="message-id" > {message.id} < /span> <span className="message-subject" > {message.subject} < /span>
                  <br />
                  <div className="message-content" > {message.content.slice(0, 20) + " . . . "}
                  </div> </li >
                  ))
                  )
            
        }

                </div>



              </>
              );
}

        