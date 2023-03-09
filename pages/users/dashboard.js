import React, { useEffect, useState } from "react";
import Layout from "../../components/Userlayout";
import Auth from "../../components/AdminAuth";
import Cookies from "js-cookie";

export default function Dashboard(){
    const [name, setName] = useState()
    useEffect(() => setName(Cookies.get('name')), [])     
    return(
        <>
           <Auth>
            </Auth>
                <Layout>
                <section className=" items-center justify-center max-w-100 p-4 mx-auto md:max-w-none">
                    <div className="container flex justify-center max-w-100 p-4 mx-auto md:max-w-none">
                        <div className="w-form inline-flex items-center justify-center   border-2 rounded-3xl">
                        <div className="inline-flex flex-col space-y-5 items-center justify-end">
                            <img alt="logo" className="f-img" src="../../logo.png" />
                            <h2 className="heading-text font-extrabold leading-10 text-center text-white">
                            <span >Hey <b> {name}</b></span>
                            </h2>
                            <p className="w-sec text-lg font-medium leading-normal text-center text-white">
                            Your account is created successfully, hope you have a lovely time at
                            AI24.
                            </p>
                            <a style={{"marginTop":"25%"}}
                            href="/"
                            className="inline-flex items-center justify-center w-40 h-14 p-6 bg-gradient-to-b from-yellow-500 to-yellow-700 rounded-full"
                            >
                               
                            <p className="text-base font-bold text-black" ><a href="/users/buytoken">Buy Tokens</a></p>
                            </a>
                        </div>
                        </div>
                    </div>
                    </section>

                </Layout>
           
        
        </>
    )
}