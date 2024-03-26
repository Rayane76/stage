"use client"
import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import "../../styles/nav.css"
import "../../styles/tableTotal.css"
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap'; 
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaSearch ,FaPlus, FaMinus,FaPen,FaUser,FaTimes } from 'react-icons/fa';
import Calculator from '../utils/Calculatrice';



export default function Nav(props){
    const [client,setClient] = useState("");
    const [articleInfo,setArticlInfo]=useState(false);
    const [listeBon,setListeBon]=useState(false);
    const [input,setInput] = useState({})
    const [prix,setPrix]=useState();
    const [modifierBon,setModifierBon]=useState(false);
    const [AjouterBon,setAjouterBon]=useState(false);
    const [dateEtHeureActuelles, setDateEtHeureActuelles] = useState(getCurrentDateTime());
    const [showCalculator, setShowCalculator] = useState(false);

    const HandelInput=(e)=>{
      e.preventDefault();
      const name=e.target.name
      const value=e.target.value
      setInput(item=>({...item,[name]:value}))
    }
    
    const handleCalcButtonClick = () => {
      setShowCalculator(true); // Affichez la calculatrice lorsque le bouton "Calc" est cliqué
  };
    
    const onClientSelect = (e)=>{
      setClient(e.target.value);
    }

    const HandelPrint = async (e) => {
      e.preventDefault();
      try {
          const pdfDocumentUrl = '/public/DemandeStageLicence.pdf';
  
          // Récupérer le contenu du fichier PDF sous forme de blob
          const response = await fetch(pdfDocumentUrl);
          const blob = await response.blob();
  
          // Créer un objet URL à partir du blob
          const blobUrl = URL.createObjectURL(blob);
  
          // Créer un objet <embed> pour afficher le PDF dans la page
          const embedElement = document.createElement('embed');
          embedElement.src = blobUrl;
          embedElement.type = 'application/pdf';
          embedElement.style.display = 'none'; // Assurez-vous que l'élément est caché
  
          // Ajouter l'élément à la page
          document.body.appendChild(embedElement);
  
          // Attendre un court délai pour que le PDF soit chargé
          await new Promise(resolve => setTimeout(resolve, 1000));
  
          // Imprimer le contenu de l'élément <embed>
          window.print();
  
          // Retirer l'élément de la page une fois l'impression terminée
          document.body.removeChild(embedElement);
  
          // Révoquer l'URL du blob pour libérer la mémoire
          URL.revokeObjectURL(blobUrl);
      } catch (error) {
          console.error('Erreur lors de l\'impression du document PDF :', error);
      }
  };
      
  
 useEffect(()=>{
  axios.get('http://127.0.0.1:8000/api/comptoire/entite-personnes/client/')
  .then(res=>setClient(res.data))
  .catch(err=>console.log(err))
},[]) 

useEffect(() => {
  // Mettre à jour la date et l'heure toutes les secondes
  const interval = setInterval(() => {
      setDateEtHeureActuelles(getCurrentDateTime());
  }, 1000);

  // Nettoyer l'intervalle lors du démontage du composant
  return () => clearInterval(interval);
}, []);


   function getCurrentDateTime() {
        const maintenant = new Date();
        const jour = maintenant.getDate().toString().padStart(2, '0');
        const mois = (maintenant.getMonth() + 1).toString().padStart(2, '0');
        const annee = maintenant.getFullYear();
        const heure = maintenant.getHours().toString().padStart(2, '0');
        const minutes = maintenant.getMinutes().toString().padStart(2, '0');
        const secondes = maintenant.getSeconds().toString().padStart(2, '0');
        return `${jour}/${mois}/${annee} ${heure}:${minutes}:${secondes}`;
    }

   

// si je clique sur f2 ou sur le button je fait un focuse sur le input de prix 
    const ChangePrix=(e)=>{
     e.preventDefault();
     props.prixRef.current.focus();
    }

    const HandelKeyPress=(event)=>{
      if (event.key === 'F8') {
        props.prixRef.current.focus();
         
      }
    } 

    const HandelArticl=(e)=>{
      e.preventDefault();
      const selectedItem=props.article.find(item=>item.codif===e.target.value);
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
        <h3 style={{ color: "red" }}>CREDIT CLIENT</h3>
        <div className="navDivDropDown">
            <h5><FaUser /> Clients :</h5>
            <Form.Select className="formClient" value={client} onChange={onClientSelect}>
                {/* Options de sélection de client */}
            </Form.Select>
        </div>
    </div>
    <div className="navDivButtons">
        <button className="divBtn" onClick={() => setArticlInfo(true)}>F2 prix?</button>
        <button className="divBtn">F5 OK</button>
        <button className="divBtn" onClick={() => setListeBon(true)}>F4 Liste</button>
        <button className="divBtn">SUI</button>
        <button className="divBtn">Pre</button>
        <button className="divBtn">F1</button>
        <button className="divBtn">con F10</button>
        <button className="divBtn" onClick={ChangePrix} onKeyDown={HandelKeyPress}>Prix F8</button>
        <button className="divBtn">F11</button>
        <button className="divBtn"><FaPlus style={{ color: 'green' }} /></button>
        <button className="divBtn"><FaMinus style={{ color: 'red' }} /></button>
        <button className="divBtn" style={{ color: 'green', fontSize: '20px' }}>*</button>
      
    </div>
    <div className="dateDiv">
        <h2>{dateEtHeureActuelles}</h2>
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
               {/*  {props ?  props.article.map((item,index)=>(
                    <option key={index}>{item.article}</option>
                  )):""} */}
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
    className="codbarre"
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




            <Modal show={listeBon} onHide={() => setListeBon(false)} >
            
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
        <Form.Select  className="client-bon"> 
          {/* Options pour le sélecteur de client */}
       </Form.Select>
      </Form.Group>
    </Form>
    <div className="button-group">
      <button className="bt" onClick={()=>setAjouterBon(true)}>Ajouter<FaPlus style={{color:'green'}} /></button>
      <button className="bt">Effacer<FaMinus  style={{color:'red'}}/></button>
      <button className="bt" onClick={()=>setModifierBon(true)}>Modifier<FaPen style={{color:'blue'}} /></button>
      <button className="bt" onClick={HandelPrint}>Imprimer</button>
   
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




<Modal show={modifierBon} centered onHide={() => setModifierBon(false)} className="fenetre-bon"  size="lg">
            
            <Modal.Header   className="modal-header-bon">
              <div className="header">
                <p >Vente Article Modification</p>
            <div className="custom-close-button" onClick={() => setModifierBon(false)}>
              <FaTimes />
              </div>
              </div>
          
              <div className="colone1">
              <Form.Select className="type">   
               <option >Pro-Format</option>
               <option >Facture</option>
               <option >Bon de Livraison</option>
              </Form.Select>
             <label htmlFor="client">Client:
              <Form.Select className="clien">   
               <option >Particulier</option>
              </Form.Select>
              <button><FaSearch style={{color:'blue', border:'none'}}/></button>
              <button><FaPlus style={{color:'green',border:'none'}}/></button>
             </label>             
             <label htmlFor="code-bare">Codea barres
              <input type="text" name="code" id="code" />
             </label>

             <label htmlFor="famille">Famille:
             <Form.Select className="clien">   
               <option >xl</option>
               <option >bs</option>
               <option >ll</option>
               <option >lm</option>
              </Form.Select>
             </label>
             <label htmlFor="article">Article
             <Form.Select className="article">   
               <option >Sucre</option>
               <option >Harisa</option>
               <option >Lai</option>
               <option >Caffe</option>
              </Form.Select>
             </label>
             <label htmlFor="prix">Prix:
             <input type="text" name="prix" id='prix' />
             </label>

             <label htmlFor="prix">Qte:
             <input type="text" name="quantite" id='quantite' />
             </label>
              </div>

              <div className="colone2">
              <div className="date-search">
               <label htmlFor="date">Date:
                <input type="text" name='date' />
               </label>
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



<Modal show={AjouterBon} onHide={() => setAjouterBon(false)} className="fenetre-bon" centered>
            
            <Modal.Header   className="modal-header-bon">
              <div className="header">
                <p >Vente Article Modification</p>
            <div className="custom-close-button" onClick={() => setAjouterBon(false)}>
              <FaTimes />
              </div>
              </div>
          
              <div className="colone1">
              <Form.Select className="type">   
               <option >Pro-Format</option>
               <option >Facture</option>
               <option >Bon de Livraison</option>
              </Form.Select>
             <label htmlFor="client">Client:
              <Form.Select className="clien">   
               <option >Particulier</option>
              </Form.Select>
              <button><FaSearch style={{color:'blue', border:'none'}}/></button>
              <button><FaPlus style={{color:'green',border:'none'}}/></button>
             </label>             
             <label htmlFor="code-bare">Codea barres
              <input type="text" name="code" id="code" />
             </label>

             <label htmlFor="famille">Famille:
             <Form.Select className="clien">   
               <option >xl</option>
               <option >bs</option>
               <option >ll</option>
               <option >lm</option>
              </Form.Select>
             </label>
             <label htmlFor="article">Article
             <Form.Select className="article">   
               <option >Sucre</option>
               <option >Harisa</option>
               <option >Lai</option>
               <option >Caffe</option>
              </Form.Select>
             </label>
             <label htmlFor="prix">Prix:
             <input type="text" name="prix" id='prix' />
             </label>

             <label htmlFor="prix">Qte:
             <input type="text" name="quantite" id='quantite' />
             </label>
              </div>

              <div className="colone2">
              <div className="date-search">
               <label htmlFor="date">Date:
                <input type="text" name='date' />
               </label>
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
