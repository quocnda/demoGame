import React from 'react';
import { PageHOC } from '../components';
const CreateBattle = () => {
  return (
    <div>
     <h1 className='text-white text-xl'>Hello from create battle</h1>
    </div>
  )
};

export default PageHOC(
  CreateBattle,
  <>Create <br/> a game</>,
  <>Create your own battle and wait <br/> for other players to join</>
)