import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import React, { useState, useEffect, useContext } from "react";
import { MessageContext } from "./context/MessageContext"

import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MList from "./components/List";
import ComplexGrid from "./components/Grid";




class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    fetch(
      "https://msg-api.vercel.app/messages"
    )
      .then(response => response.json())
      .then(data => this.setState({ messages: data }));
  }


  render (){
    return(
    <>
	<div className="app">

<MessageContext.Provider value={this.state.messages}>
	<UserAuthContextProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
	    <Route path="/list" element={<MList />} />
	    <Route path="/details" element={<ComplexGrid />} />
          </Routes>
	</UserAuthContextProvider>
</MessageContext.Provider>
	</div>
  </>
  )};
}

export default App;