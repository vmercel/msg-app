import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Navbar from "./navbar/Header";
import { auth, db } from "../context/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { MessageContext } from "../context/MessageContext";



const API_URL = "https://msg-api.vercel.app/messages";


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function Home() {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  // const navigate = useNavigate();
  const fetchUserByName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);

      setName(data.displayName);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    fetchUserByName();
  }, [user, loading]);

  console.log("USER IS", `${name}`);

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
  const Data = getMessagesByOwner(Msgs, name);
  console.log(Data);
  var total = Data.length;
  let counter = 0;
  for (let i = 0; i < Data.length; i++) {
    if (Data[i].isRead === false) { counter++; }
  };




  return (
    <>
      <Navbar />
      <h1> PROFILE </h1>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}
      >

        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Img alt="complex" src="https://cquipsplus.ca/wp-content/themes/cera/assets/images/avatars/user-avatar.png" />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Hello <h2>{name}</h2>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <span> You have <h1>{counter}</h1> </span><span>Unread out of <h1>{total}</h1> total </span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  <Button variant="outlined" onClick={
                    () => navigate(`/list/`, { state: { dat: Data } })
                  }>
                    Message_List
                  </Button>
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" component="div">
                ...
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

    </>
  );
}