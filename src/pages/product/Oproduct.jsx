import { useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { getDocs,collection} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";



const Oproduct = () => {
    const param=useParams()
    const oproductId=param.oproductId 
    const [data,setData]=useState([])

    useEffect(()=>{
        const productref=collection(db,"consumer cooperative","1","orders",`${oproductId}`,"products");
        const getTransactions=async ()=>{
          const data=await getDocs(productref);
          setData(data.docs.map((doc)=>({...doc.data(),id:doc.id })))
        }
        getTransactions()    
    
    },[oproductId])
    console.log("",data);
    return (
        <div className="single">
        
            <Sidebar />
            <div className="singleContainer">
                <Navbar />         
            <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Product ID</TableCell>
            <TableCell className="tableCell">Produt Name</TableCell>
            <TableCell className="tableCell">Brand</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.brand} </TableCell>
              <TableCell className="tableCell">{row.amount} {row.metric}</TableCell>
              <TableCell className="tableCell">{row.price} Birr</TableCell>
              
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        </div>

  ) 
}

export default Oproduct