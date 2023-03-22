import React, { useEffect, useState } from 'react'
import swal from 'sweetalert2';
import Front from '../../components/Userlayout';
import Cookies from 'js-cookie';
const dotenv = require("dotenv");
dotenv.config();

/*export async function getServerSideProps() {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'users/settings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          })
        const people = await response.json();

        return { props: { people} }
      
}*/

async function buy_token(credentials) {


  return fetch(process.env.NEXT_PUBLIC_API_URL+'users/buytoken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 
export default function Buytoken() {
  const [people, setData] = useState(null)
  const [payment, setPaymentInfo] = useState(null)
  //const [inr, setINR] = useState(null)
  const [isBusy, setBusy] = useState(true)
  const [isPBusy, setPBusy] = useState(true)
  const [showing,setShowing] = useState(false);
  const [usdt_showing,setUsdtShowing] = useState(true);
  const[usdt_text,setUsdtText]=useState('USDT');
  const [upi_showing,setUpiShowing] = useState(false);
  const [neft_showing,setNeftShowing] = useState(false);
  const [erc20_showing,setErc20Showing] = useState(false);
  const [trc20_showing,setTrc20Showing] = useState(false);  
  const [trcImg, setTrcImg] = useState(null)
  const [ercImg, setErcImg] = useState(null)
  const [upiImg, setUpiImg] = useState(null)
  
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
    //setINR(users.data[2].evalue);
    setBusy(false);
  };  
  getUsers();
  return () => {
    // this now gets called when the component unmounts
  };
}, []);

