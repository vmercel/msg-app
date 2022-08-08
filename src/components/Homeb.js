import React, { useContext } from "react";
import { MessageContext } from "../MessageContext";
  
const Homeb= () => {
  const  {messages}  = useContext(MessageContext);
  
  return (
    <div>
      <h2>Component4</h2>
      <h3>
      Title: </h3> <h3>{`${messages}`} 
      </h3>
      <h3>Coding streak</h3>
      <h3>{"bla"} Days </h3>
    </div>
  );
};
  
export default Homeb;