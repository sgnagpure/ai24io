import { useEffect } from 'react';
import jsCookie from 'js-cookie';
import Header from '../AdminHeader';
import Navbar from '../AdminNavbar';
import Sidebar from '../AdminSidebar';
 function Layout({ children }) {

    useEffect(() => {
        // Perform localStorage action
        if (jsCookie.get('admin') !== undefined) {
           
        }else{
            window.location.href="/admin/login";
        }
      }, []);

    

      const Footer = () => {
        return <>
            <script src="../../assets/vendors/js/vendor.bundle.base.js"></script>
            <script src="../../assets/vendors/chart.js/Chart.min.js"></script>
            <script src="../../assets/js/jquery.cookie.js" type="text/javascript"></script>
            <script src="../../assets/js/off-canvas.js"></script>
            <script src="../../assets/js/hoverable-collapse.js"></script>
            <script src="../../assets/js/dashboard.js"></script>
            <script src="../../assets/js/todolist.js"></script>
            <script src="../../assets/js/misc.js"></script>
            <script src="../../assets/js/sidebar.js"></script>
        </>;
      };


return (
  <>
        <Header></Header>
       <div className='navbar-body'>
        <div className="container-scroller">
            <Navbar/>
            <div className="container-fluid page-body-wrapper">
                <Sidebar/>
                {children}         
            </div>          
        </div>
        </div>
       <Footer />
  </>
);
}


export default Layout;