useEffect(() => {
  setPBusy(true);
  const getBankDetails = async () => {
    const banks = await fetch(process.env.NEXT_PUBLIC_API_URL+'bank_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json() )
    setPaymentInfo(banks.data);
    setTrcImg(process.env.NEXT_PUBLIC_API_URL+"qrcode/"+ banks.data.trc_qr);
    setErcImg(process.env.NEXT_PUBLIC_API_URL+"qrcode/"+ banks.data.erc_qr);
    setUpiImg(process.env.NEXT_PUBLIC_API_URL+"qrcode/"+ banks.data.qrcode);
    setPayUpi(banks.data.upi_id);
    setPayErc(banks.data.erc_address);
    setPayTrc(banks.data.trc_address);
    setPBusy(false);
  };

  getBankDetails();
  return () => {
    // this now gets called when the component unmounts
  };
}, []);
   
   // let accessToken = '';
     let id = 0;
     let email ;    
    const [amount, setAmount] = useState();
    const [tokens, setTokens] = useState();
    const [wallet_address, setAddress] = useState();
    const [method, setMethod]=useState(); 
    const [pay, setPayOption]=useState('USDT');
    const[payupi,setPayUpi]=useState();
    const[payErc,setPayErc]=useState();
    const[payTrc,setPayTrc]=useState();
    const[copy_content,setCopy]=useState('copy');
     
        if (typeof window !== 'undefined') {
           //  accessToken = Cookies.get('access_token');
             id = Cookies.get('id');
             email=Cookies.get('email');
        }
      //  let arr = {'token':accessToken,'user_id':id};    
          const changeTokenValue = event => {
            event.preventDefault();
            
            let upval = 0;
            if(pay==='INR'){
              upval = event.target.value*people[2].evalue;
            }else{
               upval = event.target.value*people[0].evalue;
            }
            setTokens(upval);
         };

         const changeAmountValue = event => {
            event.preventDefault();
            
            let upval = 0;
            if(pay==='INR'){
              upval = event.target.value/people[2].evalue;
            }else{
               upval = event.target.value/people[0].evalue;
            }
            setAmount(upval);
         };

         const PayOptionHandler = event => {
            event.preventDefault();
            setPayOption(event.target.value);
            if(event.target.value==='INR') {
              setShowing(true);
              setUsdtShowing(false);
              setUsdtText('INR');
            }else if(event.target.value==='USDT') {
              setUsdtShowing(true);
              setShowing(false);
              setUsdtText('USDT');
            }else{
              setShowing(false);
              setUsdtShowing(false);
            }
            setAmount(0);
            setTokens(0);
            setUpiShowing(false);
            setNeftShowing(false);
            setTrc20Showing(false);
            setErc20Showing(false);
            setCopy('Copy');
         }

         const MethodOptionHandler = event => {
          event.preventDefault();
          setMethod(event.target.value);
            setUpiShowing(false);
            setNeftShowing(false);
            setTrc20Showing(false);
            setErc20Showing(false);
          if(event.target.value==='ERC20') {
            setErc20Showing(true);
          }else if(event.target.value==='TRC20') {
            setTrc20Showing(true);
          }else if(event.target.value==='NEFT'){
              setNeftShowing(true);
          }else if(event.target.value==='UPI'){
            setUpiShowing(true);
            
          }else{
            setUpiShowing(false);
            setNeftShowing(false);
            setTrc20Showing(false);
            setErc20Showing(false);
          }
          setAmount(0);
          setTokens(0);
          setCopy('Copy');
       }
   
       function copyText (content){
        
        navigator.clipboard.writeText(content );
        setCopy('Copied');
       }

  const handleSubmit = async e => {
    e.preventDefault();

    if(email==='' ||amount ===0 ||tokens ===0 || method===''){

        swal.fire('Error',"Please fillup all required fields");
        return false;

    }else if(method==='ERC20' || method==='TRC20'){
      if(wallet_address==='' || wallet_address === undefined){
        swal.fire('Error',"Please enter wallet address");
        return false;  
      }
    }

    const result = await buy_token({
      email,
      amount,
      tokens,
      wallet_address,
      method,
      id,
      pay
    });
    if ('status' in result) {
      swal.fire("Success", result.message, "success", {
        timer: 2000,
      })
      .then((value) => {
        window.location.href = "/users/history";
      });
    } else {
      swal.fire("Failed", result.message, "error");
    }
  
    
  }
  return (
    <>
        <Front>
        <form className="pt-3" onSubmit={handleSubmit}>

        <section className="items-center justify-center max-w-150 p-4 mx-auto md:max-w-none">
    <div className="container flex justify-center max-w-150 p-4 mx-auto md:max-w-none">
      <div className=" inline-flex b-form items-center justify-center  border-2 rounded-3xl">
        <div className="inline-flex flex-col space-y-2.5">
          <p className="heading-text font-extrabold leading-10 text-center text-white">Buy AI24 Coin</p>
          <div className="inline-flex space-x-0.5 items-center justify-left">
            <p className="text-lg font-extrabold leading-10 text-white">Select Depositing Options</p>
            <p className="text-lg font-extrabold leading-10 text-center text-red-500">*</p>
          </div>

      <select defaultValue={'USDT'} onChange={PayOptionHandler}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option disabled>Select Option</option>
        <option value={"INR"}>INR</option>
        <option value={"USDT"}>USDT</option>
    </select>

      <select style={{ display: (showing ? 'block' : 'none') }}  onChange={MethodOptionHandler}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option >Select Option</option>
        <option value={"NEFT"}>NEFT</option>
        <option value={"UPI"}>UPI</option>
    </select>

    <select style={{ display: (usdt_showing ? 'block' : 'none') }} onChange={MethodOptionHandler}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option >Select Option</option>
        <option value={"ERC20"}>ERC20</option>
        <option value={"TRC20"}>TRC20</option>
    </select>

  <div className=' inline-flex items-center justify-center border-2 rounded-3xl' style={{ display: (upi_showing===false && neft_showing===false && erc20_showing===false  && trc20_showing===false ) ? "none" : "block" }}>
    <div className='' style={{"textAlign":"center"}}>

      <div className='flex items-center justify-start py-5 UPI' style={{ display: (upi_showing ? 'block' : 'none') }}>
        <h3 className='text-lg font-medium'>UPI Id : </h3>
          <h3 style={{maxWidth: "250px" ,wordWrap: "break-word"}} className='items-center text-sm font-small'><b>UPI ID : {isPBusy ? '' : (payment.upi_id)}</b></h3>
          <button className='bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-2xl pl-2 pr-2' type="button" onClick={() => copyText(payupi)}>{copy_content}</button>
          <br></br>
          <h3 className='text-lg font-medium'>Scan QRCode : </h3>
          <img className='items-center' style={{"display":"initial !important"}} height="200" width="200" alt='QRCODE' src={upiImg}></img>
          
      </div>

      <div className='flex items-center justify-start  py-5 NEFT' style={{ display: (neft_showing ? 'block' : 'none') }}>
          <p>Bank Name : {isPBusy ? '' : (payment.bank_name)}</p>
          <p>Account Name : {isPBusy ? '' : (payment.account_name)}</p>
          <p>Account Number : {isPBusy ? '' : (payment.account_num)}</p>
          <p>IFSC : {isPBusy ? '' : (payment.ifsc)}</p>
          
          
      </div>

      <div className='flex items-center justify-start py-5 ERC20' style={{ display: (erc20_showing ? 'block' : 'none') }}>
          <h3 className='text-lg font-medium'>ERC20 Wallet : </h3>
          <h3 style={{marginLeft: "5%" ,maxWidth: "250px" ,wordWrap: "break-word"}} className='items-center text-sm font-small'><b>{isPBusy ? '' : (payment.erc_address)}</b></h3>
          <button className='bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-2xl pl-2 pr-2' type="button" onClick={() => copyText(payErc)}>{copy_content}</button>
          <br></br>
          <h3 className='text-lg font-medium'>Scan QRCode : </h3>
          <img className='items-center' style={{"display":"initial !important"}} height="200" width="200" alt='QRCODE' src={ercImg}></img>
          
      </div>

      <div className='flex items-center justify-start py-5  TRC20' style={{ display: (trc20_showing ? 'block' : 'none') }}>
      <h3 className='text-lg font-medium'>TRC20 Wallet : </h3>
          <h3 style={{marginLeft: "5%", maxWidth: "250px" ,wordWrap: "break-word"}} className='items-center text-sm font-small'><b> {isPBusy ? '' : (payment.trc_address)}</b></h3>
          <button className='bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-2xl pl-2 pr-2' type="button" onClick={() => copyText(payTrc)}>{copy_content}</button>
          <br></br>
          <h3 className='text-lg font-medium'>Scan QRCode : </h3>
          <img className='items-center' style={{"display":"initial !important"}} height="200" width="200" alt='QRCODE' src={trcImg}></img>          
      </div>
      </div>
   </div>

    <p className="text-lg font-extrabold leading-10 text-white">
    Amount {usdt_text} *
          </p>
    <input
      type="text"
      onChange={e => setAmount(e.target.value)}
      value={amount}
      placeholder="Enter Amount  "
      onInput={changeTokenValue}
      id ="amount"
      className="form-field flex items-center justify-start pl-7 py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
    />

<p className="text-lg font-extrabold leading-10 text-white">
    Token *
          </p>
    <input
      type="text"
      onChange={e => setTokens(e.target.value)}
      onInput={changeAmountValue}
      value={tokens}
      placeholder="Enter Token"
      id='token'
      className="form-field flex items-center justify-start pl-7 py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
    />

    <p className="text-lg font-extrabold leading-10 text-white">  Token in Dollar </p>
      <div className="form-field inline-flex items-center justify-start py-2.5 pl-6 pr-2.5 bg-green-300 bg-opacity-20 rounded-lg">
        <p className=" text-lg font-medium leading-10 text-center text-green-600">
      1 AI24 = 
       { isBusy ? "" : (1/people[0].evalue).toFixed(5) } Dollar 
      </p>
    </div>

    <p className="text-lg font-extrabold leading-10 text-white"> Token in INR </p>
      <div className="form-field inline-flex items-center justify-start py-2.5 pl-6 pr-2.5 bg-green-300 bg-opacity-20 rounded-lg">
        <p className=" text-lg font-medium leading-10 text-center text-green-600">
      1 AI24 = 
       { isBusy ? "" : (1/people[2].evalue).toFixed(5) } INR 
      </p>
    </div>

    <p className="text-lg font-extrabold leading-10 text-white"> BEP20 Wallet Address * </p>
    <input
      type="text"
      onChange={e => setAddress(e.target.value)}
      placeholder="Enter BEP20 Wallet Address"
      className="form-field flex items-center justify-start pl-7 py-5 bg-gray-200 bg-opacity-20 rounded-2xl"/>
      <p style={{color:"red"}}>Note : Do not use any other wallet address</p>

    <button type='submit' className="form-field inline-flex items-center justify-center p-6 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-2xl">
      <p className="text-base font-bold text-black">Continue</p>
    </button>
    </div>
  </div>
  </div>
</section>

</form>
 </Front>
    </>
  )
}


