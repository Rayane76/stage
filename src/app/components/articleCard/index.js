'use client'
import Nav from "../nav";
import CodePrice from "../codePrice";
import "../../styles/tableTotal.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaTimes ,FaPlus, FaMinus, FaCheck,FaPen} from 'react-icons/fa';
import { createContext, useEffect, useRef,useState, } from "react";
import "../../styles/codePrice.css"
import Form from 'react-bootstrap/Form';
import { Modal, Button } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ArticleCard() {
  const cbRef = useRef(null);
  const qteRef = useRef(null);
  const prixRef = useRef(null);
  const priceRef = useRef(null);
  const [input,setInput]=useState({})




  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (input.cb.length === 13) {
        qteRef.current.focus();
      } else {
        console.log("Bonjour");
      }
    }
  };


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





  const articles = [
    {
      id: "1",
      name: "bimo",
      price: 150,
    },
    {
      id: "2",
      name: "hrissa",
      price: 120,
    },
    {
      id: "3",
      name: "signal",
      price: 250
    },
    {
      id: "4",
      name: "riz",
      price: 320
    },
    {
      id: "5",
      name: "lentilles",
      price: 160
    },
    {
      id: "6",
      name: "bonbon",
      price: 20
    },
    {
      id: "7",
      name: "moment",
      price: 190
    }
]

const [bon,setBon] = useState([]);
const [id,setId] = useState(null);


const [price,setPrice] = useState(null);
const handleChangePrice = (e) =>{
  setPrice(parseInt(e.target.value));
}

const [qte,setQte] = useState(null);
const handleChangeQte = (e) => {
  setQte(parseInt(e.target.value));
}

const [isDisabled,setIsDisabled] = useState(false);

const [articleChosen,setArticleChosen] = useState("");
const onArticleSelect = (e)=>{
  setArticleChosen(e.target.value);
  const priceInput = document.getElementById("price");
  const qteInput = document.getElementById("qte")
  qteInput.value = 1;
  setQte(1);
  qteRef.current.focus();
  articles.map((article)=>{
    if(article.name === e.target.value){
      priceInput.value = article.price;
      setPrice(article.price);
      setId(article.id);
      setIsDisabled(true);
    }
  })
}

const router = useRouter();

const handleQteKeyPress = (event) => {
  if (event.key === 'Enter') {
    const idExists = bon.some(item => item.id === id);
    if(idExists){
      const qteInput = document.getElementById("qte");
      bon.map((bon)=>{
           if(bon.id === id){
            let fsTotal = bon.total;
            let fsQte = bon.qte;
            bon.qte = qteInput.value;
            bon.total = bon.price * qteInput.value;
            if(fsQte < bon.qte){
              setNbrArticles(nbrArticles + (bon.qte - fsQte))
              setTotalPrice(totalPrice + (bon.total - fsTotal))
            }
            else{
              setNbrArticles(nbrArticles - (fsQte - bon.qte))
              setTotalPrice(totalPrice - (fsTotal - bon.total))
            }
           }
      }) 
     router.refresh();
    }
    else{  
    const newObject = {
      id: id,
      name: articleChosen,
      price: price,
      qte: qte,
      total : price * qte 
    };
    setBon((prev)=>[...prev,newObject]);
    setArticleChosen("");
    const priceInput = document.getElementById("price");
    const qteInput = document.getElementById("qte");
    priceInput.value = "";
    qteInput.value = "";
    setQte(null);
    setPrice(null);
    setIsDisabled(false);
  }
}
}

const [totalQte,setTotalQte] = useState(0);
const [nbrArticles,setNbrArticles] = useState(0);
const [totalPrice,setTotalPrice] = useState(0)

  const [allArticles,setAllArticles] = useState(null);

  useEffect(()=>{
    getData();
  },[]);

  const getData = async ()=>{
    const result = await axios.get("http://localhost:8000/api/comptoire/entite-marchandise/article/");
    setAllArticles(result.data);
    console.log(allArticles);

  }

