import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
  const [data,setData] = useState([]);
  const [earning,setEarning] = useState(null);
  
  useEffect(()=>{
    const getProduct=async ()=>{
      const producCollectionRef=collection(db,"consumer cooperative","1","products");
      const data=await getDocs(producCollectionRef);
      setData(data.docs.map((doc)=>({...doc.data(),id:doc.id}))) 
    }  
    getProduct() 

    const getCost=async ()=>{
        const docRef = doc(db,"consumer cooperative","1","earning","earning");
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const costSnap=docSnap.data().earning
          setEarning(costSnap);
    
        } else {
          console.log("No such document!");
        }
  
      }
      getCost()

    
  },[])

  let cost=0;
  data.forEach(doc=>{
    cost=cost+doc.total_price;
      });
      const percent=(earning/cost)*100;
      
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" goto="users" />
          <Widget type="order" goto="orders"  />
          <Widget type="earning" goto="orders" setEarning={setEarning} earning={earning}/>
          <Widget type="cost" goto="products" cost={cost}/>
        </div>
        <div className="charts">
          <Featured  percent={percent} earning={earning} cost={cost}/>
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table  userId="null"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
