"use client"
import React, { useEffect,useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../../styles/Calculator.css';
import { useCalculator } from './resultProvider'; // Importez le hook useCalculator
import { CalculatorProvider } from './resultProvider';
import {useHist} from './historyProvider'

function Calculator({ total }) {
    const { result, setResult } = useCalculator();
    const { history, setHistory } = useHist();
    
    useEffect(() => {
        if (total !== "") {
            setResult(total);
        } else {
            setResult("0.00");
        }
    }, [total]);

    const handleButtonClick = (value) => {
        if(result=="0.00") {
            setResult(value.toString());
        }
        else if (value === 'Supp') {
            // Effacer le dernier caractère du résultat
            setResult(result.slice(0, -1));
        } else if(value === 'C'){
            setResult('0.00');
        }else if (value === '=') {
            try {
                // Ajouter l'opération au tableau de l'historique
                setHistory([...history, `${result} = ${eval(result)}`]);
                setResult(eval(result).toString());
            } catch (error) {
                setResult('Error');
            }
        } else {
            setResult(result + value);
        }
    };

    const clearHistory = () => {
        // Effacer l'historique en le réinitialisant à un tableau vide
        setHistory([]);
    };

    return (
        <Container className="calculator-container">
         {/*    <div className="history">
        {history.map((item, index) => (
            <div key={index}>{item}</div>
        ))}
    </div> */}
            <Row>
                <Col>
                    <Button className="calculator-key" onClick={() => handleButtonClick('7')}>7</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('8')}>8</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('9')}>9</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('/')}>/</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="calculator-key" onClick={() => handleButtonClick('4')}>4</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('5')}>5</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('6')}>6</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('*')}>*</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="calculator-key" onClick={() => handleButtonClick('1')}>1</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('2')}>2</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('3')}>3</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('+')}>+</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className="calculator-key" onClick={() => handleButtonClick('0')}>0</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('.')}>.</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('=')}>=</Button>
                    <Button className="calculator-key" onClick={() => handleButtonClick('-')}>-</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* Bouton de suppression */}
                    <Button className="calculator-key clear-button" onClick={() => handleButtonClick('Supp')}>Supp</Button>
                    <Button className="calculator-key clear-button" onClick={() => handleButtonClick('C')}>C</Button>
                    <Button className="calculator-key clear-button2" onClick={clearHistory}>Effacer l'historique</Button>
                    
                </Col>
            </Row>
        </Container>
    );
}

export default Calculator;

