function Header() {   
    return (
        <>
           <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
                <li className="nav-item nav-profile">
                    <a href="/#" className="nav-link">
                        <div className="nav-profile-image">
                        <img src="../../assets/images/faces/face1.jpg" alt="profile" />
                        <span className="login-status online" />
                        {/*change to offline or busy as needed*/}
                        </div>
                        <div className="nav-profile-text d-flex flex-column">
                        <span className="font-weight-bold mb-2">Admin</span>
                        </div>
                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge" />
                    </a>
                </li>
            
                <li className="nav-item">
                    <a className="nav-link" href="/admin/dashboard">
                        <span className="menu-title">Dashboard</span>
                        <i className="mdi mdi-view-dashboard menu-icon" />
                    </a>
                </li>
            
                <li className="nav-item">
                    <a className="nav-link" href="/admin/users">
                        <span className="menu-title">Users</span>
                        <i className="mdi mdi-account-group menu-icon" />
                    </a>
                </li>

            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                <span className="menu-title">Blogs</span>
                <i className="menu-arrow"></i>
                <i className="mdi mdi-medical-bag menu-icon"></i>
              </a>
              <div className="collapse" id="general-pages">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/admin/add_blogs"> Add Blogs </a></li>
                  <li className="nav-item"> <a className="nav-link" href="/admin/show_blogs"> Show Blogs </a></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="collapse" href="#general-pages" aria-expanded="false" aria-controls="general-pages">
                <span className="menu-title">Blog Category</span>
                <i className="menu-arrow"></i>
                <i className="mdi mdi-medical-bag menu-icon"></i>
              </a>
              <div className="collapse" id="general-pages">
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <a className="nav-link" href="/admin/add_category"> Add Category </a></li>
                  <li className="nav-item"> <a className="nav-link" href="/admin/show_category"> Show Category </a></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/admin/token_request">
                    <span className="menu-title">Pending Token Request</span>
                    <i className="mdi mdi-application menu-icon" />
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/admin/processed_request">
                    <span className="menu-title">Processed Token Request</span>
                    <i className="mdi mdi-history menu-icon" />
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/admin/bank_details">
                    <span className="menu-title">Bank Details</span>
                    <i className="mdi mdi-account menu-icon" />
                </a>
            </li>

            <li className="nav-item">
                <a className="nav-link" href="/admin/settings">
                    <span className="menu-title">Settings</span>
                    <i className="mdi mdi-settings menu-icon" />
                </a>
            </li>
                
                
            
            </ul>
    </nav>
        </>
    )
}

export default Header
