import React, {  useState } from "react";
import Layout from "../../components/Layout";
import swal from "sweetalert2";
const dotenv = require("dotenv");

dotenv.config();
async function update(data) {
    
    const ar = {"title":data.title};
    return fetch(process.env.NEXT_PUBLIC_API_URL+'add_category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(ar)
    }).then(data => data.json())
   }

export default function AddCategory(){
    const [title, setTitle] = useState(null)


  const HandleSetting = async e => {    
    e.preventDefault();
    

    const token = await update({
      
       title,
     
    });
    if ('status' in token) {
      swal.fire("Success", "Successfully Updated", "success", {       
        timer: 2000,
      });
    } else {
      swal.fire("Failed", "Incorrect Email or Password..!!", "error");
    }
  
    
  }
    return(
        <>
            <Layout>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="page-header">
                            <h3 className="page-title">
                                <span className="page-title-icon bg-gradient-primary text-white me-2">
                                <i className="mdi mdi-home" />
                                </span>{" "}
                                Add Category
                            </h3>                       
                        </div>                     
                       
                        <div className="row">
                            <div className="col-md-8 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Add Category</h4>
                                        
                                        <form className="forms-sample" onSubmit={HandleSetting}>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Title </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="title"  onChange={e => setTitle(e.target.value)} step={"any"}
                                            placeholder="Title"
                                            />
                                        </div>

                                       
                                        <input type="submit" value={'Update'} className="btn btn-gradient-primary me-2"/>
                                        </form>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </div>                  
                </div>
            </Layout>
        </>
    )

}