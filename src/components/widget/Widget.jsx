import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { collection,getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Widget = ({ type,goto,earning,cost}) => {
  let data;
  const [amount,setAmount] = useState(null);
  const [orders,setOrders]=useState(null);  
  const navigate=useNavigate()

  useEffect(()=>{
    const getUsers=async ()=>{
      const usersCollectionRef=collection(db,"users");
      const q=query(usersCollectionRef,where("status","==","accepted"))

        const data=await getDocs(q);
        setAmount( data.docs.length)  
      
    }
    getUsers()

    const getOrder=async ()=>{
      const ordersCollectionRef=collection(db,"consumer cooperative","1","orders");
      const q=query(ordersCollectionRef,where("status","==","pending"))
      const data=await getDocs(q);
      setOrders(data.docs.length)
  
    }

    getOrder()

  }, [])


 
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        user:true,
        link: "See all users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        order:true,
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        earning:true,
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "cost":
      data = {
        cost:true,
        title: "COST",
        isMoney: true,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.user && amount} 
          {data.cost && cost+" Birr"} 
          {data.earning && earning+" Birr"} 
          {data.order && orders}
          
        </span>
        <span  className="link" onClick={()=>{navigate(`/${goto}`)}}>{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
