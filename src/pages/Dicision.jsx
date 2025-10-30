import React from 'react';
import Headline from '../components/Headline';
import { Pen } from 'lucide-react';
import ProtestComponent from '../components/ProtestComponent';

const Dicision = () => {
    return (
        <div className="p-4  rounded-lg max-w-7xl mx-auto">
            <Headline name="মতামত" link={<Pen />} />

            <ProtestComponent />

        </div>
    );
};

export default Dicision;