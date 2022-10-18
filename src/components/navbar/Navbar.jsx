import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { Link } from "react-router-dom";

const Navbar = () => {
  const current=useContext(AuthContext)  
  const { dispatch } = useContext(DarkModeContext);
  const [users,setUsers]=useState([]);
  const usersCollectionRef=collection(db,"Admin");
  const q=query(usersCollectionRef,where("email","==",current.currentUser.email))
  useEffect(()=>{
    const getUsers=async ()=>{
        const data=await getDocs(q);
       setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id })))  
                  
    }
    
    getUsers()               
    
  }, [])

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            {
              users.map((user)=>{                
                return (
                  <div key={user.id}>
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <img
                      src={user.img}
                      alt=""
                      className="avatar"            />
                  </Link>
                  </div>
                )
              })

              
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