useEffect(()=>{
  // console.log(bon);
  bon.map((bon)=>{
    setTotalQte(totalQte + 1)
    setNbrArticles(nbrArticles + bon.qte)
    setTotalPrice(totalPrice + bon.total)
  })
},[bon])


const [selectedTr, setSelectedTr] = useState(null);

const handleTdClick = (event) => {
  // Remove the background color from the previously selected tr, if any
  if (selectedTr) {
    selectedTr.style.backgroundColor = '';
  }

  // Find the parent tr of the clicked td
  const tr = event.target.closest('tr');
  if (tr) {
    // Set the background color for the parent tr
    tr.style.backgroundColor = 'lightblue';
    // Update the selectedTr state to the parent tr
    setSelectedTr(tr);
  }
};

const handleItem = (item) =>{
  setId(item.id);
  const priceInput = document.getElementById("price");
  const qteInput = document.getElementById("qte");
  priceInput.value = item.price;
  qteInput.value = item.qte;
  if(item.name != "Divers"){
    setIsDisabled(true);
  }
  else{
    setIsDisabled(false);
  }
}

const handleDelete = ()=>{
  if(bon.length > 0){
    if(id === null){
      const indexToDelete = bon.findIndex(item => item.name === "Divers")
      const found = bon.find(item => item.name === "Divers");
      if (indexToDelete !== -1) {
        // Delete the object at the indexToDelete
        bon.splice(indexToDelete, 1);
      }
      
      setTotalQte(totalQte -1);
      setNbrArticles(nbrArticles - found.qte);
      setTotalPrice(totalPrice - found.total);
  
    }
    else{
    const indexToDelete = bon.findIndex(item => item.id === id);
    const found = bon.find(item => item.id === id);
    if (indexToDelete !== -1) {
      // Delete the object at the indexToDelete
      bon.splice(indexToDelete, 1);
    }
    
    setTotalQte(totalQte -1);
    setNbrArticles(nbrArticles - found.qte);
    setTotalPrice(totalPrice - found.total);

    }
    router.refresh();
}
}

const handleAdd = ()=>{
  if(bon.length > 0){
    if(id === null){
     bon.map((bon)=>{
      if(bon.id === "Divers"){
        bon.qte = bon.qte + 1;
        bon.total = bon.total + bon.price;
        setNbrArticles(nbrArticles + 1)
        setTotalPrice(totalPrice + bon.price);
      }
     })
    }
    else{
    bon.map((bon)=>{
      if(bon.id === id){
        bon.qte = bon.qte + 1;
        bon.total = bon.total + bon.price;
        setNbrArticles(nbrArticles + 1)
        setTotalPrice(totalPrice + bon.price);
      }
    })
  }
   router.refresh();
  }
}

const handleMinus = ()=>{
  if(bon.length > 0){
    if(id === null){
      bon.map((bon)=>{
       if(bon.name === "Divers"){
        bon.qte = bon.qte - 1;
        bon.total = bon.total - bon.price;
        setNbrArticles(nbrArticles - 1);
        setTotalPrice(totalPrice - bon.price);
        if(bon.qte === 0){
          setTotalQte(totalQte - 1);
        }
       }
      })
    }
    else{
    bon.map((bon)=>{
      if(bon.id === id){
        bon.qte = bon.qte - 1;
        bon.total = bon.total - bon.price;
        setNbrArticles(nbrArticles - 1);
        setTotalPrice(totalPrice - bon.price);
        if(bon.qte === 0){
          setTotalQte(totalQte - 1);
        }
      }
    })
  }
    const indexToDelete = bon.findIndex(item => item.qte === 0);
    if (indexToDelete !== -1) {
      // Delete the object at the indexToDelete
      bon.splice(indexToDelete, 1);
    }

    router.refresh();
  }
}

