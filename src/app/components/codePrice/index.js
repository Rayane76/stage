"use client"
import "../../styles/codePrice.css"
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { createContext, useEffect, useRef,useState, } from "react";
import axios from 'axios';
import Nav from '../nav/index'
import { FaPlus, FaMinus, FaCheck,FaPen} from 'react-icons/fa';
import { useCalculator } from '../utils/resultProvider'
import { useInfo } from '../utils/infoProvider'; // Importez le hook useCalculator






export default function CodePrice(){
   const cbRef = useRef(null);
   const qteRef = useRef(null);
   const prixRef = useRef(null);
   const [input,setInput]=useState({qte:1});
   const [ajouter,setAjouter]=useState(false);
   const [showModal, setShowModal] = useState(true);
   const handleClose = () => {setShowModal(false); setAjouter(false);  }
   const [nvInputs,setNvInput]=useState({}); 
   const [article, setArticl] = useState([]);
   const { result} = useCalculator();
   const { info, setInfo } = useInfo();


//fetcher les articles
useEffect(() => {
  axios.get('http://127.0.0.1:8000/api/comptoire/entite-marchandise/article/')
    .then(res => {
      setArticl(res.data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}, []);




// verfier lexistance de code bare entre 
const VerifierCodeBare = (codebare) => {
  // Utiliser find() pour rechercher un élément avec le code-barres donné
  return article.find(item => item.barrcode === codebare) !== undefined;
}
    
const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    if (input.cb.length === 13) {
      // Appeler VerifierCodeBare avec le code-barres actuel
      if (VerifierCodeBare(input.cb)) {
        // Le code-barres existe, focus sur le champ de quantité
        qteRef.current.focus();
      } else {
        // Le code-barres n'existe pas, setAjouter(true) pour ouvrir la fenêtre d'ajout d'un article
        setAjouter(true);
      }
    }
  } else {
    // Réinitialiser l'état ajouter à true si un code-barres incorrect est entré
    setAjouter(false);
  }
};
     
 
//stocker les informations des input filed (code bare article id .....)
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


    

//la fonction pour selecionner un artilce sont id et famille automatiquemet s'affiche    
    const HandelArticl=(e)=>{
      e.preventDefault();
      const selectedItem=article.find(item=>item.codif===e.target.value);
      if(selectedItem){
        
        setInput(prev=>({
          ...prev,
          id: selectedItem.id,
          prix: selectedItem.P_vente,
        }))
        
        setInfo(prev => [
          ...prev,
          {
            article: selectedItem.codif,
            qte: input.qte,
            prix: selectedItem.P_vente,
          }
        ]);
       
        
      }
    }


    

     const HandelNvInput = (e) => {
      const name = e.target.name;
      let value = e.target.value;
      setNvInput(val => ({ ...val, [name]: value }));
     
    }
     
  
    const HandelAjouterElement = (e) => {
      e.preventDefault();
      const nouvelArticle = {
        codif: nvInputs.article,
        barrcode: input.cb,
        P_vente: parseFloat(nvInputs.prix),
        id: 1, // Remplacer 1 par l'ID approprié de l'article
        id_S_article: 1, // Remplacer 1 par l'ID approprié de la sous-catégorie de l'article
        id_S_famille: 1, // Remplacer 1 par l'ID approprié de la famille de l'article
        fournisseur_best: 2, // Remplacer 2 par l'ID approprié du fournisseur
      };
      
      // Mise à jour de l'état 'article' en ajoutant le nouvel article à la liste existante
      setArticl(prevArticles => [...prevArticles, nouvelArticle]);
      alert('article ajouter !!!!')
      // Réinitialiser les champs d'entrée
      setInput({});
      setNvInput({});
      setAjouter(false);
    };
     
    /* ajouter l'article dans la base de donne */
   /*  const HandelAjouterElementDB=(e)=>{
      e.preventDefault();
      axios.post('')
    } */
   
    return(
        <>   <Nav prixRef={prixRef} article={article}/>
            <div className="codePriceDiv" >
               <div className="codeDiv">
                  <div className="row1">
                    <div className="code">
                   <p style={{marginTop:'10px'}}>Code:</p>
                   <input className="codeInput" type='text' ref={cbRef} name='cb' onKeyPress={handleKeyPress} value={input.cb} defaultValue={0} onChange={HandelInput}/>
                   </div>
                   <div className="qte">
                   <p style={{marginRight:"5px"}}>Qte :</p>
                   <input className="qteInput" ref={qteRef} name='qte' onChange={HandelInput}  value={input.qte} defaultValue={1}/>
                   </div>
                  </div>
                  <div className="row2">
                   <p style={{marginRight:"15px"}}>Famille:</p>
                   <Form.Select className="familleForm">   

                {article.map((item,index)=>{
                      <option key={index}>{item.id_S_famille}</option>
               })} 

               </Form.Select>

               <div className="idForm">
                <p style={{marginTop:'10px'}}>ID:</p>
                 <Form.Select className="familleForm2" onChange={HandelInput} value={input.id}>  


                  {article.map((item,index)=>(
                    <option key={index}>{item.id}</option>
                  ))}

               </Form.Select>
               </div>
                  </div>
                  <div className="row3">
                  <p style={{marginRight:"15px",marginTop:'6px'}}>Article:</p>
                  <Form.Select className="familleForm" onChange={HandelArticl}>   
                  {article.map((item,index)=>(
                    <option key={index}>{item.codif}</option>
                  ))}

  

               </Form.Select>
               <p style={{marginRight:"5px",marginTop:'6px'}}>Prix:</p>
               <input className="priceInput" ref={prixRef} name='prix' onChange={HandelInput} value={input.prix} /* value={prix} *//>
                  </div>
               </div>
               <div className="qteDiv">
               <div className="totalDiv">
                <h5>Total Qte :</h5>
                <h5 style={{color:'red'}}>0</h5>
                <h5>Nombre Articles :</h5>
                <h5 style={{color:'red'}}>0</h5>
               </div> 
               <div className="qteDivBtnsDiv">
                 <div className="fsRow">
                   <button className="fsBtn">Enregister<FaCheck style={{color:'green'}} /></button>
                   <button className="fsBtn">Inserer</button>
                   <button className="fsBtn">Modifier<FaPen style={{color:'blue'}} /></button>
                 </div>
                 <div className="scndRow">
                   <button className="fsBtn">Ajouter <FaPlus style={{color:'green'}} /></button>
                   <button className="fsBtn">Effacer <FaMinus  style={{color:'red'}}/></button>
                 </div>
               </div>
              </div>
               <div className="priceDiv">
                <p>{result}</p>
               </div>

                <div>
               {ajouter ? (
                         <div>
                      

<Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Ajouter Article</Modal.Title>
  </Modal.Header>
  <Modal.Body className="ajout-input">
    <label>Code barre:
      <input type="text" readOnly value={input.cb} className="code-field" />
    </label>
    <label>Article:
      <input type="text" name="article" className="art-field" value={nvInputs.article} onChange={HandelNvInput} />
    </label>
    <label>Prix de Vente:
      <input type="text" name="prix" className="prx-field" value={nvInputs.prix} onChange={HandelNvInput} />
    </label>
    {/* Champ d'entrée de fichier */}
    <div className="ajout-file">
    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
  <FaPlus className="button-ajout" /> {/* Ajout de l'icône "plus" */}
</label>
<input id="fileInput" type="file" onChange={(e) => setNvInput({ ...nvInputs, chemin: e.target.files[0].name })} style={{ display: 'none' }} />
{/* Afficher le nom du fichier sélectionné uniquement s'il y en a un */}
<label>Chemin:
  <input type="text" name="chemin" value={nvInputs.chemin ? nvInputs.chemin : ''} readOnly className="ch-field"/>
</label>
</div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={HandelAjouterElement}>
      Ajouter
    </Button>
    <Button variant="secondary">
      Imp
    </Button>
    <Button variant="secondary" /* onClick={HandelAjouterElementDB} */>
      Toujours Ajouter
    </Button>
    <Button variant="secondary">
      Importer
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

