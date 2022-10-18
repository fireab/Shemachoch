import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns, userColumns, orderColumns} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where
} from "firebase/firestore";
import { db } from "../../firebase";

///modals modules
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

//Style for modals
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Datatable = ({input}) => {
  const [data, setData] = useState([]);
  const [accUser, setAccUsers] = useState([]);
//state for modals
  const [open, setOpen] = React.useState(false);
  const [cuponNo,setCuponNo]=useState('')

  const [userId,setUserId]=useState('');  
  
  //function to control modules
  const handleOpen = (id) => {
    setOpen(true)
    setUserId(id);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {   

    const getAcceptedUsers=async ()=>{
      const usersCollectionRe=collection(db,"users");
      const q=query(usersCollectionRe,where("status","==","accepted"))
      const data=await getDocs(q);
      setAccUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id}))) 
    }  
    getAcceptedUsers()    
  
    
    const unsub = onSnapshot(
      (input==="users") ? collection(db,`${input}`) : collection(db,"consumer cooperative","1",`${input}`) ,
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });          
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );


    return () => {
      unsub();
    };
  }, [input]);

  

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db,"consumer cooperative","1",`${input}`, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const notify=async(id)=>{ 
    const docRef = doc(db,"consumer cooperative","1","products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const orderDoc=doc(db,"consumer cooperative","1","products",id)
      const newField={notify:true }
        await updateDoc(orderDoc,newField)      
    } else {
      console.log("No such document!");
    } 
  }

  const notification=(id,name,limit,metric)=>{
    notify(id)
    accUser.forEach(doc=>{
    const createCart=async()=>{
        await addDoc(collection(db,"users",`${doc.id}`,"notifications"),{title:`hello ${doc.first_name} ${doc.last_name} ${name} is in store you can take  ${limit} ${metric}`,detail:"",timestamp:serverTimestamp(),status:"new"});
      };
      createCart()
    })
   
  }


  const handleUserAccept=async(e)=>{
    e.preventDefault()
    const docRef = doc(db,"users", userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const orderDoc=doc(db,"users",userId)
      const newField={status:"accepted", CN:`${cuponNo}` }
        await updateDoc(orderDoc,newField)      
    } else {
      console.log("No such document!");
    } 
    
    handleClose()
  }
  const handleUserDecline=async(id)=>{
    try {
      await deleteDoc(doc(db,"users", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const handleAccept= async(id)=>{   
    
    const docRef = doc(db,"consumer cooperative","1","orders", id);
    console.log(id,input,"yOHwhvMobcbdLnyxMuku");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const orderDoc=doc(db,"consumer cooperative","1","orders", id)
      const doRef = doc(db,"consumer cooperative","1","earning", "earning");
      const doSnap = await getDoc(doRef);
  
      if (doSnap.exists()) {
        const costDoc=doc(db,"consumer cooperative","1","earning", "earning")
          const newField={ earning:parseInt (doSnap.data().earning+docSnap.data().total_price,10) }
          await updateDoc(costDoc,newField)       
        } else {
        console.log("No such document!");
      } 
      const newField={status:"accepted" }
        await updateDoc(orderDoc,newField)    

      
    } else {
      console.log("No such document!");
    }     
  }

  const handleDecline=async(id)=>{ 
    const docRef = doc(db,"consumer cooperative","1","orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const orderDoc=doc(db,"consumer cooperative","1","orders",id)
      const newField={status:"declined" }
        await updateDoc(orderDoc,newField)      
    } else {
      console.log("No such document!");
    } 
  }
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {(input==="users") ?
            <>
              <Modal
                 open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Give Cupon number
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      <form action="" onSubmit={handleUserAccept}>
                      <input  type="text" placeholder="Cupone number" onChange={(e)=>setCuponNo(e.target.value)}
                      style={{border: 'none',
                        borderBottom: '1px solid gray',
                        margin:'50px',
                        outline:'none'
                      }}
                      />
                      <button type="submit"
                      style={{
                        width: '100px',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: 'teal',
                        color: 'white',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        marginTop: '10px',
                      }}
                      >
                        Submit</button>
                      </form>
                     </Typography>
                  </Box>
              </Modal>

              <Link to={`/users/${params.row.CN}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">View</div>
              </Link>
              <div
                style={{display:`${(params.row.status==='accepted'|| params.row.status==='declined')? 'none': "block"}`}}
                className="acceptButton"
                onClick={() => (handleOpen(params.row.id))}>
                Accept
              </div> 
             <div
                className="declineButton"
                style={{display:`${(params.row.status==='accepted'|| params.row.status==='declined')? 'none': "block"}`}}
                onClick={() => handleUserDecline(params.row.id) }>                
                Decline
              </div>             
            </>:
              (input==="products")?
            <>
              <Link to={`/products/${params.row.productID}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">edit</div>
              </Link>
              <div 
              className="deleteButton"
              onClick={() => handleDelete(params.row.productID)}>
              Delete
              </div>
              <div 
              className="deleteButton"
              style={{color:'black',display:`${params.row.notify && "none"}`}}
              onClick={() => notification(params.row.productID,params.row.product,params.row.limit,params.row.metric)}>
              Notify
              </div>
            </>:
            <>
             <div
              style={{display:`${(params.row.status==='accepted'|| params.row.status==='declined')? 'none': "block"}`}}
              className="acceptButton"
              onClick={() => handleAccept(params.row.id)}>
              Accept
              </div> 
             <div
              className="declineButton"
              style={{display:`${(params.row.status==='accepted'|| params.row.status==='declined')? 'none': "block"}`}}
              onClick={() => handleDecline(params.row.id) }>                
              Decline
              </div> 
              <div>
                <Link to={`/orders/${params.row.id}`} style={{ textDecoration: "none" }}>
                  <div className="viewButton">Products</div>
                </Link>
              </div>

            </>
            }
            
          </div>
        );
      },
    },
  ];
  
  return (
    <div className="datatable">
        {(input==="products") ? 
      <div className="datatableTitle">
        Add New {`${input}`}
        <>

        <Link to={`/${input}/new`} className="link">
          Add New
        </Link>
        </>
        </div>
        :
        (input==="orders")?
        <div className="datatableTitle">All Orders</div> :
        <div className="datatableTitle">All Users</div> 
      }
      
      <DataGrid
        className="datagrid"
        rows={data}
        columns={(input==="products") ? productColumns.concat(actionColumn): 
        (input==="users")?userColumns.concat(actionColumn):
        orderColumns.concat(actionColumn)
      }
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
