//This file helps us to create document in to canvas pdf.
import { savePDF } from '@progress/kendo-react-pdf';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import "./temp.css"


class DocService{
  
  
    createPdf = async(html, name) => {
      window.scrollTo(0, 0);
      await new Promise(resolve => {
        setTimeout(() => {
        let variable = html[0].childNodes;
        let variableLen = html[0].childNodes.length;
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'cm',
          format: 'a4',
        });
       
        for(let i=0;i<variableLen;i++){
          html2canvas(variable[i], {scale: 2, useCORS: true, allowTaint: true,}).then(canvas => {
            const image = canvas.toDataURL('image/jpeg', 100 / 100);
            
            const canvasWidth =21.17;
            const pageHeight =29.7;
            let  canvasHeight = (canvas.height * canvasWidth) / canvas.width;
            let marginTop = 0;
            let heightLeft = canvasHeight;
            let marginX = -0.21;
            let marginY = 0;
            doc.addImage(image,'JPEG', marginX, marginY, canvasWidth, canvasHeight,null, 'FAST');
            heightLeft -= pageHeight;
            if(canvas.height!=1809)
            {
              while (heightLeft >= 0) {
                marginTop = heightLeft - canvasHeight;
                doc.addImage(image, 'JPEG', marginX, marginTop, canvasWidth, canvasHeight, null, 'FAST');
                heightLeft -= pageHeight;
              }
            }
            if((i+1) === variableLen){
              doc.save(`${name}.pdf`);
              resolve();
            }
            else{
                  doc.addPage();
                }
          });//htmlcanvas closed
        }//for i loop
      });
    }, 5000);//Timeout
  }
}

const Doc = new DocService();
export default Doc;



