import React, { useState } from 'react'
import swal from 'sweetalert2';
import Front from '../../components/Front';

async function forget(credentials) {
  return fetch(process.env.NEXT_PUBLIC_API_URL+'forget_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function ForgetPassword({ setToken }) {

  const [email, setUserName] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(email);
    if(email ===undefined){
      swal.fire('Failed',"Please Enter Email Id to proceed");
      return false;
    }
    const token = await forget({
      email
    });
    if ('status' in token) {
      swal.fire("Success", "Please Check Your Mail..!! OTP Sent Successfully", "success", {
        timer: 2000,
      })
      .then((value) => {
          
        window.location.href = "/users/reset_password";
      });
    } else {
      swal.fire("Failed", "Something Went Wrong..!!", "error");
    }
  
    
  }
  return (
    <>
        <Front>
        
            <form className="pt-3" onSubmit={handleSubmit}>
            <section className="items-center justify-center max-w-150 p-4 mx-auto md:max-w-none">
            <div className="container flex justify-center max-w-150 p-4 mx-auto md:max-w-none">
              <div className="l-form inline-flex items-center justify-center px-7 py-3  border-2 rounded-3xl max-w-150 p-4 mx-auto md:max-w-none">
                <div className="inline-flex flex-col space-y-3 items-center justify-end">       
                  <img className="w-1/5 h-1/5" alt="logo"  src="../../logo.png" />
                
                    <p className="heading-text font-extrabold leading-10 text-center text-white">
                    Forget Password
                    </p>
                    <input
                    type="email" onChange={e => setUserName(e.target.value)}
                    placeholder="Enter Email Address"
                    className="form-field flex items-center justify-start pl-2  py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                    
                    />
                   
                    <p className="p-text text-center text-white">
                    <a href='/users/login'>Back To Login?</a>
                    </p>
                    <button type="submit" className="inline-flex items-center justify-center w-40 h-14 p-6 bg-yellow-500 rounded-full">
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


