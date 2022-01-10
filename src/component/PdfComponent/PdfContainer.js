import React, { useContext } from 'react';
import UserContext from '../Context/CustomContext';
import $ from 'jquery';
import '../../component/CommonStyle.css'

export default (props)=> {
  const bodyRef = React.createRef('');
  const user = useContext(UserContext)
  console.log("jjjjjjjjjjjjj",props)
  {$(document).ready(setTimeout(function() {
    $(`#${props.id}`).trigger('click')
 }),600000)}
  return (
    <>
  <section>
   <section  style={{display:"none" }} className="pdf-toolbar">
      <button id={props.id} onClick={()=>user.pdfVal==true?props.createPdf(bodyRef.current,props.name,props.id):null}>Create PDF</button>
    </section>
    <section  className="pdf-body" ref={bodyRef}>
      {props.children}
    </section>
  </section>
    </>
  )
}