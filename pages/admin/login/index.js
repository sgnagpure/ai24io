import React, { useState } from 'react'
import Head from 'next/head';
import swal from 'sweetalert2';
import Cookies from 'js-cookie';

async function loginUser(credentials) {
  return fetch(process.env.NEXT_PUBLIC_API_URL+'login', {
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

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    if ('accessToken' in token) {
      swal.fire("Success", token.message, "success", {
        buttons: false,
        timer: 2000,
      })
      .then((value) => {
        Cookies.set('admin',1);
        Cookies.set('access_token', token['accessToken']);
        Cookies.set('id', token['user'].id);
        Cookies.set('name', token['user'].name);
        Cookies.set('email', token['user'].email);
        window.location.href = "/admin/dashboard";
      });
    } else {
      swal.fire("Failed", token.message, "error");
    }
  
    
  }
  return (
    <>
    <Head>
    <>
      <title>AI24 Admin Login</title>
      <link rel="stylesheet" href="../../assets/vendors/mdi/css/materialdesignicons.min.css"
        />
      <link rel="stylesheet" href="../../assets/vendors/css/vendor.bundle.base.css"
        />
      <link rel="stylesheet" href="../../assets/css/style.css" />
      <link rel="shortcut icon" href="../../assets/images/favicon.ico" />
</>
    </Head>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth">
            <div className="row flex-grow">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left p-5">
                  <div className="brand-logo">
                    <img style={{width: "100px"}} alt="logo" src="../../logo.png" />
                  </div>
                  <h4 style={{ color: "black" }}>Hello! let's get started</h4>
                  <h6 className="font-weight-light" style={{ color: "black" }}>Sign in to continue.</h6>
                  <form className="pt-3" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input type="email" name='email' className="form-control form-control-lg" onChange={e => setUserName(e.target.value)} id="exampleInputEmail1" placeholder="Username" />
                    </div>
                    <div className="form-group">
                      <input type="password" name='password' className="form-control form-control-lg" onChange={e => setPassword(e.target.value)} id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="mt-3">
                      <input type="submit" className="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn" value={"Sign In"} />
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                    </div> 
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* content-wrapper ends */}
        </div>
        {/* page-body-wrapper ends */}
      </div>
      <script src="../../assets/vendors/js/vendor.bundle.base.js"></script>
      <script src="../../assets/js/off-canvas.js"></script>
      <script src="../../assets/js/hoverable-collapse.js"></script>

    </>
  )
}


