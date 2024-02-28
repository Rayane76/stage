'use client'
import "../../styles/codePrice.css"
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { createContext, useEffect, useRef,useState, } from "react";
import axios from 'axios';
import Nav from '../nav/index'





export default function CodePrice(){
   const cbRef = useRef(null);
   const qteRef = useRef(null);
   const prixRef = useRef(null);
   const [input,setInput]=useState({});
   const [total,setTotal]=useState(0);
   const [ajouter,setAjouter]=useState(false);
  
   const [showModal, setShowModal] = useState(true);
   const handleClose = () => setShowModal(false); 
   const [nvInputs,setNvInpust]=useState({}); 
   

   const exemple=[{article:"sucre",prix:120,id:1},
    {article:"sel",prix:200,id:2},
    {article:"cafe",prix:300,id:3},
    {article:"eau",prix:124,id:4},
    {article:"pain",prix:12,id:5},
    {article:"miele",prix:400,id:6},
  ]




const [famille, setFamille] = useState([]);
const [article, setArticl] = useState([]);
const [prix,setPrix]=useState(0)
const [id,setId]=useState(0)


useEffect(() => {
  Promise.all([
    axios.get('/api/famille'),
    axios.get('/api/articl'),
    axios.get('/api/id'),
    axios.get('/api/prix'),
    
  ])
  .then(([familleRes, articlRes, idRes,prixRes]) => {
    setFamille(familleRes.data);
    setArticl(articlRes.data);
    setId(idRes.data);
    setPrix(prixRes.data);
  
  })
  .catch(err => console.log(err));
}, []); 





   const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (input.cb.length === 13) {
          qteRef.current.focus();
          setAjouter(true);
        } else {
          console.log("Bonjour");
        }
      }else if(event.key==='*'){
        setTotal (input.qte*input.prix)
      }
    };


    
    /*  const handleKeyPress = (event) => {
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
    }; */
     
    
     const HandelInput = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      
      // Vérifier si la valeur est numérique
      if (!isNaN(value)) {
        // Limiter la longueur à 13 chiffres pour le champ 'cb'
        if (name === 'cb' && value.length > 13) {
          return;
        }
        
        setInput(val => ({ ...val, [name]: value }));
      } else {
        setInput(val => ({ ...val, [name]: '' }));
      }
    };

    const HandelArticl=(e)=>{
      e.preventDefault();
      const selectedItem=exemple.find(item=>item.article===e.target.value);
      if(selectedItem){
        setInput(prev=>({
          ...prev,
          id: selectedItem.id,
          prix: selectedItem.prix,
        }))
      }
    }


    

     const HandelNvInput = (e) => {
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
    } 

     /* const AfficherPrixEtId=(e)=>{
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
        <>   <Nav prixRef={prixRef} article={exemple}/>
            <div className="codePriceDiv">
               <div className="codeDiv">
                  <div className="row1">
                   <p style={{marginRight:"45px"}}>Code</p>
                   <input className="codeInput" type='text' ref={cbRef} name='cb' onKeyPress={handleKeyPress} value={input.cb} defaultValue={0} onChange={HandelInput}/>
                   <p style={{marginRight:"5px"}}>Qte :</p>
                   <input className="qteInput" ref={qteRef} name='qte' onChange={HandelInput} value={input.qte} defaultValue={1}/>
                  </div>
                  <div className="row2">
                   <p style={{marginRight:"25px"}}>Famille:</p>
                   <Form.Select className="familleForm">   

               {/* {famille ? famille.map((item,index)=>{
                      <option key={index}>{item.name}</option>
               }):<h4>Loading.....</h4>} */}

               </Form.Select>
                <p style={{marginRight:"26px"}}>ID</p>
                 <input className="idInput" name="id"/>
                 <Form.Select className="familleForm" onChange={HandelInput} value={input.id}>  


                  {exemple.map((item,index)=>(
                    <option key={index}>{item.id}</option>
                  ))}


               {/* {id ? id.map((item,index)=>{
                      <option key={index}>{item.id}</option>
               }):<h4>Loading.....</h4>} */}

               </Form.Select>
                  </div>
                  <div className="row3">
                  <p style={{marginRight:"28px"}}>Article :</p>
                  <Form.Select className="familleForm" onChange={HandelArticl}>   


                  {exemple.map((item,index)=>(
                    <option key={index}>{item.article}</option>
                  ))}

               {/* {article ? article.map((item,index)=>{
                      <option key={index} onClick={AfficherPrixEtId}>{article.name}</option>
               }):<h4>Loading.....</h4>} */}

               </Form.Select>
               <p style={{marginRight:"5px"}}>Prix :</p>
               <input className="priceInput" ref={prixRef} name='prix' onChange={HandelInput} value={input.prix} /* value={prix} *//>
                  </div>
               </div>
               <div className="priceDiv">
                <p>0,00</p>
               </div>

                <div>
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
         <label>Qte:
         <input type="text" name="qte" className="qte" value={nvInputs.qte} onChange={HandelNvInput}  />
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
               </div>  

   
            </div>
        
        </>
    )
} 

