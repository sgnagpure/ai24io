import { useEffect } from "react";
import Cookies from 'js-cookie';

export default function UserAuth({ children }) {
    
    useEffect(() => {
        // Perform localStorage action
        if (Cookies.get('access_token') !== null) {
           
        }else{
            window.location.href="/users/login";
        }
      }, []);
    <>
        {children}
    </>

}