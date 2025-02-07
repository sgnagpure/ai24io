import React, {  useEffect, useState } from "react";
import Layout from "../../components/Layout";
import swal from "sweetalert2";
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { useRouter } from "next/router";
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

// export async function getStaticProps(context){
//   const {params} = context
//   const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'get_blog_by_id', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body:JSON.stringify({"id":params.id}),
//   })


//     const resdata = await response.json();
//     return {
//       props : {
//         blogs : resdata.data[0]
//       },
//     }

// }

// export async function  getStaticPaths(){
//   const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'show_blogs', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
   
//   }).then(response => response.json() )
  
//  const datab = response.data;
//   const paths = datab.map(blogs => {
//     return {      
//         params : {
//           id : `${blogs.id}`
//         }, 
//     }
//   })

//   return {
//     paths,
//     fallback : true,
//   }
// }

dotenv.config();
async function update(data) {
    
    const body = new FormData();
    body.append('id',data.id);
    body.append("image", data.image);
    body.append("title", data.title);
    body.append("metatags", data.metatags);
    body.append("meta_description",data.meta_description);
    body.append("description", data.description);
    body.append("category", data.category);
    return fetch(process.env.NEXT_PUBLIC_API_URL+'update_blogs', {
      method: 'POST',
       body
    }).then(data => data.json())
   }

export default function EditBlog(){


  const router = useRouter();
    const  id  = router.query.id;

    console.log(id);

  
    //blogs = blogs.blogs;
    
    const [title, setTitle] = useState(null)
    const [metatags, setTags] = useState(null)
    const [meta_description,setMetaDescription] = useState(null)
    const [description, setDescription] = useState(null)
    const [image, setQrcode] = useState(null)
    const [createObjectURL, setCreateObjectURL] = useState(null);
    const [category, setCategory] = useState();
    const [categorylist, SetCategoryList] = useState()
    const [isBusy, setBusy] = useState(true)
    const [isPBusy, setPBusy] = useState(true)
    let categories=null;
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setQrcode(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  
  useEffect(() => {
   
    if(router.isReady){
  const getUsers = async () => {
    console.log("entered"+router.query.id);
    const blogs = await fetch(process.env.NEXT_PUBLIC_API_URL+'get_blog_by_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({"id":router.query.id}),

    }).then(response => response.json() )
      console.log(blogs);
    setTitle(blogs.data[0].title);
    setTags(blogs.data[0].meta_tags);
    setCategory(blogs.data[0].cat_id);
    setDescription(blogs.data[0].description);
    setCreateObjectURL(process.env.NEXT_PUBLIC_API_URL+"blogs/"+blogs.data[0].image);
    //console.log(categorylist);
    setPBusy(false);
  };

  getUsers();
}
  return () => {
    // this now gets called when the component unmounts
  };

}, [router.isReady]);

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

    
    //console.log(categorylist);
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
      id,
       image,
       title,
       metatags,
       meta_description,
       description,
       category
    });
    if ('status' in token) {
      swal.fire("Success", "Successfully Updated", "success", {       
        timer: 2000,
      });
      window.location.reload('/admin/show_blogs');
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
      //console.log(categories);
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
                                            <select value={category} className="form-control" onChange={e => setCategory(e.target.value)} >
                                                <option>Select Category</option>
                                                {isBusy?  "": (categories)}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Title </label>
                                            <input
                                            type="text"
                                            className="form-control"
                                            id="title" defaultValue={isPBusy ? "" : title} onChange={e => setTitle(e.target.value)} step={"any"}
                                            placeholder="Blog 1"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Meta Title </label>
                                            <textarea
                                            type="text"
                                            className="form-control"
                                            id="title"  onChange={e => setTags(e.target.value)} step={"any"}
                                            placeholder="<meta>"
                                            defaultValue={isPBusy ? "" :metatags}
                                            ></textarea>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputUsername1">Meta Description </label>
                                            <textarea
                                            type="text"
                                            className="form-control"
                                            id="title"  onChange={e => setMetaDescription(e.target.value)} step={"any"}
                                            placeholder="<meta>"
                                            defaultValue={isPBusy ? "" :meta_description}
                                            ></textarea>
                                        </div>

                                        <div className="form-group">
                                        <label htmlFor="exampleInputUsername1">Description </label>
                                            <QuillNoSSRWrapper value={description} modules={modules} onChange={setDescription} theme="snow" /> 
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
                                            <img alt="Body"  style={{"width":"100px","height":"100px"}} src={createObjectURL} />
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

