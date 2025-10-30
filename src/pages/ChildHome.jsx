import React from 'react';
import Home from './Home';
import National from './National';
import Dicision from './Dicision';
import CurrencyRates from '../components/CurrencyRates';
import World from './World';
import Allfeature from './Allfeature';

const ChildHome = () => {
    return (
        <div>
            <Home />
            <National />
            <Dicision />
            <CurrencyRates />
            <World />
            <Allfeature />
        </div>
    );
};

export default ChildHome;