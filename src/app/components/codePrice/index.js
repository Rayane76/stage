'use client'
import "../../styles/codePrice.css"
import Form from 'react-bootstrap/Form';
import { useEffect, useRef,useState } from "react";
import axios from 'axios';

export default function CodePrice(){
   const cbRef = useRef(null);
   const qteRef = useRef(null);
   const prixRef = useRef(null);
   const [input,setInput]=useState({})
   const [ajouter,setAjouter]=useState(false);



const [famille, setFamille] = useState('');
const [article, setArticl] = useState('');
const [id, setId] = useState('');

useEffect(() => {
  Promise.all([
    axios.get('/api/famille'),
    axios.get('/api/articl'),
    axios.get('/api/id')
  ])
  .then(([familleRes, articlRes, idRes]) => {
    setFamille(familleRes.data);
    setArticl(articlRes.data);
    setId(idRes.data);
  })
  .catch(err => console.log(err));
}, []);





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
          axios.post('/api/codebar',{codebar=input.cd})
          .then(res=>{
            if(res.data.message==="Success"){
               qteRef.current.focus();
            }
            else{
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
          e.preventDefault(); 
          
        }
        
        setInput(val => ({ ...val, [name]: value }));
      } else {
        setInput(val => ({ ...val, [name]: '' }));
      }
    };

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
                 <input className="idInput"></input>
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
                      <option key={index}>{article.id}</option>
               }):<h4>Loading.....</h4>} */}

               </Form.Select>
               <p style={{marginRight:"5px"}}>Prix :</p>
               <input className="priceInput" ref={prixRef} name='prix' onChange={HandelInput} value={input.prix}></input>
                  </div>
               </div>
               <div className="priceDiv">
                <p>0,00</p>
               </div>
               <div>
               {ajouter ? (
  <div>
    {/* afficher le div dajouter un element dans les article */}
  </div>
) : ''}
               </div>
               
            </div>
        </>
    )
}