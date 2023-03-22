import Cookies from 'js-cookie';
import Footer from "./Footer";
import Header from "./Header";


 function Userlayout({ children }) {
  if (typeof window !== 'undefined') {
  Cookies.get('access_token') ===undefined ?
   ( window.location.href='/users/login' )
    : ( console.log('continue'));
  }


        
return (
  <>
 <Header/>

            {children}      
          
      <Footer/>
  </>
 
);



}


export default Userlayout;