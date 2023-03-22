const Footer = () => {
return (
  <>
     <footer
    className=" text-center  dark:text-neutral-200 lg:text-left">
    
    <div className=" md:pr-10 mx-6 py-10 text-center md:text-left">
      <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="object-center">
        <img className="mx-auto" style={{"max-width": "100px"}} alt="logo" src="/logo.png" />
         
        </div>
        <div className="">
          <h6
            className="mb-4 flex justify-center font-semibold md:justify-start">
            Quick Links
          </h6>
          <div className="mb-3 text-sm">
          <a href="/#about" className=""
            >About</a
          >
        </div>
        <div className="mb-3 text-sm">
          <a href="/#team" className=""
            >Team</a
          >
        </div>
        <div className="mb-3 text-sm">
          <a href="/#token" className="text-sm"
            >Token</a
          >
        </div>

        <div className="mb-3 text-sm">
          <a href="/blog" className="text-sm"
            >Blogs</a
          >
        </div>
       
        <div className="mb-3 text-sm">
          <a href="/#contact" className=""
            >Contact</a
          >
        </div>
        <div className="mb-3 text-sm">
          <a href="/#Roadmap" className=""
            >Roadmap</a
          >
        </div>
  
        </div>
        <div className="">
          <h6
            className="mb-4 flex justify-center font-semibold md:justify-start">
           Other Links
          </h6>
          <div className="mb-3 text-sm">
            <a href="https://ai24-coin-whitepaper.gitbook.io/ai24-coin-white-paper/" className=""
              >Download Whitepaper</a
            >
          </div>
          <div className="mb-3 text-sm">
            <a href="https://ai24-coin-whitepaper.gitbook.io/ai24-coin-white-paper/" className="text-sm"
              >Whitepaper</a
            >
          </div>
          <div className="mb-3 text-sm">
            <a href="https://bscscan.com/token/0x428dDFBdD559800AbEC23AdD2d61308Dd66804A0" className=""
              >BSC Scan</a
            >
          </div>
          
          <div className="mb-3 text-sm">
            <a href="https://crew3.xyz/c/ai24coin/questboard" className=""
              >Competition</a
            >
          </div>
        </div>
        <div>
          
          <div className="mb-4 text-xl flex items-center justify-center md:justify-start">
            We accept following payment systems
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div className="mb-6 lg:mb-0">
          <img className="mx-auto" alt="visa" src="/visa.png" />
          </div>
          <div className="mb-6 lg:mb-0">
          <img className="mx-auto" alt="master" src="/master.png" />
          </div>
          <div className="mb-6 lg:mb-0">
          <img className="mx-auto" alt="bit" src="/bitcoin.png" />
          </div>
          </div>
          
        </div>
      </div>
    </div>
    
  </footer>

  </>
 
);



}


export default Footer;