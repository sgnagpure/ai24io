import React, { useState } from 'react'
import swal from 'sweetalert2';
import Front from '../../components/Front';
import Cookies from 'js-cookie'


async function loginUser(credentials) {
  return fetch(process.env.NEXT_PUBLIC_API_URL+'users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }


export default function Login({ setToken }) {

  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [passwordType, setPasswordType] = useState("password");

  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    if ('accessToken' in token) {
      swal.fire("Success", token.message, "success", {
       
        timer: 2000,
      })
      .then((value) => {
        const expires = (60 * 60) * 1000
        const inOneHour = new Date(new Date().getTime() + expires);
        Cookies.set('access_token', token['accessToken'], { expires: inOneHour })
        Cookies.set('id', token['user'].id);
        Cookies.set('name', token['user'].name);
        Cookies.set('email', token['user'].email);
        Cookies.set('code', token['user'].mycode);        
        window.location.href = "/users/dashboard";
      });
    } else {
      swal.fire("Failed", "Incorrect Email or Password..!!", "error");
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
                  
                >       
           <img className="w-1/5 h-1/5" alt="logo"  src="../../logo.png" />
                   <h2 className="heading-text font-extrabold leading-10 text-center text-white">Login to AI24</h2>


                    <input
                    type="text" onChange={e => setUserName(e.target.value)}
                    placeholder="Enter Email Address"
                    className="form-field flex items-center justify-start pl-2  py-5 bg-gray-200 bg-opacity-20 rounded-2xl"
                    
                    />
                 
                    <input
                     type={passwordType}
                    placeholder="Password"
                    className="form-field flex items-center justify-start pl-2  py-5 bg-gray-200 bg-opacity-20 rounded-2xl" 
                    onChange={e => setPassword(e.target.value)}
                   
                    />

                   
                    
                    <p className="p-text text-center text-white">
                    <a href='/users/forget_password'>Forgot password?</a>
                    </p>
                    <button type="submit" className="inline-flex items-center justify-center w-40 h-14 p-6 bg-yellow-500 rounded-full">
                    <p className="text-base font-bold text-black">Login</p>
                    </button>
                    <p className="p-text text-center text-white">
                    <a href='/users/register/'>Create New Account</a>
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


