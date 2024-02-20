'use client'
import "../../styles/nav.css"
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from "react";

export default function Nav(){
    const [client,setClient] = useState("");
    const onClientSelect = (e)=>{
      setClient(e.target.value);
    }

    // const [time, setTime] = useState(new Date());

    // useEffect(() => {
    //   const interval = setInterval(() => {
    //     setTime(new Date());
    //   }, 1000);
  
    //   return () => clearInterval(interval);
    // }, []);
  

    const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const hour = String(today.getHours()).padStart(2, '0');
const minute = String(today.getMinutes()).padStart(2, '0');
const second = String(today.getSeconds()).padStart(2, '0');

const formattedTime = `${hour}:${minute}:${second}`;

const formattedDate = `${day}/${month}/${year}`;

    return(
        <>
         <div className="navDiv">
           <div className="navDivFirstBox">
             <h3 style={{color:"red"}}>CREDIT CLIENT</h3>
             <div className="navDivDropDown">
               <h5>Clients :</h5>
               <Form.Select className="formClient" value={client} onChange={onClientSelect}>   
                <option value="s">Particulier</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
               </Form.Select>
             </div>
           </div>
           <div className="navDivButtons">
             <button className="divBtn">F2 prix?</button>
             <button className="divBtn">F5  OK</button>
             <button className="divBtn">F4 Liste</button>
             <button className="divBtn">SUI</button>
             <button className="divBtn">Pre</button>
             <button className="divBtn">F1</button>
             <button className="divBtn">con F10</button>
             <button className="divBtn">Prix F8</button>
             <button className="divBtn">F11</button>
             <button className="divBtn">+</button>
             <button className="divBtn">-</button>
             <button className="divBtn">*</button>
           </div>
           <div className="dateDiv">
             <h1 style={{marginRight:"15px"}}>{formattedDate}</h1>
           </div>
         </div>
        </>
    )
}