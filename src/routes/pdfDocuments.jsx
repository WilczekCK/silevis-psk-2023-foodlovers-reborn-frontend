import {useState} from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from '../components/pdfs/zal1';

export default function PdfDocuments() {
  const [textOne, setTextOne] = useState('');

  function changeText({target}){
    const {value} = target;
    setTextOne(value);
  }
  return (

    <>
      <input type="name" onChange={changeText} />

      <PDFViewer style={{width: '1240px'}}>
          <MyDocument textOne={textOne}/>
      </PDFViewer>
    </>


  );
}
