import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import swal from "sweetalert2";
const dotenv = require("dotenv");

dotenv.config();
async function update(data) {
    
    const body = new FormData();
    body.append("qrcode", data.qrcode);
    body.append("bank_name", data.bank_name);
    body.append("account_num", data.account_num);
    body.append("account_name", data.account_name);
    body.append("ifsc", data.ifsc);
    body.append("upi_id", data.upi_id);
    body.append("trc", data.trc);
    body.append("erc", data.erc);
   body.append("erc_qr", data.erc_qrcode);
    body.append("trc_qr", data.trc_qrcode);

    console.log(data);
    
    return fetch(process.env.NEXT_PUBLIC_API_URL+'update_bank_details', {
      method: 'POST',
      
       body
    })
      .then(data => data.json())
   }

export default function BankDetails(){
    const [account_num, setAccountNum] = useState(null)
    const [bank_name, setBankName] = useState(null)
    const [account_name, setAccountName] = useState(null)
    const [ifsc, setIfsc] = useState(null)
    const [qrcode, setQrcode] = useState(null)
    const [erc, setERC] = useState(null)
    const [erc_qrcode, setErcQr] = useState(null)
    const [trc, setTRC] = useState(null)
    const [trc_qrcode, setTrcQr] = useState(null)
    const [upi_id, setUpi] = useState(null)
    const [isBusy, setBusy] = useState(true)
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [ercObjectURL, setERCObjectURL] = useState(null);
    const [trcObjectURL, setTRCObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setQrcode(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const ercUploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setErcQr(i);
      setERCObjectURL(URL.createObjectURL(i));
    }
  };


  const trcUploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setTrcQr(i);
      setTRCObjectURL(URL.createObjectURL(i));
    }
  };
    
    useEffect(() => {
      setBusy(true);
    const getUsers = async () => {
        
      const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'bank_details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
      }).then(response => response.json() )
      setAccountNum(users.data.account_num);
      setBankName(users.data.bank_name);
      setAccountName(users.data.account_name);
      setIfsc(users.data.ifsc);
      setQrcode(users.data.qrcode);
      setCreateObjectURL(process.env.NEXT_PUBLIC_API_URL+'qrcode/'+users.data.qrcode);
      setERC(users.data.erc_address);
      setTRC(users.data.trc_address);
      setErcQr(users.data.erc_qr);
      setTrcQr(users.data.trc_qr);
      setERCObjectURL(process.env.NEXT_PUBLIC_API_URL+'qrcode/'+users.data.erc_qr);
      setTRCObjectURL(process.env.NEXT_PUBLIC_API_URL+'qrcode/'+users.data.trc_qr);
     
      setUpi(users.data.upi_id);
      setBusy(false);
    };
  
    getUsers();
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const HandleSetting = async e => {    
    e.preventDefault();
    

    const token = await update({
       qrcode,
       bank_name,
       account_name,
       account_num,
       ifsc,
       erc_qrcode,
       trc_qrcode,
       upi_id,
       erc,
       trc
    });
    if ('status' in token) {
      swal.fire("Success", "Successfully Updated", "success", {
       
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
                                Bank Details 
                            </h3>                       
                        </div>                     
                       
                        <div className="row">
                            <div className="col-md-6 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Update Bank Info</h4>
                                        
                                        <form className="forms-sample" onSubmit={HandleSetting}>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Bank Name </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="bank_name" value={isBusy ? 0 : bank_name} onChange={e => setBankName(e.target.value)} step={"any"}
                                            placeholder="101.22"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Account Name </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="account_name" value={isBusy ? 0 : account_name} onChange={e => setAccountName(e.target.value)} step={"any"}
                                            placeholder="101.22"
                                            />
                                        </div>  

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Account Number </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="account_num" value={isBusy ? 0 : account_num}  onChange={e => setAccountNum(e.target.value)} step={"any"}
                                            placeholder=""
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">IFSC Code </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="ifsc" value={isBusy ? 0 : ifsc}  onChange={e => setIfsc(e.target.value)} step={"any"}
                                            placeholder=""
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">UPI ID </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="upi_id" value={isBusy ? 0 : upi_id}  onChange={e => setUpi(e.target.value)}
                                            placeholder=""
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">QR Code </label>
                                            
                                            <input
                                            type="file"
                                            onChange={uploadToClient} 
                                            className="form-control"
                                            id="qrcode" 
                                            placeholder=""
                                            />
                                        </div>
                                        <div className="form-group">
                                            <img alt="Body" style={{"width":"100px","height":"100px"}} src={createObjectURL} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">ERC20 Wallet </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="erc_address" value={isBusy ? 0 : erc}  onChange={e => setERC(e.target.value)}
                                            placeholder=""
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">ERC QR Code </label>
                                            
                                            <input
                                            type="file"
                                            onChange={ercUploadToClient} 
                                            className="form-control"
                                            id="erc_qr" 
                                            placeholder=""
                                            />
                                        </div>


                                        <div className="form-group">
                                            <img alt="ERC" style={{"width":"100px","height":"100px"}} src={ercObjectURL} />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">TRC20 Wallet </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="trc_address" value={isBusy ? 0 : trc}  onChange={e => setTRC(e.target.value)}
                                            placeholder=""
                                            />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">TRC QRCode </label>
                                            
                                            <input
                                            type="file"
                                            onChange={trcUploadToClient} 
                                            className="form-control"
                                            id="erc_qr" 
                                            placeholder=""
                                            />
                                        </div>


                                        <div className="form-group">
                                            <img alt="TRC" style={{"width":"100px","height":"100px"}} src={trcObjectURL} />
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