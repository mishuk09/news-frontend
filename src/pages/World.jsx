import Headline from '../components/Headline';
import { WholeWord } from 'lucide-react';
import WorldMain from '../components/WorldMain';

const World = () => {
    return (
        <>
            <div className='p-4 mt-10 rounded-lg max-w-7xl mx-auto'>

                <Headline name='বিশ্ব' link='/world' />
                <WorldMain />
            </div>
        </>
    );
};

export default World;