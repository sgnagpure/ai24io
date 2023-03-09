import React from 'react';
import MainSection from '../../components/main';
import Userlayout from '../../components/UserLayout';
import BuyLayout from '../../components/BuyLayout';
import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

const getLibrary = (provider) => {
  return new Web3(provider);
}

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <div>
        <BuyLayout/>
       
        <Userlayout/>
        <MainSection />
      </div>
    </Web3ReactProvider>
  );
}

export default App;