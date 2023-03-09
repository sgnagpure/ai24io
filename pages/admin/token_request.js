import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Layout from '../../components/Layout';
import Auth from '../../components/AdminAuth';
import swal from 'sweetalert2';

const columns = [
    
    {
        field: 'id' , 
        headerName: 'SNo.', 
        filterable: false,
        renderCell:(index) => index.api.getRowIndex(index.row.id)+1
    },
    { field: 'name', headerName: 'Name' , width: 150},
    { field: 'amount', headerName: 'Amount', width: 100},
    { field: 'token', headerName: 'Token', width: 100},
    { field: 'wallet_address', headerName: 'Wallet', width: 200},
    { field: 'created_date', headerName: 'Date', width: 200},
    {
        field: "Actions",
        headerName: "Actions",
        width: 300,
        renderCell: (params) => {
            return (
              <div>
               <button onClick={() => approve_request(params.row.id,params.row.user_id,params.row.token,params.row.email)} className="btn btn-primary">Accept</button>
               <button onClick={() => disapprove_request(params.row.id,params.row.email)} className="btn btn-danger">Cancel</button>
              </div>
            );
          },
          
      },
];

function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

async function approve_request(id,user_id,token,email) {
    let ar = {"id":id,"user_id":user_id,"amount":token,"email":email}
    swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revoke this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: 'No, cancel it!',
        dangerMode: false,
     }).then(function (isConfirm) { 
            if (isConfirm) {               
                  fetch(process.env.NEXT_PUBLIC_API_URL+'approve_request', {
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
                        swal.fire("Success", "Approved Successfully..!!", "success", {
                            buttons: false,
                            timer: 2000,
                          }).then((value) => {
                            window.location.reload();
                          });
                    }
                  })
                  .catch((error) => {
                    console.log('error: ' + error);
                  });                                  
                
            } 
        },
        function () { return false; });
   }

   async function disapprove_request(id,email) {
    let ar = {"id":id,"email":email}
    
    swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revoke this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes, I am sure!',
      cancelButtonText: 'No, cancel it!',
        dangerMode: false,
     }).then(function (isConfirm) { 
            if (isConfirm) {
               
                  fetch(process.env.NEXT_PUBLIC_API_URL+'disapprove_request', {
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
                        swal.fire("Success", "Disapproved Successfully..!!", "success", {
                            buttons: false,
                            timer: 2000,
                          }).then((value) => {
                            window.location.reload();
                          });
                    }
                  })
                  .catch((error) => {
                    console.log('error: ' + error);
                  });                                  
                
            } 
        },
        function () { return false; });
   }

export default  function  Tokens(setdata){
  const [requests, setData] = useState(null)
    const [isBusy, setBusy] = useState(true)
    
    useEffect(() => {
      setBusy(true);
    const getUsers = async () => {
      const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'pending_token_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json() )
      setData(users);
  
      setBusy(false);
    };
  
    getUsers();
  
    return () => {
      // this now gets called when the component unmounts
    };
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
                            Token Request
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
                        <div className="col-12 grid-margin">
                            <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Token Request</h4>
                                <div style={{ height: 700, width: '100%' }}>
                                  {isBusy ? " " : (
                                <DataGrid autoHeight
                                    rows={requests}
                                    getRowId= {(row) => row.id}
                                    columns={columns}
                                    pageSize={12}
                                    components={{
                                        Toolbar: MyExportButton,
                                      }}
                                />)}
                                </div>
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