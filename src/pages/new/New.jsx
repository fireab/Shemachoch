import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import {  db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const New = ({ inputs, title, add }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPerc] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {    
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    
    (id==="unit_price" || id==="total_amount" || id==="limit" || id==="unit_amount") ? 
    setData({ ...data, [id]: parseInt(value,10) }) :
    setData({ ...data, [id]: value }) 


  };

  const handleAdd = async (e) => {
    console.log(data.unit_price);
    e.preventDefault();
    try {
      const newDocRef = doc(collection(db,"consumer cooperative","1", "products"));
      await setDoc(
        newDocRef, 
        {
          ...data,
          total_price:parseInt(data.unit_price * data.total_amount,10),
          timestamp: serverTimestamp(),
          productID: newDocRef.id,
          availability:true,
        }
    )

        // const costDoc=doc(db,"consumer cooperative","1","cost","cost")
        // if(isNaN(data.unit_price) || isNaN(data.total_amount)) {
        //   console.log("isNan:",cost);
        //   const newField={ cost:cost }
        //   await updateDoc(costDoc,newField)          
        // }
        // else{
        //   console.log("not Nan:",cost);
        //   console.log("not Nan sum:",cost + (data.unit_price * data.total_amount));
        //   const newField={ cost:cost + (data.unit_price * data.total_amount) }         
        //   await updateDoc(costDoc,newField)
        // }
     
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button disabled={per !== null && per < 100} type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
