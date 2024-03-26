"use client"
// CalculatorContext.js
import React, { createContext, useContext, useState } from 'react';

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const [info, setInfo] = useState([]);

    return (
        <InfoContext.Provider value={{ info, setInfo }}>
            {children}
        </InfoContext.Provider>
    );
};

export const useInfo = () => useContext(InfoContext);
