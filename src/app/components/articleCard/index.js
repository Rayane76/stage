
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
import { FaPlus, FaMinus, FaCheck,FaPen} from 'react-icons/fa';

export default function ArticleCard() {

    return(
        <>
            
            <CodePrice />
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
                    {/* {rows.map((row) => ( */}
                      <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          Article1
                        </TableCell>
                        <TableCell align="right">1000</TableCell>
                        <TableCell align="right">2</TableCell>
                        <TableCell align="right">2000</TableCell>
                      </TableRow>
                    {/* ))} */}
                  </TableBody>
                </Table>
              </TableContainer>
              </div>

              <div className="qteDiv">
               <div className="totalDiv">
                <h2>Total Qte :</h2>
                <h2 style={{color:'red'}}>0</h2>
                <h2>Nombre Articles :</h2>
                <h2 style={{color:'red'}}>0</h2>
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
            </div>
        </>
    )
}