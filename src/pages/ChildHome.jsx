import React from 'react';
import Home from './Home';
import National from './National';
import Dicision from './Dicision';
import CurrencyRates from '../components/CurrencyRates';

const ChildHome = () => {
    return (
        <div>
            <Home />
            <National />
            <Dicision />
            <CurrencyRates />
        </div>
    );
};

export default ChildHome;