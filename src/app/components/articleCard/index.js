"use client"
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
import Calculator from '../utils/Calculatrice';
import { useInfo } from '../utils/infoProvider';
import { useTotal } from '../utils/totalProvider';
import { useCalculator } from '../utils/resultProvider';
import { useEffect } from "react";
export default function ArticleCard() {
  const { info} = useInfo();
  const { total, setTotal } = useTotal();
  
  const updateTotal = () => {
    setTotal(prev => prev + (item.prix * item.qte));
  };
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
                  {info ? info.map(item=>(
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {item.article}
                        </TableCell>
                        <TableCell align="right">{item.prix}</TableCell>
                        <TableCell align="right">{item.qte}</TableCell>
                        <TableCell align="right">{item.prix * item.qte}</TableCell>
                        {updateTotal()}
                    </TableRow>
                  )):<h5>Pas d'artilc</h5>}
                    
                </TableBody>
            </Table>
        </TableContainer>
              </div>
<Calculator/>
              
            </div>
        </>
    )
}