import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { getDocs,collection, where, query, } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../firebase";
const List = ({userId}) => {
  const [datas,setData]=useState([])
  useEffect(()=>{
    const transactionCollectionRef=collection(db,"consumer cooperative","1","orders");
    if(userId==="null"){
    const q=query(transactionCollectionRef,where("status","==","accepted"))
    const getTransactions=async ()=>{
      const data=await getDocs(q);
      setData(data.docs.map((doc)=>({...doc.data(),id:doc.id })))
    }
    getTransactions()    
    } else{
    const q=query(transactionCollectionRef,where("CN","==",userId))
    const getTransactions=async ()=>{
      const data=await getDocs(q);
      setData(data.docs.map((doc)=>({...doc.data(),id:doc.id })))
    }
    getTransactions()    

    }    
    
  },[userId])  
  
  return (    
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Cupon number</TableCell>
            <TableCell className="tableCell">Full Name</TableCell>
            <TableCell className="tableCell">Total Price</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.CN}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.full_name}</TableCell>
              <TableCell className="tableCell">{row.total_price}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
