import {useRouter} from "next/router";
import React, { useEffect, useState } from 'react'
import Front from '../../../components/Front';
import Script from 'next/script';



export async function getStaticProps(context){
  const {params} = context
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL+'blog_description', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({"slug":params.slug}),
  })

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
    fallback : true,
  }
  

}


export default function BlogDetail(blog) {

    const [isBusy, setBusy] = useState(true)
    const [isPBusy, setPBusy] = useState(true)
    const [recent, setRecentBlog] = useState(null)
    const [formattedDate, setFormattedDate] = useState(null)
    const router = useRouter();
    const  myslug  = router.query.slug;
    blog = blog.blog;
    
    
   
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
            const date = new Date(blog.created_date)
            setFormattedDate(date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
            }));
            setPBusy(false);
            setBusy(false);
      };
      getUsers();
      return () => {
        // this now gets called when the component unmounts
      };
    },[]);

     if(router.isFallback){
      return (<h1>Loading...</h1>);
    }

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
    

  return (
    <>
    <link rel="stylesheet" href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css" />
    <Script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></Script>
        <Front>
        <section  className="items-center justify-center px-7 py-3 p-4 mx-auto md:max-w-none">
            <div className='heading-text font-extrabold leading-10 text-center text-white'>
            Trading made easy for you!
            </div>
            <div className='items-center justify-center px-7 py-3 p-4 mx-auto' style={{"maxWidth":"1150px"}} >
            <section style={{"max-height":"350px"}} className="md:w-full md:h-screen">
                    {isBusy ? "" : (
                    <img  className="md:object-cover w-full h-full" src={process.env.NEXT_PUBLIC_API_URL+"/blogs/"+blog.image} alt="description"/> )}
            </section>
            <div className="">
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4 '>
                
                <div className="col-span-3">
                <div className="relative  border-gray-200 dark:border-gray-700">
                <br/>                  
                    <li className="mb-10 ml-4">
                        
                        <div className="absolute w-3 h-3 "></div>
                        <time style={{"color":"#F3AC00"}} className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500"> (formattedDate)</time>
                        <br/><br/>
                        { isBusy ? "" : (<div dangerouslySetInnerHTML={{ __html:blog.description }} />)}
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




