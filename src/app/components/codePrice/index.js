import "../../styles/codePrice.css"
import Form from 'react-bootstrap/Form';

export default function CodePrice(){
    return(
        <>
            <div className="codePriceDiv">
               <div className="codeDiv">
                  <div className="row1">
                   <p style={{marginRight:"45px"}}>Code</p>
                   <input className="codeInput"></input>
                   <p style={{marginRight:"5px"}}>Qte :</p>
                   <input className="qteInput"></input>
                  </div>
                  <div className="row2">
                   <p style={{marginRight:"25px"}}>Famille:</p>
                   <Form.Select className="familleForm">   
                <option value="s">Particulier</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
               </Form.Select>
               <p style={{marginRight:"26px"}}>ID</p>
                 <input className="idInput"></input>
                 <Form.Select className="familleForm">   
                <option value="s">Particulier</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
               </Form.Select>
                  </div>
                  <div className="row3">
                  <p style={{marginRight:"28px"}}>Article :</p>
                  <Form.Select className="familleForm">   
                <option value="s">Particulier</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
               </Form.Select>
               <p style={{marginRight:"5px"}}>Prix :</p>
               <input className="priceInput"></input>
                  </div>
               </div>
               <div className="priceDiv">
                 <h1>0,00</h1>
               </div>
            </div>
        </>
    )
}