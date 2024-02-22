'use client'
import "../../styles/codePrice.css"
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { createContext, useEffect, useRef,useState, } from "react";
import axios from 'axios';

//utilsier create context pour peut transporter larticel vers la page des tableaux
/* export default ArtcileConetxt=createContext() */

export default function CodePrice(){
   const cbRef = useRef(null);
   const qteRef = useRef(null);
   const prixRef = useRef(null);
   const [input,setInput]=useState({})
   /*const [prix,setPrix]=useState(0)
   const [id,setPrix]=useState(0)
    const [ajouter,setAjouter]=useState(false);
   const [showModal, setShowModal] = useState(true);
   const handleClose = () => setShowModal(false); 
   const [nvInputs,setNvInpust]=useState({}); 
   const [clickedArticle,SetClickedArticle]=useState('')*/



/* const [famille, setFamille] = useState([]);
const [article, setArticl] = useState([]);


useEffect(() => {
  Promise.all([
    axios.get('/api/famille'),
    axios.get('/api/articl'),
    
  ])
  .then(([familleRes, articlRes, idRes]) => {
    setFamille(familleRes.data);
    setArticl(articlRes.data);
  
  })
  .catch(err => console.log(err));
}, []); */





   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (input.cb.length === 13) {
          qteRef.current.focus();
        } else {
          console.log("Bonjour");
        }
      }
    };


    /* 
     const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (input.cb.length === 13) {
          axios.post('/api/codebar',{codebar=input.cb})
          .then(res=>{
            if(res.data.message==="Success"){
               qteRef.current.focus();
            }
            else{
               alert('Element non Trouver')
               setAjoute(true);
            }
          })
        } else {
          console.log("Bonjour");
        }
      }
    };
     */
    
     const HandelInput = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      
      // Vérifier si la valeur est numérique
      if (!isNaN(value)) {
        // Limiter la longueur à 13 chiffres pour le champ 'cb'
        if (name === 'cb' && value.length >= 13) {
          return;
        }
        
        setInput(val => ({ ...val, [name]: value }));
      } else {
        setInput(val => ({ ...val, [name]: '' }));
      }
    };

     /* const HandelNvInput = (e) => {
      const name = e.target.name;
      let value = e.target.value;
        setInput(val => ({ ...val, [name]: value }));
     
    }

    const HandelAjouterElement=(e)=>{
      e.preventDefault()
      axios.post('/api/AjouterElement',{article:nvInputs.article,prix:nvInputs.prix,chemin:nvInputs.chemin,codebare:input.cb})
      .then(res=>{
        alert('Vous Ave Ajouter Un element')
        console.log(res)})
      .catch(err=>console.log(err))
    } */

  /*   const AfficherPrixEtId=(e)=>{
     e.preventDefault();
     axios.get('/api/prixArticle')
     .then(res=>{
      if(res.data.message==='success'){
        setPrix(res.data.prix)
        setId(res.data.id)
        SetClickedArticle(e.target.value)
      }else{
        console.log('Prix non etablit')
      }
     })
     .catch(err=>console.log(err));
    } */

    return(
        <>
            <div className="codePriceDiv">
               <div className="codeDiv">
                  <div className="row1">
                   <p style={{marginRight:"45px"}}>Code</p>
                   <input className="codeInput" type='text' ref={cbRef} name='cb' onKeyPress={handleKeyPress} value={input.cb} defaultValue={0} onChange={HandelInput}></input>
                   <p style={{marginRight:"5px"}}>Qte :</p>
                   <input className="qteInput" ref={qteRef} name='qte' onChange={HandelInput} value={input.qte}></input>
                  </div>
                  <div className="row2">
                   <p style={{marginRight:"25px"}}>Famille:</p>
                   <Form.Select className="familleForm">   

               {/* {famille ? famille.map((item,index)=>{
                      <option key={index}>{item.name}</option>
               }):<h4>Loading.....</h4>} */}

               </Form.Select>
               <p style={{marginRight:"26px"}}>ID</p>
                 <input className="idInput" name="id" /* value={id} */></input>
                 <Form.Select className="familleForm">  

               {/* {id ? id.map((item,index)=>{
                      <option key={index}>{item.id}</option>
               }):<h4>Loading.....</h4>} */}

               </Form.Select>
                  </div>
                  <div className="row3">
                  <p style={{marginRight:"28px"}}>Article :</p>
                  <Form.Select className="familleForm">   
                   
               {/* {article ? article.map((item,index)=>{
                      <option key={index} onClick={AfficherPrixEtId}>{article.name}</option>
               }):<h4>Loading.....</h4>} */}

               </Form.Select>
               <p style={{marginRight:"5px"}}>Prix :</p>
               <input className="priceInput" ref={prixRef} name='prix' onChange={HandelInput} /* value={prix} */></input>
                  </div>
               </div>
               <div className="priceDiv">
                <p>0,00</p>
               </div>

                {/* <div>
               {ajouter ? (
                         <div>
                      

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Article</Modal.Title>
        </Modal.Header>
        <Modal.Body className="ajout-input">
          <label>Code Bare:
          <input type="text" readOnly value={input.cb} />
          </label>
         <label>Article:
         <input type="text" name="article" className="article" value={nvInputs.article} onChange={HandelNvInput} />
         </label>
         <label>Prix:
         <input type="text" name="prix" className="prix" value={nvInputs.prix} onChange={HandelNvInput}  />
         </label>
         <label>Chemin:
         <input type="text" name="chemin" className="chemin" value={nvInputs.chemin} onChange={HandelNvInput}  />
         </label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandelAjouterElement}  >
          Ajouter
          </Button>
          <Button variant="secondary" >
          Imp
          </Button>
          <Button variant="secondary" >
          Toujour Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
                         </div>
                          ) : ''}
               </div>  */}

   {/*  <ArtcileConetxt.Provider value={input.id,clickedArticle,}>
      
    </ArtcileConetxt.Provider> */}
            </div>
        </>
    )
}