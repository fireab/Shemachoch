import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";
import { useContext, useEffect, useState } from "react";
import { collection,getDocs,query,where} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
    const current=useContext(AuthContext)   
    
    
    const [users,setUsers]=useState([]);   
    
    const usersCollectionRef=collection(db,"Admin");
    const q=query(usersCollectionRef,where("email","==",current.currentUser.email))
    
    useEffect(()=>{
        const getUsers=async ()=>{
            const data=await getDocs(q);
           setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id })))  
                      
        }
        
        getUsers()               
        
      }, [q])
      
      

  return (
    <div className="single">
        
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
        {users.map((user)=>{ 
                  
        return (
        <div key={user.id}>         
          
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user.img}
                alt=""
                className="itemImg"
              />
              
              <div className="details">
                <h1 className="itemTitle">{user.firstName} <span> </span> {user.lastName} </h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {user.Address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{user.Gender}</span>
                </div>
              </div>
            </div>
          </div>
        </div>)
            })}
          <div className="right">
          
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Profile;
