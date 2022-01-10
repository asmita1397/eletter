//This file contains letterHead. When user clicks letterhead on navigation bar.
//Letter header,footer and watermark will render on each page.
import React, { useState, useContext } from 'react';
// import { UserConsumer } from './Context/CustomContext';
import {storage} from "../firebase";
import firebase from "firebase/app";
import $ from 'jquery';
// import imageToBase64 from 'image-to-base64';
// import ImgToBase64 from 'react-native-image-base64';

function CheckSign(props) {
    const [value, setValue] = useState(false);
    const CheckValue = () => {
       var storage=firebase.storage();
        var storageRef=storage.ref();
        $('#List').find('tbody').html('');
        var i=0;
        storageRef.child('images/').listAll().then(function(result){
        result.items.forEach(function(imageRef){
                i++;
                imageRef.getDownloadURL().then(function(url){    
                    props.showUrl(url, value);
                    setValue(!value)
            
            });
               
        });
    });
    
    }

     
    
 return (
        <div>
            <div>
                <div className="form-check form-check-inline col-md-1 ">
                    <input className="form-check-input" type="checkbox"  checked={value} id="inlineCheckbox1"  />
                    <label style={{ whiteSpace: 'nowrap', fontWeight: '500',color:"white" }} className="form-check-label" >Digital signature</label>
                </div>

            </div>
        </div>
    );
}

export default CheckSign;


// onClick={()=>{CheckValue()}}