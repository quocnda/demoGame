import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, CreateBattle,Market,Menu} from './page';
import './index.css';
import { GlobalContextProvider } from './context';
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
  
    <GlobalContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/menu' element = {<Menu/>}/>
        <Route path='/create-battle' element={<CreateBattle />}></Route>
        <Route path='/market' element={<Market />}> </Route> 
      </Routes>
    </GlobalContextProvider>
    
   </BrowserRouter>
  
);
