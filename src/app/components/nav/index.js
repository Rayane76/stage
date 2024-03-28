"use client"
import React, { useState, useEffect,useRef} from 'react';
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
import { useReactToPrint } from 'react-to-print';
import { useHist } from '../utils/historyProvider';


export default function Nav(props){
    const [client,setClient] = useState("");
    const [articleInfo,setArticlInfo]=useState(false);
    const [listeBon,setListeBon]=useState(false);
    const [input,setInput] = useState({})
    const [prix,setPrix]=useState();
    const [modifierBon,setModifierBon]=useState(false);
    const [AjouterBon,setAjouterBon]=useState(false);
    const [dateEtHeureActuelles, setDateEtHeureActuelles] = useState(getCurrentDateTime());
    const componentRef = useRef();
    const {history}=useHist();


    const HandelInput=(e)=>{
      e.preventDefault();
      const name=e.target.name
      const value=e.target.value
      setInput(item=>({...item,[name]:value}))
    }

    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
    
    const onClientSelect = (e)=>{
      setClient(e.target.value);
    }

  
      
  
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
   

    const ChangePrix = (e) => {
      e.preventDefault();
      props.prixRef.current.focus();
  };

  const HandelKeyPress = (event) => {
    // Vérifier si la touche pressée est F2
    if (event.key === 'F2' || event.keyCode === 113) {
        setArticlInfo(true);
    }
    // Vérifier si la touche pressée est F4
    else if (event.key === 'F4' || event.keyCode === 115) {
        setListeBon(true);
    }
    // Vérifier si la touche pressée est F8
    else if (event.key === 'F8' || event.keyCode === 119) {
        ChangePrix();
    }
};
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

const handelModifOpen=()=>{
  setModifierBon(true);
  setListeBon(false)
}
const handelModifClose=()=>{
  setModifierBon(false);
  setListeBon(true)
}
  const handelAjoutOpen=()=>{
    setAjouterBon(true);
    setListeBon(false);
  } 
  const handelAjoutClose=()=>{
    setAjouterBon(false);
    setListeBon(true);
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
        <button className="divBtn" onClick={() => setArticlInfo(true)} onKeyDown={HandelKeyPress}>F2 prix?</button>
        <button className="divBtn">F5 OK</button>
        <button className="divBtn" onClick={() => setListeBon(true)} onKeyDown={HandelKeyPress}>F4 Liste</button>
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
            <Modal show={articleInfo} centered onHide={()=>setArticlInfo(false)} >
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




            <Modal show={listeBon} onHide={() => setListeBon(false)} className="fenetre-bon" size="lg">
            
  <Modal.Header   className="modal-header-bon">
    <div className="header">
      <h3 style={{textDecoration:'underline'}}>Liste des bons</h3>
  <div className="custom-close-button" onClick={() => setListeBon(false)}>
    <FaTimes />
    </div>
    </div>
    <div className="ligne1">
    <Form className='form-client'>
      
        <p style={{marginTop:'12px'}}><FaUser />Client:</p>
        <Form.Select  className="client-bon" style={{width:'250px'}}> 
          {/* Options pour le sélecteur de client */}
       </Form.Select>
      
    </Form>
    <div className="button-group">
      <button className="bt" onClick={handelAjoutOpen}>Ajouter<FaPlus style={{color:'green'}} /></button>
      <button className="bt">Effacer<FaMinus  style={{color:'red'}}/></button>
      <button className="bt" onClick={handelModifOpen}>Modifier<FaPen style={{color:'blue'}} /></button>
      <button className="bt" onClick={handlePrint}>Imprimer</button>
   
    </div>
   
    </div>
    <div className="ligne2">
    <div className="date-search">
      <Form>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:"7px"}}>
          <p style={{marginTop:'12px'}}>Date:</p>
          <Form.Control type="text" placeholder="JJ/MM/AAAA" style={{marginLeft:'33px',width:'250px'}} />
          </div>
       <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:"7px"}}>
          <p style={{marginTop:'12px'}}>Au:</p>
          <Form.Control type="text" placeholder="JJ/MM/AAAA" style={{marginLeft:'47px' , width:'250px'}} />
          </div>
      </Form>
      <button className="search-button" style={{marginBottom:'14px'}}><FaSearch /></button>
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
  <Modal.Body className="modal-body-bon" ref={componentRef}>
  <TableContainer component={Paper} >
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
      <TableRow>
        <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Date</TableCell>
        <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Propriétaire</TableCell>
        <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Montant</TableCell>
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
            
            <Modal.Header   className="modal-header-bon2">
              <div className="header">
              <h3 style={{textDecoration:'underline'}}>Modification artilces</h3>
            <div className="custom-close-button" onClick={handelModifClose}>
              <FaTimes />
              </div>
              </div>
          <div className='colones'>
              <div className="colone1">
              <Form.Select className="type">   
               <option >Pro-Format</option>
               <option >Facture</option>
               <option >Bon de Livraison</option>
              </Form.Select>

              <div className='client-modif-bon'>
             <label htmlFor="client" >Client: </label>
              <Form.Select className="clien">   
               <option >Particulier</option>
              </Form.Select>
              <button><FaSearch style={{color:'blue', border:'none'}}/></button>
              <button><FaPlus style={{color:'green',border:'none'}}/></button>
             </div>  

             <label htmlFor="code-bare" className='code-modif'>Codea barres :
              <input type="text" name="code" id="code" />
             </label>

              <div className='famille-modif'>
             <label htmlFor="famille">Famille: </label>
             <Form.Select className="clien" style={{width:'150px'}}>   
               <option >xl</option>
               <option >bs</option>
               <option >ll</option>
               <option >lm</option>
              </Form.Select>
              </div>

              <div className='article-modif'>
             <label htmlFor="article">Article </label>
             <Form.Select className="article" style={{width:'150px'}}>   
               <option >Sucre</option>
               <option >Harisa</option>
               <option >Lai</option>
               <option >Caffe</option>
              </Form.Select>
              <label htmlFor="id" style={{marginLeft:'20px'}}>Id:</label>
              <input type="text" className='id-modif' />
              </div>

              <div style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center',gap:'10px' ,marginRight:'75px'}}>
             <label htmlFor="prix">Prix: </label>
             <input type="text" name="prix" id='prix' />
            

             <label htmlFor="prix">Qte:</label>
             <input type="text" name="quantite" id='quantite'  style={{width:'35px', height:'35px'}}/>
              </div>
              </div>


              <div className="colone2">
                <div className='ligne1-colone2-modif'>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',gap:'13px',zIndex:'1', marginTop:"30px"}}  >
              <div className="date-modif">
               <label htmlFor="date">Date:</label>
                <input type="text" name='date' />
              </div>
              <div className='cadre-orange'>
               <div className='l'>
                <p>Nombre Artilce:</p>
                <h3>0</h3>
               </div>
               <div className='l'>
               <p>Total Qte:</p>
                <h3>0.00</h3>
               </div>
               <div className='l2'>
               <p>Total Bon:</p>
                <h3 style={{color:'red'}}>0.00 DZD</h3>
               </div>
              </div>
            
              </div>
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',gap:'4px'}} className='adr'>
                <button style={{border:'none',width:"70px",height:'40px' , borderRadius:'12px'}}>Adress</button>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'4px'}} >
                <label htmlFor="copie">Copies</label>
                <input type="text" name='copie' style={{width:'36px'}} />
                </div>
                <button className='bt-imprimer-modif'>Imprimer Document</button>
              </div>
              

              </div>

             
              
              <div className="button-modif" style={{marginTop:"8px"}}>
                <button  style={{border:"none"}}><FaPlus style={{color:'green',border:"none"}}/>Ajouter</button>
                <button  style={{border:"none"}}><FaMinus style={{color:'red',border:"none"}}/>Effacer</button>
                <button  style={{border:"none"}}>Enregister</button>
                <button  style={{border:"none"}}><FaPen style={{color:'blue',border:"none"}}/>Modifier</button>
              </div>

              </div>
              

              </div>
            </Modal.Header>
            <Modal.Body className="modal-body-bon">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}} >Date</TableCell>
                  <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Propriétaire</TableCell>
                  <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Montant</TableCell>
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



