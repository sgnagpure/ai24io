  import { useEffect } from "react";
  import Cookies from 'js-cookie';
export default function AdminAuth({ children }) {
    
    useEffect(() => {
        // Perform localStorage action
        if (Cookies.get('admin') !== null) {
           
        }else{
            window.location.href="/admin/login";
        }
      }, []);
    <>
        {children}
    </>

}