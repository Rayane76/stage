"use client"
// CalculatorContext.js
import React, { createContext, useContext, useState } from 'react';

const CalculatorContext = createContext();

export const CalculatorProvider = ({ children }) => {
    const [result, setResult] = useState('0.00');

    return (
        <CalculatorContext.Provider value={{ result, setResult }}>
            {children}
        </CalculatorContext.Provider>
    );
};

export const useCalculator = () => useContext(CalculatorContext);
