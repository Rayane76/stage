'use client'
import "../../styles/nav.css"
import "../../styles/tableTotal.css"
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { useState,useEffect,useContext} from "react";
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaSearch ,FaPlus, FaMinus, FaCheck,FaPen,FaUser,FaTimes } from 'react-icons/fa';


export default function Nav(props){
    const [client,setClient] = useState("");
    const [articleInfo,setArticlInfo]=useState(false);
    const [listeBon,setListeBon]=useState(false);
    const [input,setInput] = useState({})
    const [prix,setPrix]=useState();
    const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });// pour changer la position de la fentre

    const HandelInput=(e)=>{
      e.preventDefault();
      const name=e.target.name
      const value=e.target.value
      setInput(item=>({...item,[name]:value}))
    }
    
    
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


// si je clique sur f2 ou sur le button je fait un focuse sur le input de prix 
    const ChangePrix=(e)=>{
     e.preventDefault();
     props.prixRef.current.focus();
    }

    const HandelKeyPress=(event)=>{
      if (event.key === 'f8') {
        props.prixRef.current.focus();
         
      }
    } 

    const HandelArticl=(e)=>{
      e.preventDefault();
      const selectedItem=props.article.find(item=>item.article===e.target.value);
      if(selectedItem){
       const prixformater= formatPrice(selectedItem.prix)
        setInput(prev=>({
          ...prev,
          id: selectedItem.id,
          prix: prixformater,
        }))
        setPrix(selectedItem.prix)
      }
    }


    // la fonction qui va affciher le prix formateer exemple 13,00 DZD
    const formatPrice = (price) => {
      // Convertir le prix en nombre
      const numericPrice = parseFloat(price);
      // Formater le prix avec deux décimales et ajouter " DZD"
      return `${numericPrice.toFixed(2)} DZD`;
    };

  const HandelCodeInput=(e)=>{
    e.preventDefault();
    const name=e.target.name
    const value=e.target.value

    if(!isNaN(value)){
      setInput(item=>({...item,[name]:value}))
    }
  }


   

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
             <button className="divBtn" onClick={()=>setArticlInfo(true)}>F2 prix?</button>
             <button className="divBtn">F5  OK</button>
             <button className="divBtn" onClick={()=>setListeBon(true)}>F4 Liste</button>
             <button className="divBtn">SUI</button>
             <button className="divBtn">Pre</button>
             <button className="divBtn">F1</button>
             <button className="divBtn">con F10</button>
             <button className="divBtn" onClick={ChangePrix} onKeyDown={HandelKeyPress}>Prix F8</button>
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
            <Modal show={articleInfo} onHide={()=>setArticlInfo(false)}>
                <Modal.Header closeButton className="modal-header">
                    <Modal.Title>Inforamtion Article</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body">
                <label>Famille:
                <Form.Select className="articleForm" onChange={HandelArticl}>  
                </Form.Select>
                </label>
                <label>Article:
                <Form.Select className="articleForm" onChange={HandelArticl}>   
                {props.article.map((item,index)=>(
                    <option key={index}>{item.article}</option>
                  ))}
                </Form.Select>
              </label>
              <label>Id:
                <input type="text" name="id" className="id" value={input.id} onChange={HandelInput} />
              </label>
              <label >CodeBarre:
                 <input type="text"
    name="code"
    pattern="[0-9]*"
    maxLength="13"
    className="code"
    value={input.code}
    onChange={HandelCodeInput}
    
    required  />
              </label>
              <label>Prix:
             <input type="text" name="prix" className="prix" value={input.prix} onChange={HandelInput}  />
             </label>
                </Modal.Body>
                <Modal.Footer className="modal-footer">
                   <h1 style={{color:'green'}}>{prix ?formatPrice(prix):""}</h1> 
                </Modal.Footer>
            </Modal>




            <Modal show={listeBon} onHide={() => setListeBon(false)} className="fenetre-bon">
            
  <Modal.Header  className="modal-header-bon">
    <div className="header">
      <p >Liste des bons</p>
  <div className="custom-close-button" onClick={() => setListeBon(false)}>
    <FaTimes />
    </div>
    </div>
    <div className="ligne1">
    <Form>
      <Form.Group controlId="clientSelect">
        <Form.Label><FaUser />Client:</Form.Label>
        <Form.Control as="select" className="client-bon">
          {/* Options pour le sélecteur de client */}
        </Form.Control>
      </Form.Group>
    </Form>
    <div className="button-group">
      <button className="bt">Ajouter<FaPlus style={{color:'green'}} /></button>
      <button className="bt">Effacer<FaMinus  style={{color:'red'}}/></button>
      <button className="bt">Modifier<FaPen style={{color:'blue'}} /></button>
    </div>
   
    </div>
    <div className="ligne2">
    <div className="date-search">
      <Form>
        <Form.Group controlId="dateRange">
          <Form.Label>Date:</Form.Label>
          <Form.Control type="text" placeholder="JJ/MM/AAAA" />
        </Form.Group>
        <Form.Group controlId="toDate">
          <Form.Label>Au:</Form.Label>
          <Form.Control type="text" placeholder="JJ/MM/AAAA" />
        </Form.Group>
      </Form>
      <button className="search-button"><FaSearch /></button>
    </div>
    <div className="amount-search">
      <Form>
        <Form.Group controlId="amountSearch">
          <Form.Label>Chercher Montant:</Form.Label>
          <Form.Control type="text" defaultValue={formatPrice(0)} />
        </Form.Group>
      </Form>
    </div>
    </div>
    <div className="radio-buttons">
      <Form.Check inline type="radio" label="Aujourd'hui" />
      <Form.Check inline type="radio" label="Semaine" />
      <Form.Check inline type="radio" label="Mois" />
      <Form.Check inline type="radio" label="Année" />
    </div>
  </Modal.Header>
  <Modal.Body className="modal-body-bon">
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
      <TableRow>
        <TableCell >Date</TableCell>
        <TableCell >Propriétaire</TableCell>
        <TableCell >Montant</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
     {/*  {Bon ? Bon.map((item,index)=>{
        <TableRow>
          <TableCell align="right">{Bon.date}</TableCell>
          <TableCell align="right">{Bon.propritaire}</TableCell>
          <TableCell align="right">{Bon.montant}</TableCell>
        </TableRow>
      }):<h1>Pas de Bon ???</h1>} */}
      <TableRow>
        <TableCell >Date 1</TableCell>
        <TableCell >Propriétaire 1</TableCell>
        <TableCell >Montant 1</TableCell>
      </TableRow>
      <TableRow>
        <TableCell >Date 2</TableCell>
        <TableCell>Propriétaire 2</TableCell>
        <TableCell >Montant 2</TableCell>
      </TableRow>
      {/* Ajoutez d'autres lignes de données si nécessaire */}
    </TableBody>
  </Table>
</TableContainer>

  </Modal.Body>
  <Modal.Footer className="modal-footer-bon">
    <h1 style={{ color: 'green' }}>Total: {prix ? formatPrice(0) : ""}</h1>
  </Modal.Footer>
  
</Modal>

        </>
    )
}
