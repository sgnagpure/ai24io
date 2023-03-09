import React from "react";

//import "./style.css";
import { useWeb3React } from "@web3-react/core";
import { Injected } from "../../Helpers/Injected";

const Header = () => {
  
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  const connect = async () => {
   try {
     if(!account){
       await activate(Injected);
     } else {
       deactivate()
     }
   } catch (error) {
     console.log('error', error)
   }
  }


  return (
    <div className="header">
       <link rel='stylesheet' href="../header/style.css"></link>
       
       <link rel='stylesheet' href="../footer/style.css"></link>
      <a href="https://ai24.io/"><img src='../../images/logo_wht_png.png' alt="logo" /></a>
      <div>
        <button onClick={connect}>
          {
            active ? `${account.substring(0, 4)}...${account.substring(38)}` :"Connect"
          }
        </button>
      </div>
    </div>
  );
};

export default Header;
