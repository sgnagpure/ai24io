import { useState, useEffect } from 'react';
import Layout from "../../components/Layout";
import swal from "sweetalert2";
import {useRouter} from "next/router";
const dotenv = require("dotenv");

dotenv.config();
async function update(data) {    
    const ar = {"title":data.title,"id":data.id};
    return fetch(process.env.NEXT_PUBLIC_API_URL+'update_category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        },
      body: JSON.stringify(ar)
    }).then(data => data.json())
   }

  //  export async function getStaticProps(context){
  //   const {params} = context
  //   const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'get_category_by_id', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body:JSON.stringify({"id":params.id}),
  //   })   
  //     const resdata = await response.json();
  //     console.log(resdata);
  //     return {
  //       props : {
  //         categories : resdata.data[0]
  //       },
  //     }  
  // }  
  //    export async function  getStaticPaths(){
  //   const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'show_category', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
     
  //   }).then(response => response.json() )
    
  //  const datab = response.data;
  //   const paths = datab.map(cats => {
  //     return {      
  //         params : {
  //           id : `${cats.id}`
  //         }, 
  //     }
  //   })
  
  //   return {
  //     paths,
  //     fallback : true,
  //   }
  // }


export default Edit;

function Edit( catego ) {
  const [isBusy, setBusy] = useState(true)
  const router = useRouter();
    const  id  = router.query.id;
   // catego = catego.categories;
    useEffect(() => {
      if(router.isReady){
    const getUsers = async () => {
      const blogs = await fetch(process.env.NEXT_PUBLIC_API_URL+'get_category_by_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({"id":id}),
      }).then(response => response.json() )
  
      setTitle(blogs.data[0].cat_title);
      setBusy(false);
    };
  
    getUsers();
  }
    return () => {
      // this now gets called when the component unmounts
    };
  }, [router.isReady]);

    useEffect(() => {
          setTitle(catego.cat_title);
        }, []);

    const [title, setTitle] = useState(null)


    const HandleSetting = async e => {    
      e.preventDefault();
      const token = await update({
        title,
         id
      });
      if ('status' in token) {
        swal.fire("Success", "Successfully Updated", "success", {       
          timer: 2000,
        });
        window.location.reload('/admin/show_category');
      } else {
        swal.fire("Failed", "Incorrect Email or Password..!!", "error");
      }
    
      
    }
    if (router.isFallback) {
      return <h1>Data is loading</h1>;
   }
    return (
        
        <Layout>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="page-header">
                        <h3 className="page-title">
                            <span className="page-title-icon bg-gradient-primary text-white me-2">
                            <i className="mdi mdi-home" />
                            </span>{" "}
                            Edit Category
                        </h3>                       
                    </div>                     
                   
                    <div className="row">
                        <div className="col-md-8 grid-margin stretch-card">
                            <div className="card">
                                <div className="card-body">
                                    <h4 className="card-title">Edit Category</h4>
                                    
                                    <form className="forms-sample" onSubmit={HandleSetting}>

                                    <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Title </label>
                                        
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="title" defaultValue={title} onChange={e => setTitle(e.target.value)} step={"any"}
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
    
    );
}
