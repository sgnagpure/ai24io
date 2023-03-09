import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Layout from '../../components/Layout';
import Auth from '../../components/AdminAuth';

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
            
               if(params.row.status===1){
                return (
                    <div>
                        <button disabled className='btn btn-success'>Approved</button>
                    </div>
                );
               }else{
                return (
                    <div>
                        <button disabled className='btn btn-danger'>Disapproved</button>
                    </div>
                );
               }
              
          },
          
      },
];



/*export async function getServerSideProps() {
  
    const response = await  fetch(process.env.NEXT_PUBLIC_API_URL+"processed_token_request",{ method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    const setdata = await response.json();
    
    return { props: { setdata} }
  
  }*/


function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

export default  function  Tokens(){
    const [users, setData] = useState(null)
    const [isBusy, setBusy] = useState(true)
    
    useEffect(() => {
      setBusy(true);
    const getUsers = async () => {
      const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'processed_token_request', {
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
                                    {isBusy ? "" : (
                                <DataGrid autoHeight
                                    rows={users}
                                    columns={columns}
                                    getRowId= {(row) => row.id}
                                    pageSize={12}
                                    components={{
                                        Toolbar: MyExportButton,
                                      }}
                                />
                                )}
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