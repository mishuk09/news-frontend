import React, { useContext, useState } from 'react';
import Headline from '../Headline';
import LatestNewsGrandChild from './LatestNewsGrandChild';

const LatestNewsChild = ({news,loading}) => {
 
    return (
        <div className="p-2  rounded-lg max-w-7xl mx-auto"> 
            <Headline name='সম্পর্কিত আরও খবর'   />
            <LatestNewsGrandChild news={news} loading={loading} />
        </div>
    );
};

export default LatestNewsChild;
