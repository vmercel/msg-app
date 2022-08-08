import { useNavigate, useLocation } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import MyNavbar from "./navbar";
import { useParams } from 'react-router'
//import './List.css';

const MessageDetails = ({route}) => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

 const location = useLocation();
 const messageid = location.state.id;

// api url
const api_url = 
      "https://employeedetails.free.beeceptor.com/my/api/path";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    console.log(data);
    if (response) {
        
    }
    //show(data);
}
// Calling that async function
getapi(api_url);

 return (
    <>
<div>
    <MyNavbar fixed="top"/>
</div>
      <div className="p-4 box mt-3 text-center">
        Hello Welcome  { location.state.id }  <br />
      </div>

      <div className="d-grid gap-2">
        <button variant="primary" onClick={handleLogout}>
          Log out
        </button>
      </div>

      <div className="d-grid gap-2">
        <button variant="primary" onClick={()=>navigate("/home")}>
          View Message List
        </button>
      </div>

    </>
  );
};

export default MessageDetails;



