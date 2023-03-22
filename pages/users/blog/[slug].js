import {useRouter} from "next/router";
import React, { useEffect, useState } from 'react'
import Front from '../../../components/Front';
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function BlogDetail({blogers}) {

    const [blog ,setBlog] = useState(null)
    const [isBusy, setBusy] = useState(true)
    const [isPBusy, setPBusy] = useState(true)
    const [recent, setRecentBlog] = useState(null)
    const [formattedDate, setFormattedDate] = useState(null)
    const router = useRouter();
    const  myslug  = router.query.slug;
  //  console.log(router.query);
    // console.log(myslug);

    useEffect(() => {
      setBusy(true);
    const getUsers = async () => {
      const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'blog_description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body:JSON.stringify({"slug":router.query.slug}),
      }).then(response => response.json() )
      setBlog(users.data[0]); 
      const date = new Date(users.data[0].created_date)
            setFormattedDate(date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
            }));     
      setBusy(false);
      
    };
  
    
    getUsers();
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, [router.isReady]);
   
      useEffect(() => {
        setPBusy(true);         
        let ar = {"slug":myslug};
            const getUsers = async () => {
            const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'top_blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(ar),
            }).then(response => response.json() )
            setRecentBlog(users.data);
            
            setPBusy(false);
            
      };
      getUsers();
      return () => {
        // this now gets called when the component unmounts
      };
    },[]);

     

    let recentBlogContent = null;

    if(!isPBusy){
        recentBlogContent = recent.length > 0
        && recent.map((bitem, bi) => {
    return (
     
      <div key={bi} className="h-auto max-w-sm p-6 mt-5 rounded-lg shadow dark:border-gray-700">
      <img className="rounded-t-lg" src={process.env.NEXT_PUBLIC_API_URL+"/blogs/"+bitem.image} alt="" />
        <a  href={"/users/blog/"+bitem.slug}>
            <h5 className="mb-2 font-base tracking-tight dark:text-white">{bitem.title}</h5>
        </a>
        <p className="mb-3 text-xs  dark:text-gray-400"><div dangerouslySetInnerHTML={{ __html: bitem.description.substring(0, 200) }} /></p>
        <a href={"users/blog/"+bitem.slug} style={{"color":"#F3AC00"}} className="inline-flex items-center text-sm font-sm text-center text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Read more...
                    
                </a>
    </div>
    
            )
        }, this);
    }
    
  if(router.isFallback){
      return (<h1>Loading...</h1>);
    }

  return (
    <>
     
    <Front pageMeta={{
          title : isBusy? "" : blog.meta_tags,
          description:isBusy? "" : blog.meta_description
        }

        }>
      
     
        <section  className="items-center justify-center px-7 py-3 p-4 mx-auto md:max-w-none">
            <div className='heading-text text-2xl font-extrabold leading-10 text-center text-white'>
             {isBusy? "" :  blog.title} 
            </div>
            <div className='items-center justify-center px-7 py-3 p-4 mx-auto' style={{"maxWidth":"1150px"}} >
            <section style={{"maxHeight":"350px"}} className="md:w-full md:h-screen">
                    {isBusy ? "" : (
                    <img  className="md:object-cover w-full h-full" src={isBusy ? "" : process.env.NEXT_PUBLIC_API_URL+"/blogs/"+ blog.image} alt="description"/> )}
            </section>
            <div className="">
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 '>
                
                <div className="col-span-3">
                <div className="relative  border-gray-200 dark:border-gray-700">
                <br/>                  
                    <li className="mb-10 ml-4">
                        
                        <div className="absolute w-3 h-3 "></div>
                        <time style={{"color":"#F3AC00"}} className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"> {formattedDate}</time>
                        <br/><br/>
                        { isBusy ? "" : (<ReactQuill
   value={blog.description}
   readOnly={true}
   theme={"bubble"}
/>)}
                    </li>
                
                </div>
                </div>

                  <div className="mt-5 col-span-1">
                        <div style={{"color":"#F3AC00"}} className='heading-text text-2xl font-bold text-center text-white'>
                            Recent Articles
                        </div>

                        {recentBlogContent}
                        </div>  
                
                    
                </div>
            </div>
            
            
</div>
        </section>
        </Front>
    </>
  )
}


export async function getStaticProps(context){
  const {params} = context
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'blog_description', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({"slug":params.slug}),
  })
    console.log("Generating page for /blog/"+params.slug);
    const resdata = await response.json();
    return {
      props : {
        blog : resdata.data[0]
      },
    }
}

export async function  getStaticPaths(){
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'display_blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
   
  }).then(response => response.json() )
  
 const datab = response.data; 
  const paths = datab.map(blog => {
    return {      
        params : {
          slug : `${blog.slug}`
        }, 
    }
  })

  return {
    paths,
    fallback:'blocking'
  }
}



