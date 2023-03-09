import React, { useState } from 'react'
import swal from 'sweetalert2';
import Front from '../../components/Front';

async function reset(credentials) {
  return fetch(process.env.NEXT_PUBLIC_API_URL+'reset_password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function ResetPassword({ setToken }) {

  const [otp, setUserName] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();

        if(password!==repassword){
            swal.fire("Failed", "Passwords donot match..!!", "error");
            return false;
        }

    const token = await reset({
      password,
      otp,
    });
    if ('status' in token) {
      swal.fire("Success", "Password Updated Successfully.. Please Login Again..!!", "success", {
        timer: 2000,
      })
      .then((value) => {
          
        window.location.href = "/users/login";
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
                <div
                  className="inline-flex flex-col space-y-3 items-center justify-end"
                  style={{ width: 350, height: 350 }}
                >       
                  <img className="w-1/5 h-1/5" alt="logo"  src="../../logo.png" />
                    <p className="text-4xl font-extrabold leading-10 text-center text-white">
                    Reset Password
                    </p>
                    <input
                    type="text" onChange={e => setUserName(e.target.value)}
                    placeholder="Enter OTP"
                    className="form-field flex items-center justify-start pl-7 py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                    
                    />

                    <input
                    type="password" onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="form-field flex items-center justify-start pl-7 py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                    
                    />

                <input
                    type="password" onChange={e => setRePassword(e.target.value)}
                    placeholder="Re-Enter Password"
                    className="form-field flex items-center justify-start pl-7 py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                    
                    />
                   
                    
                    <button type="submit" className="inline-flex items-center justify-center w-40 h-14 p-6 bg-yellow-500 rounded-full">
                    <p className="text-base font-bold text-black">Continue</p>
                    </button>

                    <p className="w-1/2 h-11 text-lg font-medium leading-10 text-right text-white">
                    <a href='/users/login'>Back To Login?</a>
                    </p>
                 
                       </div>
                  </div>
                </div>
            </section>
            </form>
        </Front>
    </>
  )
}


