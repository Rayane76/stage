'use client'
import "../../styles/nav.css"
import Form from 'react-bootstrap/Form';
import { useState,useEffect} from "react";
import { FaUser, FaPlus, FaMinus,FaTimes } from 'react-icons/fa';
import axios from 'axios';

export default function Nav(){
    const [client,setClient] = useState("");
    const onClientSelect = (e)=>{
      setClient(e.target.value);
    }
  
/* useEffect(()=>{
  axios.get('/api/client')
  .then(res=>setClient(res.data))
  .catch(err=>console.log(err))
},[]) */

    const maintenant = new Date();
    const jour = maintenant.getDate().toString().padStart(2, '0');
    const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0'); // Les mois commencent à partir de 0
    const annee = maintenant.getFullYear();
    const heure = maintenant.getHours().toString().padStart(2, '0');
    const minutes = maintenant.getMinutes().toString().padStart(2, '0');
    const secondes = maintenant.getSeconds().toString().padStart(2, '0');
    
    const dateEtHeureActuelles = `${jour}/${mois}/${annee} ${heure}:${minutes}:${secondes}`;

    return(
        <>
         <div className="navDiv">
          
           <div className="title">
            <h1>Superette EL BARAKA</h1>
            <button style={{color:'red'}} className="btsupp"><FaTimes /></button>
           </div>



<div className="DivBoxes">


           <div className="navDivFirstBox">
             <h3 style={{color:"red"}}>CREDIT CLIENT</h3>
             <div className="navDivDropDown">
               <h5><FaUser />Clients :</h5>
               <Form.Select className="formClient" value={client} onChange={onClientSelect}>   
               {/* {client ? client.map((item,index)=>{
                      <option key={index}>{item.name}</option>
               }):<h4>Loading.....</h4>} */}
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
             <button className="divBtn"><FaPlus  style={{color:'green'}}/></button>
             <button className="divBtn"><FaMinus style={{color:'red'}} /></button>
             <button className="divBtn" style={{color:'green',fontSize:'20px'}}>*</button>
           </div>
           <div className="dateDiv">
             <h1 style={{marginRight:"15px"}}>{dateEtHeureActuelles}</h1>
           </div>
    </div>
         </div>
        </>
    )
}