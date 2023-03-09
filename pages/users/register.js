import Cookies from 'js-cookie';
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import Front from '../../components/Front';
const dotenv = require("dotenv");

dotenv.config();
async function registerUser(credentials) {
    
  return fetch(process.env.NEXT_PUBLIC_API_URL+'users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 async function send_otp(email) {
    let ar = {"email":email}
    
    Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to revoke this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Yes, I am sure!',
        cancelButtonText: 'No, cancel it!',
     }).then(function (result) { 
            if (result.isConfirmed) {
               
                  fetch(process.env.NEXT_PUBLIC_API_URL+'send_otp', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ar)
                }).then((response) => {
                    if(!response.ok) throw new Error(response.status);
                    else return response.json();
                  })
                  .then((data) => {
                    if(data.status==='success'){
                        Swal.fire("Success", "Otp Sent Successfully..!!", "success", {
                          showConfirmButton: false,
                            timer: 2000,
                          }).then((value) => {
                            //window.location.reload();
                          });
                    }else{
                      Swal.fire("Failed","Email Already Exists..!!")
                    }
                  })
                  .catch((error) => {
                    Swal.fire("Failed","Something Went Wrong..!!")
                  });                                  
                
            } 
        },
        function () { return false; });
   }


export default function Register({ setToken }) {

    const [name, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [otp, setOTP] = useState();
    const [referal_code, setReferal] = useState();
    const [clicked, setClicked] = useState('opacity-30');

    const changeButtonProperties = event => {
        event.preventDefault();
        setEmail(event.target.value);
        setClicked('');
        if(event.target.value===''){
            setClicked('opacity-30');
        }
     };

  const handleSubmit = async e => {
    e.preventDefault();

    if(email==='' ||name ==='' ||password ==='' || otp===''){
        Swal.fire('Error',"Please fillup all required fields");
        return false;
    }


    const token = await registerUser({
      email,
      name,
      password,
      otp,
      referal_code,
    });
    if ('accessToken' in token) {
      Swal.fire("Success", token.message, "success", {
        
        timer: 2000,
      })
      .then((value) => {
        Cookies.set('access_token', token['accessToken']);
        Cookies.set('id', token['user'].id);
        Cookies.set('name', token['user'].name);
        Cookies.set('email', token['user'].email);
        Cookies.set('code', token['user'].code);
        window.location.href = "/users/dashboard";
      });
    } else {
      Swal.fire("Failed", token.message, "error");
    }
  
    
  }
  return (
    <>
      <Front>
        <form className="pt-3" onSubmit={handleSubmit}>
            <section className=" flex justify-center">
                <div className="container  flex justify-center max-w-150 p-4 mx-auto md:max-w-none">
                <div className="r-form inline-flex flex-col space-y-3 items-center justify-end px-14 pt-8 pb-12  border-2 rounded-3xl">
                <img className="f-img" alt='Logo' src="../../logo.png" />
                <p className="heading-text font-extrabold leading-10 text-center text-white">
                  Register to AI24
                </p>

                <input
                type="text"
                onChange={e => setUserName(e.target.value)}
                placeholder="Enter Full Name"
                className="form-field flex items-center justify-start pl-2  py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                
              />

              <input
                    type="text"
                    placeholder="Enter Email Address" onChange={changeButtonProperties} className="form-field flex items-center justify-start pl-2  py-5 bg-gray-200 bg-opacity-20 rounded-2xl" />
              <input
                type="text"
                placeholder="Email OTP"
                
                onChange={e => setOTP(e.target.value)}
                className="form-field flex items-center justify-start pl-2 py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
              />
              
                <button style={{"padding":"0px"}} type="button" onClick={()=>send_otp(email)} disabled={clicked==='' ? false:true} className={clicked +" inline-flex items-center justify-center btn bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-full"}>
                  <p className="text-base font-bold text-black">Get OTP</p>
                </button>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={e => setPassword(e.target.value)}
                  className="form-field flex items-center justify-start pl-2  py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                />
                <input
                  type="text"
                  placeholder="Referral code (optional)"
                  onChange={e => setReferal(e.target.value)}
                  className="form-field flex items-center justify-start pl-2  py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                />
                <button type='submit' className="inline-flex items-center justify-center w-40 h-14 p-6 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-full">
                    <p className="text-base font-bold text-black">Register</p>
              </button>

              <a className="p-text text-center text-white" href="/users/login/"> Already have an account</a>
              </div>
            </div>
          </section>
        </form>
      </Front>
    </>
  )
}


