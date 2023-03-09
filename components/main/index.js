import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Injected } from "../../Helpers/Injected";
import Abi from "../../Helpers/abi.json";
import swal from "sweetalert2";

const isValid = (regex) => (input) => regex.test(input);
const numberRegex = /^\d*\.?\d*$/;
const isValidNumber = isValid(numberRegex);

const MainSection = () => {

  const [setting, setSetting] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'users/settings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  });
      const data = await response.json();
      setSetting(data.data[1].evalue);
    };
  
    fetchData();
  });

  const { active, account, library, connector, activate, deactivate } = useWeb3React();
  const cAddress = "0x7c494D31CC368432F07Cc4Fbf273c792cdd2b2c1";
  const [enable, setEnable] = useState(false);
  const tokenVal = setting;
  const [data, setData] = useState({
    bnb: "",
    token: ""
  });

  const processBuy = async () => {
    if(!data.bnb || !data.token) {
      swal.fire('Please enter correct value.')
      return;
    }
    setEnable(true);
    
    const contract = await new library.eth.Contract(Abi, cAddress);
    let bnbValue = await library.utils.toWei(String(data.bnb), "ether");
    await contract.methods.buy().send({from: account, value:bnbValue})
      .on('error', function(error){
        setEnable(false)
        swal.fire(error.message)
      }).then(function(receipt){
        setEnable(false);
        swal.fire(`${data.token} AI24 Coin tokens has been sent to your wallet.`);
        setData({bnb:"",token:""})
      })
    
  }

  const buy = async () => {
    if(active){
      processBuy();
    } else {
      await activate(Injected);
    }
  }


  return (
    <div className="main-section">
      <p className="headings">Tier 1 Presale </p>
      <p className="headings">Buy AI24 coin and join with our community  </p>
      <div className="main-section-form">
        <p>1 BNB = {tokenVal} AI24</p>
        <p className="mgtp">Pay with</p>
        <div className="form-group">
          <input
            type="text"
            value={data.bnb}
            style={{'color':'black'}}
            onChange={(e) => {
              const val = e.target.value
                .split("")
                .filter((el) => isValidNumber(el))
                .join("");
              setData({
                data,
                bnb: val,
                token: val * tokenVal,
              });
            }}
          />
          <div>
            <img src='../../images/bnb.png' alt="snk" style={{ marginRight: "10px" }} />
            <p>BNB</p>
          </div>
        </div>
        <p className="mgtp">You will get</p>
        <div className="form-group">
          <input
            type="text"
            style={{'color':'black'}}
            value={data.token}
            onChange={(f) => {
              const val = f.target.value
                .split("")
                .filter((el) => isValidNumber(el))
                .join("");
              setData({
                data,
                token: val,
                bnb: val / tokenVal,
              });
            }}
          />
          <div>
            <img src="../../images/fav.png" alt="snk" style={{ marginRight: "10px" }} />
            <p>AI24</p>
          </div>
        </div>
        <div style={{ textAlign: "center", margin: "0.5em 0" }}>
          <a
            href="www.google.com"
            style={{ color: "#000000" }}
            className="bold"
          >
            
          </a>
        </div>
        <div style={{ textAlign: "center", margin: "0.5em 0" }}>
          <button className="buy" onClick={buy} disabled={enable}>{account?"Buy":"Connect"}</button>
        </div>

        <div className="smart">
          <i class="fa fa-lock" aria-hidden="true"></i>
          <p>100% Secure smart contract</p>
        </div>
      </div>
     
      <div className="link">
        <a href="https://bscscan.com/token/0x428ddfbdd559800abec23add2d61308dd66804a0">AI24 Coin smart contract</a>
      </div>
      
    </div>
    
  );
};

export default MainSection;
