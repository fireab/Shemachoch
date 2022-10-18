import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { /*useContext,*/ useEffect, useState } from "react";
import { collection,getDocs,query,where} from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";

const Single = () => {
  const param=useParams()
  const userId=param.userId 

        
    const [users,setUsers]=useState([]);   
    
    
    useEffect(()=>{
      const usersCollectionRef=collection(db,"users");
      const q=query(usersCollectionRef,where("CN","==",userId))
            const getUsers=async ()=>{
            const data=await getDocs(q);
           setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id })))  
                      
        }
                
        getUsers()               
        
      }, [userId])
      
      console.log("users",users);
      console.log("userId",userId);

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
            <div className="editButton"></div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user.image}
                alt=""
                className="itemImg"
              />
              
              <div className="details">
                <h1 className="itemTitle">
                  {user.first_name} &nbsp;
                  {user.middle_name} &nbsp;
                  {user.last_name}
                
                </h1>
                <div className="detailItem">
                  <span className="itemKey">Cupon Number:</span>
                  <span className="itemValue">{user.CN}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phone_number}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Home Number:</span>
                  <span className="itemValue">
                    {user.house_number}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Number Of Family Member:</span>
                  <span className="itemValue">{user.family_size}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{user.role}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{user.address}</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>)
            })}
          <div className="right">
          
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Latest Transaction and Orders</h1>
          <List userId={userId} />
        </div>
        
      </div>
    </div>
  );
};


export default Single;
