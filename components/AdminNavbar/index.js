import Cookies from 'js-cookie'

function Logout () {
    if (typeof window !== 'undefined') {
        //console.log('Hello');
        Cookies.remove('admin');
        Cookies.remove('id');
        Cookies.remove('name');
        Cookies.remove('email');
        Cookies.remove('access_token');

        window.location.href="/admin/login";
    }
    
}

function Header() {
   
    return (
        <>

        
          <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style={{"paddingTop":"0px !important"}}>
                    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
                    <a className="navbar-brand brand-logo" href="/">
                        <img src="../../logo_ver.png" alt="logo" />
                    </a>
                    <a className="navbar-brand brand-logo-mini" href="/">
                        <img src="../../logo_ver.png" alt="logo" />
                    </a>
                    </div>
                    <div className="navbar-menu-wrapper d-flex align-items-stretch">
                    <button
                        className="navbar-toggler navbar-toggler align-self-center"
                        type="button"
                        data-toggle="minimize"
                    >
                        <span className="mdi mdi-menu" />
                    </button>
                   
                    <ul className="navbar-nav navbar-nav-right">
                        <li className="nav-item nav-profile dropdown">
                        <button style={{'backgroundColor':"white",'border':"none"}}
                            className="nav-link dropdown-toggle"
                            id="profileDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="nav-profile-img">
                            <img src="../../assets/images/faces/face1.jpg" alt="face" />
                            <span className="availability-status online" />
                            </div>
                            <div className="nav-profile-text">
                            <p className="mb-1 text-black">Admin</p>
                            </div>
                        </button>
                        <div
                            className="dropdown-menu navbar-dropdown"
                            aria-labelledby="profileDropdown"
                        >
                            
                            <div className="dropdown-divider" />
                            <button className="dropdown-item" onClick={Logout}>
                            <i className="mdi mdi-logout me-2 text-primary" /> Signout{" "}
                            </button>
                        </div>
                        </li>
                        
                        <li className="nav-item nav-logout d-none d-lg-block">
                        <button style={{'backgroundColor':"white",'border':"none"}} className="nav-link" onClick={Logout} >
                            <i className="mdi mdi-power" />
                        </button>
                        </li>
                      
                    </ul>
                    <button
                        className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
                        type="button"
                        data-toggle="offcanvas"
                    >
                        <span className="mdi mdi-menu" />
                    </button>
                    </div>
                </nav>
        </>
    )
}

export default Header
