import React, { Component } from "react";

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

    this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });
    }
  };

  render() {
    return (
      <div>
       
          <div style={{position:"relative"}}>
           
          <label for="files" class="btn" style={{color:'white',border:'1px solid orange',padding:'5px',position:'absolute', marginLeft:'78px', marginTop:'-1px'}}>Upload Digital Signature</label>
            <input 
            type="file" 
            name="myImage" 
            accept=".png"
id="files"
style={{visibility:'hidden'}}
            onChange={this.onImageChange} />
           
        </div>
        
        <img style={{position:"absolute"}}  src={this.state.image} />
          
        </div>
      
    );
  }
}
export default DisplayImage;
