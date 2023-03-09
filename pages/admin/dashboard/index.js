import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import Auth from "../../../components/AdminAuth";
import Cookies from 'js-cookie';
export default function Dashboard(){
    
    let accessToken = '';
    let id = 0;
    if (typeof window !== 'undefined') {
        accessToken = Cookies.get('access_token');
        id = Cookies.get('id');
        
   }
       let arr = {'token':accessToken,'user_id':id};
       const [tableData, setTableData] = useState([]);
    useEffect(() => {
       fetch(process.env.NEXT_PUBLIC_API_URL+"dashboard",{ method: 'POST',
       headers: {
           'Content-Type': 'application/json'
       }, 
        body: JSON.stringify(arr)
       }).then((data) => data.json())
         .then((data) => setTableData(data))
   
     }, []);
   
     
    return(
        <>
           <Auth>
            </Auth>
                <Layout>
                        <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-home" />
                                </span>{" "}
                                Dashboard
                            </h3>
                            <nav aria-label="breadcrumb">
                                <ul className="breadcrumb">
                                <li className="breadcrumb-item active" aria-current="page">
                                    <span />
                                    Overview{" "}
                                    <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                                </li>
                                </ul>
                            </nav>
                            </div>
                            <div className="row">
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card bg-gradient-danger card-img-holder text-white">
                                <div className="card-body">
                                    <img src="../../assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle"
                                    />
                                    <h4 className="font-weight-normal mb-3">
                                    Total Users{" "}
                                    <i className="mdi mdi-chart-line mdi-24px float-right" />
                                    </h4>
                                    <h2 className="mb-5">{tableData.users}</h2>
                                    
                                </div>
                                </div>
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card bg-gradient-info card-img-holder text-white">
                                <div className="card-body">
                                    <img
                                    src="../../assets/images/dashboard/circle.svg"
                                    className="card-img-absolute"
                                    alt="circle"
                                    />
                                    <h4 className="font-weight-normal mb-3">
                                    Wallet{" "}
                                    <i className="mdi mdi-bookmark-outline mdi-24px float-right" />
                                    </h4>
                                    <h2 className="mb-5">{tableData.wallet}</h2>
                                </div>
                                </div>
                            </div>
                            <div className="col-md-4 stretch-card grid-margin">
                                <div className="card bg-gradient-success card-img-holder text-white">
                                <div className="card-body">
                                    <img
                                    src="../../assets/images/dashboard/circle.svg"
                                    className="card-img-absolute"
                                    alt="circle"
                                    />
                                    <h4 className="font-weight-normal mb-3">
                                    Pending Request{" "}
                                    <i className="mdi mdi-diamond mdi-24px float-right" />
                                    </h4>
                                    <h2 className="mb-5">{tableData.pending_request}</h2>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    
                        </div>
                        {/* main-panel ends */}
                </Layout>
           
        
        </>
    )
}