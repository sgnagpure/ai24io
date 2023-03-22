import styles from "../styles/Navbar.module.css"
import Link from "next/link"
import { useEffect } from "react";
import Cookies from "js-cookie";
function Navbar() {
    useEffect(() => {
       // ethEnabled(false);
    })

    var data = '';
    var data1 = '';
    console.log('data');
    console.log(Cookies.get('id'));

    if (Cookies.get('id') !== undefined) {

            data = <a className={styles.connectBtn} href="/users/dashboard" >Dashboard</a>;
            data1 = '';
        }else{
            data = <a className={styles.connectBtn} href="/users/login" >Login</a> ;
            data1 =  <a className={styles.connectBtn} href="/users/register" >Register</a>;
        }
     

    return (
        <>
            <nav className={styles.navWrapper}>
                <div className={styles.navbar}>
                    <div className={styles.logoSection} style={{"flex":"0.5"}}>
                        <Link href=""><a>
                            {/* <h1 className={styles.logoText}>Globus Coin</h1> */}
                            <img src="/logo_ver_wht.png" alt="AI24 Logo" className={styles.logoImage} />
                        </a></Link>
                    </div>
                    <div className={styles.menuSection}>
                        <ul className={styles.menu}>
                            <li><Link href="#about"><a className={styles.menuItem}>About</a></Link></li>
                            <li><Link href="#token"><a className={styles.menuItem}>Token</a></Link></li>
                            <li><Link href="#team"><a className={styles.menuItem}>Team</a></Link></li>
                            <li><Link href="#roadmap"><a className={styles.menuItem}>Roadmap</a></Link></li>
                            <li><Link href="#contact"><a className={styles.menuItem}>Contact</a></Link></li>
                            <li><Link href="/blog"><a className={styles.menuItem}>Blog</a></Link></li>
                        </ul>
                        
                       
                       {data}
                       {data1}

                        
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar


/*const Web3 = require("web3");
const ethEnabled = async (reload) => {
    if (window.ethereum) {
        let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        window.web3 = new Web3(window.ethereum);
        document.getElementById("connect-wallet-btn").innerHTML = accounts[0].slice(0, 6) + "..." + accounts[0].slice(-6, -1) + accounts[0].slice(-1);
        document.getElementById("connect-wallet-btn").style.background = "rgb(25,25,10)";
        document.getElementById("connect-wallet-btn").style.borderRadius = "10px";
        document.getElementById("connect-wallet-btn").style.boxShadow = "none";
        document.getElementById("connect-wallet-btn").style.color = "rgb(255,180,60)";
        localStorage.setItem("address", accounts[0]);
        if (reload) {
            window.location.reload();
        }
        return true;
    }
    else {
        // document.getElementById("notice-box").style.display = "flex";
        //
    }
    return false;
}*/