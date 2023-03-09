import React, { useState, useEffect } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Layout from '../../components/Userlayout';
import Cookies from 'js-cookie';

const columns = [
    
    {
        field: 'id' , 
        headerName: 'SNo.', 
        filterable: false,
        renderCell:(index) => index.api.getRowIndex(index.row.id)+1
    },    
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
               }else if(params.row.status===2){
                return (
                    <div>
                        <button disabled className='btn btn-danger'>Disapproved</button>
                    </div>
                );
               }else{
                return (
                    <div>
                        <button disabled className='btn btn-primary'>Pending</button>
                    </div>
                );
               }
              
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

export default  function  History(){

    let accessToken = '';
        let id = 0;
        
        if (typeof window !== 'undefined') {
             accessToken = Cookies.get('access_token');
             id = Cookies.get('id');
            
        }
            let arr = {'token':accessToken,'id':id};
            const [tableData, setTableData] = useState([]);
         useEffect(() => {
            fetch(process.env.NEXT_PUBLIC_API_URL+"users/history",{ method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
             body: JSON.stringify(arr)
            }).then((data) => data.json())
              .then((data) => setTableData(data))
        
          }, []);
        
          //console.log(tableData);
    

    return(
        <>
             <Layout>
            
  <section>
  <div className="row">
                        <div className="col-12 grid-margin">
                            <div className="card">
                            <div className="card-body">
                                
                                <p className="text-4xl font-extrabold leading-10 text-center text-white">
                    Token Request
                    </p><br></br>
    <div
      className="flex items-start justify-center px-8 pt-0.5 pb-5 bg-gray-200 bg-opacity-20 rounded-2xl"
      style={{ width: '100%', height: '100%' }}
    >
                    <div style={{ height: '100%', width: '100%' , background:"white" }}>
                        <DataGrid autoHeight
                            rows={tableData}
                            columns={columns}
                            getRowId= {(row) => row.id}
                            pageSize={12}
                            components={{
                                Toolbar: MyExportButton,
                            }}
                        />
                    </div>
                </div>
                </div>
                </div>
                </div>
                </div>
            </section>        
                        
                      
                    
                    {/* main-panel ends */}
               

            </Layout>
        </>
    )
}