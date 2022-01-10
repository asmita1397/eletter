import React, {useState} from "react";
import {storage} from "../firebase";
import {Link} from 'react-router-dom'
import Home from './home';

const  ReactFirebaseFileUpload = () => {
  const[image, setImage] = useState(null);
  const[url, setUrl] = useState("");
  const[progress, setProgress]=useState(0);
  
  const handleChange = e => {
      if(e.target.files[0]){
          setImage(e.target.files[0]);
      }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot =>{
        const progress=Math.round(
          (snapshot.bytesTransferred/snapshot.totalBytes)*100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          // console.log(url);
          setUrl(url);
        });
      }
    );
  };
      console.log("image:",image);
  

      return(
        <div>
          <Home/>
            <div class="container-fluid mt-5">
              <div class="row">
                <div class="col-auto container mt-5 pb-5">
                  <div class="card m-auto shadow-lg mt-5" style={{width: '500px'}}>
                    <div class="card-header" style={{background: 'white'}}>
                      <h3 class="text-center black-text font-bold ">Digital Signature</h3>
                    </div>  
                    <progress value={progress} max="100"/>
                    <br/>
                    <br/> 
                    <input type="file" accept=".png" onChange={handleChange}/>
                    <Link to="/hrLetter">
                    <button onClick={handleUpload} >Upload Signature</button>
                    </Link>
                    
                    {url}
                    <img src={url || "http://via.placeholder.com/300X400"} alt="firebaseimage"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
              
      );
  
};
export default ReactFirebaseFileUpload;

