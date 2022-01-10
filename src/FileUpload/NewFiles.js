import React from 'react';


   
   export default class SubmitComp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image: '',
            file: null
        }

        this.onChange = this.onChange.bind(this)
    }
    
    // handleClick(event){
    //    let hiddenFileInput;

    //     hiddenFileInput.click();
    //    }
    
   
     // Call a function (passed as a prop from the parent component)
     // to handle the user-selected file 
     onChange = e => {
       const fileUploaded = e.target.files;
       console.log('new imgg', fileUploaded)
       let reader = new FileReader();
       reader.readAsDataURL(fileUploaded[0])
    //    this.props.handleFile = (fileUploaded);
       reader.onload = (e) => {
           console.log('img data', e.target.result)
           const formData = {file:e.target.result};
console.log("Form Data", formData)


var urls = formData; 
console.log('hello',urls) 
}; }

     render(){
     return (
       <div>
         {this.state.image}
         {this.state.file}
         <div style={{position:'relative'}}>
         <label for="files" class="btn" style={{color:'white',border:'1px solid orange',padding:'5px',position:'absolute', marginLeft:'78px', marginTop:'-1px'}}>Upload Digital Signature</label>
         <input
           type="file"
           accept=".png"
           onChange={(e) => this.onChange(e)}
           id="files"
           style={{visibility:'hidden'}}
        //    style={{display: 'none'}} 
         />

        
         </div>



       </div>
     );
   }
}
  
  
  

   
      