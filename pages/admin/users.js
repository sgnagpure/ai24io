import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import Layout from '../../components/Layout';
import Auth from '../../components/AdminAuth';

const columns = [
    
    {
        field: 'id' , 
        headerName: 'SNo.', 
        filterable: false,
        renderCell:(index) => index.api.getRowIndex(index.row.id)+1
    },
    { field: 'name', headerName: 'Name' , width: 100},
    { field: 'contact', headerName: 'Contact', width: 100},
    { field: 'email', headerName: 'Email', width: 300},
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
      const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'users', {
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
                                <h4 className="card-title">Users List</h4>
                                <div style={{ height: 700, width: '100%' }}>
                                    {isBusy ? " ":(
                                <DataGrid autoHeight
                                    rows={users}
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