"use client"
import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '../../styles/Calculator.css';
import { useCalculator } from './resultProvider'; // Importez le hook useCalculator
import {CalculatorProvider} from './resultProvider';
function Calculator() {
    const { result, setResult } = useCalculator();

    const handleButtonClick = (value) => {
        if (result === '0.00') {
            // Si le résultat est "0.00", remplacez-le par la nouvelle valeur
            setResult(value);
        } else if (value === '=') {
            try {
                setResult(eval(result).toString());
            } catch (error) {
                setResult('Error');
            }
        } else if (value === 'C') {
            setResult('0.00');
        } else {
            setResult(result + value);
        }
    };

    return (
      
        <Container className="calculator-container">
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
                    <Button className="calculator-key clear-button" onClick={() => handleButtonClick('C')}>C</Button>
                </Col>
            </Row>
        </Container>
        
    );
}

export default Calculator;
