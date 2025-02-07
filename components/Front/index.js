 import Head from "next/head";
import { useRouter } from "next/router";
 import Footer from "../UserLayout/Footer";
import StructuredData from "../UserLayout/StructuredData";

function Front({ children,pageMeta }) {
  const router = useRouter();
  const meta = {
    title : "Ai24 - Blockchain-based platform | Buy Ai24 Crypto Coin",
          description :  "Explore and invest in Ai24 crypto coin. Get in touch to know upcoming presale crypto coin prices, also get the latest crypto coin market news.",
    type :"website",
    ...pageMeta
  }
  const hasClass = (el, className) => el.classList.contains(className);

  function remove_hidden ()
  {          
    if(hasClass(document.querySelector('.menu-child'), 'hidden')){ // true){           
        document.querySelector('.menu-child').classList.remove('hidden');
    }else{            
      document.querySelector('.menu-child').classList.add('hidden');
    }          
  }
  
  const Nav = () => {
        const structuredData = {

          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Ai 24",
          "url": "https://ai24.io/",
          "logo": "https://ai24.io/ai24_logo.svg",
          "sameAs": [
            "https://www.facebook.com/ai24coin/",
            "https://www.instagram.com/ai24coin/",
            "https://twitter.com/ai24coin",
            "https://ai24.io/"
          ]

        }

        return <>
        
        <Head> <title>{meta.title}</title>
          <meta name="description" content={meta.description}></meta>
          <link rel="shortcut icon" href="../../logo.png" />
          <meta property="og:url" content={"https://ai24.io/"+router.asPath}></meta>
          <meta property="og:type" content={meta.type}></meta>
          <meta property="og:site_name" content="AI24"></meta>
          <meta property="og:description" content={meta.description}></meta>
          <meta property="og:title" content={meta.title}></meta>          
          <link rel="stylesheet" href="../../assets/vendors/mdi/css/materialdesignicons.min.css"/>        
          <link href="https://fonts.googleapis.com/css?family=Manrope&display=swap" rel="stylesheet"/>
          <link href="https://fonts.googleapis.com/css?family=Inter&display=swap" rel="stylesheet"/>          
          <script src="https://cdn.tailwindcss.com"></script>
          <script src="../../frontend/custome.js"></script>
          <link href="../../../frontend/styles.css" rel="stylesheet" />   
                
        </Head>
        <StructuredData data={structuredData}/>
        <section className="">
          <nav className="relative px-4 py-4 flex justify-between items-center ">
            <a className="text-xl font-bold leading-none" href="/">
              <img style={{"width":"150px !important"}} alt="logo" src="/logo_ver_wht.png"></img>
            </a>
            <div className="lg:hidden">
              <button onClick={e => remove_hidden()} className="navbar-burger flex items-center text-blue-600 p-3">
              <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Mobile menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>
            <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
              <li>
                <a className="text-sm  hover:text-gray-500" href="/">
                  Home
                </a>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <a className="text-sm  font-bold" href="/#about">
                  About
                </a>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <a className="text-sm  hover:text-gray-500" href="/#token">
                  Token
                </a>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <a className="text-sm  hover:text-gray-500" href="/#team">
                  Team
                </a>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <a className="text-sm  hover:text-gray-500" href="/#roadmap">
                  RoadMap
                </a>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <a className="text-sm hover:text-gray-500" href="/blog">
                  Blogs
                </a>
              </li>
              <li className="text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  className="w-4 h-4 current-fill"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </li>
              <li>
                <a className="text-sm hover:text-gray-500" href="/#contact">
                  Contact
                </a>
              </li>
            </ul>
            <a
              className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
              href="/login"
            >
              Sign In
            </a>
            <a
              className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
              href="/register"
            >
              Sign up
            </a>
          </nav>
          <div className="menu-child navbar-menu relative z-50 hidden">
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25" />
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <a className="mr-auto text-xl font-bold leading-none" href="/">
                  <img style={{"width":"150px !important"}} alt="logo" src="/logo_ver_wht.png" />
                </a>
                <button onClick={e=> remove_hidden()} className="navbar-close">
                  <svg
                    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <ul>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      href="/#about"
                    >
                      About
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      href="/#token"
                    >
                      Token
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      href="/#team"
                    >
                      Team
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      href="/#roadmap"
                    >
                      Roadmap
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      href="/blog"
                    >
                      Blogs
                    </a>
                  </li>
                  <li className="mb-1">
                    <a
                      className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                      href="/#contact"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
</section>

            

        </>;
      };



return (
  <><Nav/>        
                 {children}         
                 <Footer></Footer>  
      
  </>
);
}


export default Front;