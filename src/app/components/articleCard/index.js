'use client'
import { useState, useEffect } from "react";
import Nav from "../nav";
import CodePrice from "../codePrice";
import "../../styles/tableTotal.css";
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

export default function ArticleCard() {
  const { info} = useInfo();
  const [total, setTotal] = useState('0.00');

  useEffect(() => {
    // Calcul du total lors de la mise à jour de info
    if (info && info.length > 0) {
      const newTotal = info.reduce((acc, item) => acc + (item.prix * item.qte), 0);
      setTotal(newTotal); // Formater le total avec deux décimales
    } else {
      setTotal('0.00');
    }
  }, [info]);

  const handleTotal = (prix, qte) => {
    return prix * qte;
  };

  const countUniqueArticles = () => {
    if (!info) return 0;
    const uniqueArticles = new Set(info.map(item => item.article));
    return uniqueArticles.size;
  };

  // Fonction pour calculer la quantité totale de tous les articles
  const totalQuantity = () => {
    if (!info) return 0;
    return info.reduce((acc, item) => acc + parseInt(item.qte), 0);
  };

  return (
    <>
      <CodePrice total={total} qteTotal={totalQuantity} articlTotal={countUniqueArticles} />
      <div className="tableTotalDiv">
        <div className="tableDiv" style={{ maxHeight: "345px", overflowY: "auto" }}>
          <TableContainer style={{ maxHeight: info && info.length > 6 ? 'calc(100vh - 200px)' : 'unset', overflowY: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: '20px', fontWeight: 'bold' }}>Article</TableCell>
                  <TableCell align="right" style={{ fontSize: '20px', fontWeight: 'bold' }}>Prix</TableCell>
                  <TableCell align="right" style={{ fontSize: '20px', fontWeight: 'bold' }}>Qte</TableCell>
                  <TableCell align="right" style={{ fontSize: '20px', fontWeight: 'bold' }}>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {info && info.map(item => (
                  <TableRow key={item.article}>
                    <TableCell component="th" scope="row">
                      {item.article}
                    </TableCell>
                    <TableCell align="right">{item.prix}</TableCell>
                    <TableCell align="right">{item.qte}</TableCell>
                    <TableCell align="right">{handleTotal(item.prix, item.qte)}</TableCell>
                  </TableRow>
                ))}
                {!info || info.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <h5>Pas d'article</h5>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <Calculator total={total}/>
      </div>
    </>
  );
}
