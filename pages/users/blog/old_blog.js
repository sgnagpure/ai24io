import React, { useEffect, useState } from 'react'
import swal from 'sweetalert2';
import Front from '../../../components/Front';
import Script from 'next/script';
import Link from 'next/link';

export default function Blog({ setToken }) {
    const [isBusy, setBusy] = useState(true)
    const [isPBusy, setPBusy] = useState(true)
    const [blog, setBlog] = useState(null)
    
    const [category, setCategory] = useState(null)
    let categories=null;
    let tabs = null;
    let tabcontent = null;


    async function getTabContent(id) {
      let ar = {"id":id}
                    
      fetch(process.env.NEXT_PUBLIC_API_URL+'selected_blog', {
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
          setBlog(data.data);
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
      });                                  
                  
              
          
     }

     async function getTabContent2() {
     
                    
      fetch(process.env.NEXT_PUBLIC_API_URL+'display_blogs', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
      
    }).then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        if(data.status==='success'){
          setBlog(data.data);
        }
      })
      .catch((error) => {
        console.log('error: ' + error);
      });                                  
                  
              
          
     }

    useEffect(() => {
        setBusy(true);
      const getUsers = async () => {
        const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'display_category', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(response => response.json() )
        setCategory(users.data);       
        setBusy(false);
        
      };
    
      
      getUsers();

      
    
      return () => {
        // this now gets called when the component unmounts
      };
    }, []);

    useEffect(() => {
        setPBusy(true);
      const getUsers = async () => {
        const users = await fetch(process.env.NEXT_PUBLIC_API_URL+'display_blogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(response => response.json() )
        setBlog(users.data);
        setPBusy(false);
        
      }; 
      
      getUsers();
    
      return () => {
        // this now gets called when the component unmounts
      };
    }, []);

    

    if(!isBusy){
        categories = category.length > 0
           && category.map((item, i) => {
           return (
           
                <li className="mr-2" key={"li"+i} role="presentation">
                    <button onClick={() => getTabContent(item.id)} className="inline-block hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 " id={item.id+"-tab"} data-tabs-target={"#tab"+item.id} type="button" role="tab" aria-controls={item.id} aria-selected="false">{item.cat_title}</button>
                </li>
           
             
           )
         }, this);
           
         }

         if(!isPBusy){
            tabcontent = blog.length > 0  && blog.map((bitem, bi) => {
            return (
                    <div key={bi} className="max-w-sm border justify-center mt-4 items-center rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <Link as={"/users/blog/"+bitem.slug} href={"/users/blog/"+bitem.slug}><a className='box-image'>
                            <img className="rounded-t-lg" src={process.env.NEXT_PUBLIC_API_URL+"/blogs/"+bitem.image} alt="" />
                            </a></Link>
                        <div className="p-5">
                        <Link as={"/users/blog/"+bitem.slug} href={"/users/blog/"+bitem.slug}><a >
                                <h5 className="mb-2 text-l font-bold tracking-tight dark:text-white">{bitem.title}</h5>
                            </a>
                            </Link>
                            <div className="mb-3 font-sm ">
                              <div dangerouslySetInnerHTML={{ __html: bitem.description.substring(0, 200) }} />
                            </div>
                            <Link as={"/users/blog/"+bitem.slug} href={"/users/blog/"+bitem.slug}><a className="inline-flex items-center px-3 py-2 text-sm font-sm text-center text-white bg-yellow-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Read more
                                <svg aria-hidden="true" className="w-2 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                )
            }, this);
        }

    if(!isBusy){
    tabs = category.length > 0
        && category.map((item, i) => {
        return (
        
            <div key={"tabs-content"+i} className="p-4 rounded-lg dark:bg-gray-800 hidden"  id={"tab"+item.id} role="tabpanel" aria-labelledby={item.id+"-tab"}>
                <div className='p-6 grid grid-cols-1 gap-4 sm:grid-cols-4'>
                    {tabcontent}
                </div>
            </div>
        
            
        )
        }, this);
        
        }

      
  return (
    <>
    
   
        <Front>
        <link rel="stylesheet" href="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.min.css" />   
        <Script src="https://unpkg.com/@themesberg/flowbite@1.2.0/dist/flowbite.bundle.js"></Script>
    
        <section  className="items-center justify-center px-7 py-3 p-4 mx-auto md:max-w-none">
            <div className='heading-text font-extrabold leading-10 text-center text-white'>
                AI24 Blogs
            </div>
            <div className='items-center justify-center px-7 py-3 p-4 mx-auto' style={{"maxWidth":"1150px"}} >
    
    <div  className="border-b border-gray-200 dark:border-gray-700 mb-4">
        <ul className="flex flex-wrap -mb-px" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <li className="mr-2" role="presentation">
                <button onClick={() => getTabContent2()} className="inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 active" id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">All</button>
            </li>
            {categories}
           
        </ul>
    </div>
    <div id="myTabContent">
        <div className="p-4 rounded-lg dark:bg-gray-800 " id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <img src='../../frontend/images/banner.png' alt="banner" />            
                <div className="h-auto max-w-sm p-6 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <a  href="#!">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white">Trading made easy for you!</h5>
                    </a>
                    <p className="mb-3 font-normal  dark:text-gray-400">Still, recently, there has been an argument that Bitcoin, due to its limited supply and deflationary nature, can serve as a store of value and an effective hedge against inflation. A deflationary currency has limited supply; as the supply reduces, it gains value over time...</p>                   
                </div>
            </div>
            <div className='p-6 grid grid-cols-1 gap-4 sm:grid-cols-4'>
                {tabcontent}
            </div>
        </div>        
        {tabs}
    </div>

   
</div>
        </section>
        </Front>
    </>
  )
}


