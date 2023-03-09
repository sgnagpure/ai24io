import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import swal from "sweetalert2";
const dotenv = require("dotenv");

dotenv.config();
async function update(credentials) {
    return fetch(process.env.NEXT_PUBLIC_API_URL+'update_price', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Settings(){

    const [lprice, setData] = useState(null)
    const [isBusy, setBusy] = useState(true)
    const [live_price, setLivePrice] = useState();
    const [BNB_price, setBNBPrice] = useState(isBusy ? 0 : lprice[1].evalue);
    const [inr_price, setINRPrice] = useState(isBusy ? 0 : lprice[2].evalue);

    
    
    useEffect(() => {
      setBusy(true);
    const getUsers = async () => {
      const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'users/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json() )
      setData(users.data);
      setLivePrice(users.data[0].evalue);
      setBNBPrice(users.data[1].evalue);
      setINRPrice(users.data[2].evalue);

  
      setBusy(false);
    };
  
    getUsers();
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);


 
  const HandleSetting = async e => {
    console.log("Entered");
    e.preventDefault();
    
    const token = await update({
        live_price,
        BNB_price,
        inr_price
    });
    if ('status' in token) {
      swal.fire("Success", "Successfully Price Changed", "success", {
       
        timer: 2000,
      });
    } else {
      swal.fire("Failed", "Incorrect Email or Password..!!", "error");
    }
  
    
  }
    return(
        <>
            <Layout>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-home" />
                                </span>{" "}
                                Settings
                            </h3>                       
                        </div>                     
                       
                        <div className="row">
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Update Live Price</h4>
                                        
                                        <form className="forms-sample" onSubmit={HandleSetting}>
                                            
                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Live Price </label>
                                            <p style={{"color":"green"}}>Current Price : {isBusy ? 0 : lprice[0].evalue}</p>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="live_price" defaultValue={isBusy ? 0 : lprice[0].evalue}  onChange={e => setLivePrice(e.target.value)} step={"any"}
                                            placeholder="101.22"
                                            />
                                        </div>

                                        
                                        
                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">BNB Price </label>
                                            <p style={{"color":"green"}}>Current BNB Price : {isBusy ? 0 : lprice[1].evalue}</p>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="BNB_price" defaultValue={isBusy ? 0 : lprice[1].evalue} onChange={e => setBNBPrice(e.target.value)} step={"any"}
                                            placeholder="101.22"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">INR Price </label>
                                            <p style={{"color":"green"}}>1 USDT =  : {isBusy ? 0 : lprice[2].evalue} Rs</p>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="inr_price" defaultValue={isBusy ? 0 : lprice[2].evalue} onChange={e => setINRPrice(e.target.value)} step={"any"}
                                            placeholder="101.22"
                                            />
                                        </div>
                                        
                                        <input type="submit" value={'Update'} className="btn btn-gradient-primary me-2"/>
                                        </form>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>                  
                </div>
            </Layout>
        </>
    )

}