import "../../styles/codePrice.css"
import Nav from "../nav";
import Form from 'react-bootstrap/Form';

export default function ArticleCard() {

    return(
        <>
            <Nav />
            <div className="codePriceDiv">
               <div className="codeDiv">
                  <div className="row1">
                   <p>Code</p>
                   <input></input>
                   <p>Qte</p>
                   <input></input>
                  </div>
                  <div className="row2">
                   <p>Famille :</p>
                   <Form.Select>   
                <option value="s">Particulier</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
               </Form.Select>
               <p>ID</p>
                 <input></input>
                 <Form.Select>   
                <option value="s">Particulier</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
                <option value="xxl">XXL</option>
               </Form.Select>
                  </div>
                  <div className="row3">

                  </div>
               </div>
               <div className="priceDiv">

               </div>
            </div>
        </>
    )
}