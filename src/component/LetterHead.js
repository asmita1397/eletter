//This file contains letterHead. When user clicks letterhead on navigation bar.
//Letter header,footer and watermark will render on each page.
import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import printer from './Assests/print.jpeg'
import { UserConsumer } from './Context/CustomContext';

function Example(props) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(true);
    const context = useContext(UserConsumer);

    const handleClose = () => {
        setShow(false);
    }
    const printPreview = () => {
        setShow(false);
        setTimeout(() => {
            window.print();
            console.log("object", window.onafterprint)
        }, 500)
    }

    const handleShow = () => setShow(true);
    const CheckValue = () => {
        setValue(!value)
        console.log("check box value ", value, "And", !value);
        props.showWatermark(value);
    
    }

    const handleClick = (val) => {
        context.pdfValMethod(val)
    }
    return (
        <div>
            <div>
                <div className="form-check form-check-inline col-md-1 ">
                    <input className="form-check-input" type="checkbox" checked={!value} id="inlineCheckbox1" onClick={()=>{CheckValue(); handleClick(false);}} />
                    <label style={{ whiteSpace: 'nowrap', fontWeight: '500',color:"white" }} className="form-check-label" >LetterHead</label>
                </div>

            </div>
        </div>
    );
}

export default Example;