<Modal show={AjouterBon} centered onHide={() => setAjouterBon(false)}  className="fenetre-bon" size="lg" >
            
<Modal.Header   className="modal-header-bon2">
              <div className="header">
              <h3 style={{textDecoration:'underline'}}>Ajouter artilces</h3>
            <div className="custom-close-button" onClick={handelAjoutClose}>
              <FaTimes />
              </div>
              </div>
          <div className='colones'>
              <div className="colone1">
              <Form.Select className="type">   
               <option >Pro-Format</option>
               <option >Facture</option>
               <option >Bon de Livraison</option>
              </Form.Select>

              <div className='client-modif-bon'>
             <label htmlFor="client" >Client: </label>
              <Form.Select className="clien">   
               <option >Particulier</option>
              </Form.Select>
              <button className='search-modif'><FaSearch style={{color:'blue'}} /></button>
              <button className='search-modif'><FaPlus style={{color:'green'}} /></button>
             </div>  

             <label htmlFor="code-bare" className='code-modif'>Codea barres :
              <input type="text" name="code" id="code" />
             </label>

              <div className='famille-modif'>
             <label htmlFor="famille">Famille: </label>
             <Form.Select className="clien" style={{width:'150px'}}>   
               <option >xl</option>
               <option >bs</option>
               <option >ll</option>
               <option >lm</option>
              </Form.Select>
              </div>

              <div className='article-modif'>
             <label htmlFor="article">Article </label>
             <Form.Select className="article" style={{width:'150px'}}>   
               <option >Sucre</option>
               <option >Harisa</option>
               <option >Lai</option>
               <option >Caffe</option>
              </Form.Select>
              <label htmlFor="id" style={{marginLeft:'20px'}}>Id:</label>
              <input type="text" className='id-modif' />
              </div>

              <div style={{display:'flex',flexDirection:'row', justifyContent:'center', alignItems:'center',gap:'10px' ,marginRight:'75px'}}>
             <label htmlFor="prix">Prix: </label>
             <input type="text" name="prix" id='prix' />
            

             <label htmlFor="prix">Qte:</label>
             <input type="text" name="quantite" id='quantite'  style={{width:'35px', height:'35px'}}/>
              </div>
              </div>


              <div className="colone2">
                <div className='ligne1-colone2-modif'>
                <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',gap:'13px',zIndex:'1', marginTop:"30px"}}  >
              <div className="date-modif">
               <label htmlFor="date">Date:</label>
                <input type="text" name='date' />
              </div>
              <div className='cadre-orange'>
               <div className='l'>
                <p>Nombre Artilce:</p>
                <h3>0</h3>
               </div>
               <div className='l'>
               <p>Total Qte:</p>
                <h3>0.00</h3>
               </div>
               <div className='l2'>
               <p>Total Bon:</p>
                <h3 style={{color:'red'}}>0.00 DZD</h3>
               </div>
              </div>
            
              </div>
              <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center',gap:'4px'}} className='adr'>
                <button style={{border:'none',width:"70px",height:'40px' }}>Adress</button>
                <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'4px'}} >
                <label htmlFor="copie">Copies</label>
                <input type="text" name='copie' style={{width:'36px'}} />
                </div>
                <button className='bt-imprimer-modif'>Imprimer Document</button>
              </div>
              

              </div>

             
              
              <div className="button-modif" style={{marginTop:"3px"}}>
                <button  style={{border:"none",padding:"8px"}}><FaPlus style={{color:'green',border:"none"}}/>Ajouter</button>
                <button  style={{border:"none",padding:"8px"}}><FaMinus style={{color:'red',border:"none"}}/>Effacer</button>
                <button  style={{border:"none",padding:"8px"}}>Enregister</button>
                <button  style={{border:"none",padding:"8px"}}><FaPen style={{color:'blue',border:"none"}}/>Modifier</button>
              </div>

              </div>
              

              </div>
            </Modal.Header>
            <Modal.Body className="modal-body-bon">
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Date</TableCell>
                  <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Propriétaire</TableCell>
                  <TableCell style={{fontWeight:'bolde',color:'black',fontSize:'17px'}}>Montant</TableCell>
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
