"use client"
// CalculatorContext.js
import React, { createContext, useContext, useState } from 'react';

const TotalContext = createContext();

export const TotalProvider = ({ children }) => {
    const [total, setTotal] = useState('0.00');

    return (
        <TotalContext.Provider value={{ total, setTotal }}>
            {children}
        </TotalContext.Provider>
    );
};

export const useTotal = () => useContext(TotalContext);
