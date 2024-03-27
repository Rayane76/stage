"use client"
// CalculatorContext.js
import React, { createContext, useContext, useState } from 'react';

const HistContext = createContext();

export const HistProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    return (
        <HistContext.Provider value={{ history, setHistory }}>
            {children}
        </HistContext.Provider>
    );
};

export const useHist = () => useContext(HistContext);