const handleInserer = ()=>{
   setIsDisabled(false);
   priceRef.current.focus();
   const qteInput = document.getElementById("qte");
   qteInput.value = 1;
   setQte(1);
}

const handlePriceKeyPress = (event)=>{
  if(event.key === "Enter"){
    const newObject = {
      name: "Divers",
      price: price,
      qte: qte,
      total : price * qte 
    }
    setBon((prev)=>[...prev,newObject]);
    const priceInput = document.getElementById("price");
    const qteInput = document.getElementById("qte");
    priceInput.value = "";
    qteInput.value = "";
    setQte(null);
    setPrice(null);
  }
}




    return(
        <>
            <Nav />
            <div className="codePriceDiv">
               <div className="codeDiv">
                  <div className="row1">
                   <p style={{marginRight:"45px"}}>Code</p>
                   <input className="codeInput" type='text' ref={cbRef} name='cb' onKeyPress={handleKeyPress} value={input.cb} defaultValue={0} onChange={HandelInput}></input>



                   <p style={{marginRight:"5px"}}>Qte :</p>
                   <input className="qteInput" id="qte" ref={qteRef} onChange={handleChangeQte} onKeyPress={handleQteKeyPress}></input>



                  </div>



                  <div className="row2">
                   <p style={{marginRight:"25px"}}>Famille:</p>
                   <Form.Select className="familleForm">   

               </Form.Select>



               <p style={{marginRight:"26px"}}>ID</p>
                 <input className="idInput" name="id" /* value={id} */></input>
                 <Form.Select className="familleForm">  

               </Form.Select>




                  </div>
                  <div className="row3">
                  <p style={{marginRight:"28px"}}>Article :</p>
                  <Form.Select className="familleForm" value={articleChosen} onChange={onArticleSelect} >   
               <option></option>
               {articles.map((article)=>{
                return( 
                <option key={article.id}>{article.name}</option>
                )
               })}   

               </Form.Select>
               <p style={{marginRight:"5px"}}>Prix :</p>
               <input disabled={isDisabled} ref={priceRef} className="priceInput" id="price" onChange={handleChangePrice} onKeyPress={handlePriceKeyPress}></input>
                  </div>
               </div>
               <div className="priceDiv">
                <p>{totalPrice}</p>
               </div>

            </div>






            <div className="tableTotalDiv">
              <div className="tableDiv">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Article</TableCell>
                      <TableCell align="right">Prix</TableCell>
                      <TableCell align="right">Qte</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bon.map((item) => (
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        onClick={()=>handleItem(item)}
                      >
                        <TableCell onClick={handleTdClick} component="th" scope="row">
                          {item.name}
                        </TableCell>
                        <TableCell onClick={handleTdClick} align="right">{item.price}</TableCell>
                        <TableCell onClick={handleTdClick} align="right">{item.qte}</TableCell>
                        <TableCell onClick={handleTdClick} align="right">{item.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </div>

              <div className="qteDiv">
               <div className="totalDiv">
                <h2>Total Qte :</h2>
                <h2 style={{color:'red'}}>{totalQte}</h2>
                <h2>Nombre Articles :</h2>
                <h2 style={{color:'red'}}>{nbrArticles}</h2>
               </div> 
               <div className="qteDivBtnsDiv">
                 <div className="fsRow">
                   <button className="fsBtn">Enregister<FaCheck style={{color:'green'}} /></button>
                   <button onClick={handleInserer} className="fsBtn">Inserer</button>
                   <button onClick={handleMinus} className="fsBtn">Diminuer <FaMinus  style={{color:'red'}}/></button>
                 </div>
                 <div className="scndRow">
                   <button onClick={handleAdd} className="fsBtn">Ajouter <FaPlus style={{color:'green'}} /></button>
                   <button onClick={handleDelete} className="fsBtn">Effacer <FaTimes  style={{color:'red'}}/></button>
                 </div>
               </div>
              </div>
            </div>
        </>
    )
}