import React, { useEffect, useState } from 'react'
import swal from 'sweetalert2';
import Front from '../../components/Layout';
import Cookies from 'js-cookie';

const dotenv = require("dotenv");
dotenv.config();
export async function getServerSideProps() {

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'users/settings', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          })
        const people = await response.json();

        return { props: { people} }
      
}

async function update_price(credentials) {
    
  return fetch(process.env.NEXT_PUBLIC_API_URL+'update_price', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

 
export default function Setting({ people }) {
   
    let accessToken = '';
     let id = 0;
     let email ; 

     const [live_price, setLivePrice] = useState();
    
  const handleSubmit = async e => {
    e.preventDefault();

    if(live_price ===''){
        swal.fire('Error',"Please fillup Price");
        return false;
    }

    const result = await update_price({
      
        live_price,
      
    });
    if ('status' in result) {
      swal.fire("Success", result.message, "success", {
        buttons: false,
        timer: 2000,
      });
    } else {
      swal.fire("Failed", result.message, "error");
    }
  
    
  }
  return (
    <>
    <Front>
  
   
    <div className="container-scroller">
      
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo" href="index.html">
                        <img src="../ai24_logo_color.svg" alt="logo" />
                    </a>
                    <a className="navbar-brand brand-logo-mini" href="index.html">
                        <img src="../ai24_logo_color.svg" alt="logo" />
                    </a>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-stretch">
                    <button
                        className="navbar-toggler navbar-toggler align-self-center"
                        type="button"
                        data-toggle="minimize"
                    >
                        <span className="mdi mdi-menu" />
                    </button>
                   
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item nav-profile dropdown">
                        <button style={{'backgroundColor':"white",'border':"none"}}
                            className="nav-link dropdown-toggle"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="nav-profile-img">
                            <img src="../assets/images/faces/face1.jpg" alt="face" />
                            <span className="availability-status online" />
                            </div>
                            <div className="nav-profile-text">
                            <p className="mb-1 text-black">Admin</p>
                            </div>
                        </button>
                        <div
                            className="dropdown-menu navbar-dropdown"
                            aria-labelledby="profileDropdown"
                        >
                            
                            <div className="dropdown-divider" />
                            <button className="dropdown-item" >
                            <i className="mdi mdi-logout me-2 text-primary" /> Signout{" "}
                            </button>
                        </div>
                        </li>
                        
                        <li className="nav-item nav-logout d-none d-lg-block">
                        <button style={{'backgroundColor':"white",'border':"none"}} className="nav-link"  >
                            <i className="mdi mdi-power" />
                        </button>
                        </li>
                      
                    </ul>
                    <button
                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        data-toggle="offcanvas"
                    >
                        <span className="mdi mdi-menu" />
                    </button>
                    </div>
                </nav>
    
      <div className="container-fluid page-body-wrapper">
        {/* partial:../../partials/_sidebar.html */}
        <nav className="sidebar sidebar-offcanvas" id="sidebar">
    <ul className="nav">
        <li className="nav-item nav-profile">
        <a href="#" className="nav-link">
            <div className="nav-profile-image">
            <img src="../assets/images/faces/face1.jpg" alt="profile" />
            <span className="login-status online" />
            {/*change to offline or busy as needed*/}
            </div>
            <div className="nav-profile-text d-flex flex-column">
            <span className="font-weight-bold mb-2">Admin</span>
            </div>
            <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
        </a>
        </li>
       
        <li className="nav-item">
        <a className="nav-link" href="dashboard">
            <span className="menu-title">Dashboard</span>
            <i className="mdi mdi-contacts menu-icon" />
        </a>
        </li>
       
        <li className="nav-item">
        <a className="nav-link" href="users">
            <span className="menu-title">Users</span>
            <i className="mdi mdi-contacts menu-icon" />
        </a>
        </li>

        <li className="nav-item">
        <a className="nav-link" href="token_request">
            <span className="menu-title">Pending Token Request</span>
            <i className="mdi mdi-contacts menu-icon" />
        </a>
        </li>
        <li className="nav-item">
        <a className="nav-link" href="processed_request">
            <span className="menu-title">Processed Token Request</span>
            <i className="mdi mdi-contacts menu-icon" />
        </a>
        </li>
           
       
    </ul>
        </nav>
        {/* partial */}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Form elements </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">Forms</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Form elements
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <div className="col-md-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Default form</h4>
                    <p className="card-description"> Basic form layout </p>
                    <form className="forms-sample">
                      <div className="form-group">
                        <label htmlFor="exampleInputUsername1">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputUsername1"
                          placeholder="Username"
                          onChange={e => setLivePrice(e.target.value)}
                        />
                      </div>
                     
                      <button
                        type="submit"
                        className="btn btn-gradient-primary me-2"
                      >
                        Submit
                      </button>
                      <button className="btn btn-light">Cancel</button>
                    </form>
                  </div>
                </div>
              </div>
                   
             
              
            </div>
          </div>
          {/* content-wrapper ends */}
          {/* partial:../../partials/_footer.html */}
          <footer className="footer">
            <div className="container-fluid d-flex justify-content-between">
              <span className="text-muted d-block text-center text-sm-start d-sm-inline-block">
                Copyright © bootstrapdash.com 2021
              </span>
              <span className="float-none float-sm-end mt-1 mt-sm-0 text-end">
                {" "}
                Free{" "}
                <a
                  href="https://www.bootstrapdash.com/bootstrap-admin-template/"
                  target="_blank"
                >
                  Bootstrap admin template
                </a>{" "}
                from Bootstrapdash.com
              </span>
            </div>
          </footer>
          {/* partial */}
        </div>
        {/* main-panel ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
    </Front>
  </>
  
  )
}


