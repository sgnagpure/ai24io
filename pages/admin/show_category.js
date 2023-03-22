import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import Layout from '../../components/Layout';
import Auth from '../../components/AdminAuth';
import swal from 'sweetalert2';
import Link from 'next/link';

async function deactive_request(id) {
    let ar = {"id":id}
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
                  fetch(process.env.NEXT_PUBLIC_API_URL+'deactive_category', {
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
                        swal.fire("Success", "Deactivated Successfully..!!", "success", {
                            buttons: false,
                            timer: 2000,
                          }).then((value) => {
                            window.location.reload();
                          });
                    }else{
                        swal.fire(data.message);
                    }
                  })
                  .catch((error) => {
                    console.log('error: ' + error);
                  });                                  
                
            } 
        },
        function () { return false; });
   }

   async function active_request(id) {
    let ar = {"id":id}
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
                  fetch(process.env.NEXT_PUBLIC_API_URL+'active_category', {
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
                        swal.fire("Success", "Activated Successfully..!!", "success", {
                            buttons: false,
                            timer: 2000,
                          }).then((value) => {
                            window.location.reload();
                          });
                    }else{
                       swal.fire(data.message);
                    }
                  })
                  .catch((error) => {
                    console.log('error: ' + error);
                  });                                  
                
            } 
        },
        function () { return false; });
   }

const columns = [    
    {
        field: 'id' , 
        headerName: 'SNo.', 
        filterable: false,
        renderCell:(index) => index.api.getRowIndex(index.row.id)+1
    },
    { field: 'cat_title', headerName: 'Title' , width: 100 , renderCell: (params) => {
            
        
         return (
             <div>
                 {params.row.cat_title}
             </div>
         );
        
       
   }
        
    },
    
    {
        field: "active",
        headerName: "Active",
        width: 300,
        renderCell: (params) => {
            
            if(params.row.active===1){
                return (
                    <div>
                        <button onClick={() => deactive_request(params.row.id)} className='btn btn-danger'>Deactivate</button>
                        <Link as={`/admin_category/edit?id=${params.row.id}`} href={`/admin_category/edit?id=${params.row.id}`}><a className='btn btn-warning'>Edit</a></Link>
                    </div>
                );
               }else{
                return (
                    <div>
                        <button onClick={() => active_request(params.row.id)} className='btn btn-success'>Activate</button>
                        <a href={"/admin_category/edit?id="+params.row.id} className='btn btn-warning'>Edit</a>
                    </div>
                );
               }
              
          },
          
      },
      { field: 'created_date', headerName: 'Date', width: 200},
    
];



function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

export default  function  Users(setdata){
    const [users, setData] = useState(null)
    const [isBusy, setBusy] = useState(true)
    
    useEffect(() => {
      setBusy(true);
    const getUsers = async () => {
      const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'show_category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => response.json() )
      setData(users.data);
  
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
                            Users
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
                                <h4 className="card-title">Category List</h4>
                                <div style={{ height: 700, width: '100%' }}>
                                    {isBusy ? " ":(
                                <DataGrid 
                                getRowHeight={() => 'auto' }
                                getcolumn={() => 'auto' }
                                    rows={users}
                                    getRowId= {(row) => row.id}
                                    columns={columns}
                                    pageSize={10}
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