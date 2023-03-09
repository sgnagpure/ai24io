import React, {  useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import swal from "sweetalert2";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const dotenv = require("dotenv");


const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

dotenv.config();
async function update(data) {
    
    const body = new FormData();
    body.append("image", data.image);
    body.append("title", data.title);
    body.append("description", data.description);
    body.append("category", data.category);
    return fetch(process.env.NEXT_PUBLIC_API_URL+'add_blogs', {
      method: 'POST',
       body
    }).then(data => data.json())
   }

export default function EditBlog(id){
    console.log(id);
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setQrcode] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [category, setCategory] = useState(null);
    const [categorylist, SetCategoryList] = useState()
    const [isBusy, setBusy] = useState(true)
    let categories=null;
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setQrcode(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };


useEffect(() => {
    setBusy(true);
  const getUsers = async () => {
    const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'show_category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => response.json() )
    SetCategoryList(users.data);
    setBusy(false);
  };

  getUsers();
  return () => {
    // this now gets called when the component unmounts
  };
}, []);

useEffect(() => {
    setBusy(true);
    let ar = {"id":id}
  const getUsers = async () => {
    const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'get_blog_by_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(id)
    }).then(response => response.json() )
    setTitle(users.data[0].title);
    setDescription(users.data[0].description);
    setCategory(users.data[0].cat_id);
   
    setQrcode(users.data[0].image);
    setCreateObjectURL(process.env.NEXT_PUBLIC_API_URL+"/blogs/"+users.data[0].image);
    setBusy(false);

  };

  getUsers();
  return () => {
    // this now gets called when the component unmounts
  };
}, []);


  const HandleSetting = async e => {    
    e.preventDefault();
    const token = await update({
       image,
       title,
       description,
       category
    });
    if ('status' in token) {
      swal.fire("Success", "Successfully Updated", "success", {       
        timer: 2000,
      });
    } else {
      swal.fire("Failed", "Incorrect Email or Password..!!", "error");
    }
  
    
  }

  if(!isBusy){
   categories = categorylist.length > 0
      && categorylist.map((item, i) => {
      return (
        <option key={i} value={item.id}>{item.cat_title}</option>
      )
    }, this);
      console.log(categories);
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
                                Add Blog
                            </h3>                       
                        </div>                     
                       
                        <div className="row">
                            <div className="col-md-8 grid-margin stretch-card">
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">Edit Blogs</h4>
                                        
                                        <form className="forms-sample" onSubmit={HandleSetting}>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Category </label>
                                            
                                            <select className="form-control" defaultValue={category} onChange={e => setCategory(e.target.value)} >
                                           <option>Select Category</option>
                                             
                                            {isBusy?  "": (categories)} 
                                                                                       </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Title </label>
                                            
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="title" defaultValue={title} onChange={e => setTitle(e.target.value)} step={"any"}
                                            placeholder="Blog 1"
                                            />
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Description </label>
                                            <QuillNoSSRWrapper modules={modules} onChange={setDescription} theme="snow" /> 
                                        </div>

                                        
                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Image </label>
                                            
                                            <input
                                            type="file"
                                            onChange={uploadToClient} 
                                            className="form-control"
                                            id="image" 
                                            placeholder=""
                                            />
                                        </div>
                                        <div className="form-group">
                                            <img alt="Body" style={{"width":"100px","height":"100px"}} src={createObjectURL} />
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

export async function getServerSideProps({ params }) {
    return {
        props: { id: params.id }
    }
}