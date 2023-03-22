import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from "ethers"
import Head from "next/head"
import { useCallback, useEffect, useReducer, useState } from "react"
import Swal from "sweetalert2"
import WalletLink from "walletlink"
import Web3Modal from "web3modal"
import { ellipseAddress, getChainData } from "../../lib/utilities"
import Header from '../../components/UserLayout/Header';
import Footer from '../../components/UserLayout/Footer';
import BuyLayout from '../../components/BuyLayout';

const isValid = (regex) => (input) => regex.test(input);
const numberRegex = /^\d*\.?\d*$/;
const isValidNumber = isValid(numberRegex);

const INFURA_ID = "76d32c1d0cec45b281d3b1a00a4e897d"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID // required
    }
  },
  "custom-walletlink": {
    display: {
      logo:
        "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet (not Coinbase App)"
    },
    options: {
      appName: "Coinbase", // Your app name
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options
      const walletLink = new WalletLink({
        appName
      })
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId)
      await provider.enable()
      return provider
    }
  }
}

let web3Modal
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions // required
  })
}

const initialState = {
  provider: null,
  web3Provider: null,
  address: null,
  chainId: null
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_WEB3_PROVIDER":
      return {
        ...state,
        provider: action.provider,
        web3Provider: action.web3Provider,
        address: action.address,
        chainId: action.chainId
      }
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.address
      }
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId
      }
    case "RESET_WEB3_PROVIDER":
      return initialState
    default:
      throw new Error()
  }
}

export const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { provider, web3Provider, address, chainId } = state

  const connect = useCallback(async function() {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    const provider = await web3Modal.connect()

    // We plug the initial `provider` into ethers.js and get back
    // a Web3Provider. This will add on methods from ethers.js and
    // event listeners such as `.on()` will be different.
    const web3Provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = web3Provider.getSigner()
    const address = await signer.getAddress()

    const network = await web3Provider.getNetwork()

    dispatch({
      type: "SET_WEB3_PROVIDER",
      provider,
      web3Provider,
      address,
      chainId: network.chainId
    })
  }, [])

  const disconnect = useCallback(
    async function() {
      await web3Modal.clearCachedProvider()
      if (provider?.disconnect && typeof provider.disconnect === "function") {
        await provider.disconnect()
      }
      dispatch({
        type: "RESET_WEB3_PROVIDER"
      })
    },
    [provider]
  )

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = accounts => {
        // eslint-disable-next-line no-console
        console.log("accountsChanged", accounts)
        dispatch({
          type: "SET_ADDRESS",
          address: accounts[0]
        })
      }

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = _hexChainId => {
        window.location.reload()
      }

      const handleDisconnect = error => {
        // eslint-disable-next-line no-console
        console.log("disconnect", error)
        disconnect()
      }

      provider.on("accountsChanged", handleAccountsChanged)
      provider.on("chainChanged", handleChainChanged)
      provider.on("disconnect", handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged)
          provider.removeListener("chainChanged", handleChainChanged)
          provider.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [provider, disconnect])

  const chainData = getChainData(chainId)
  const CONNECTABLE_CHAIN = 56;
  const [enable, setEnable] = useState(false);
  const cAddress = "0x7c494D31CC368432F07Cc4Fbf273c792cdd2b2c1";
  const gartVal = 20000;
  const [data, setData] = useState({
    bnb: "",
    gart: ""
  });

  const buy = async () => {
    if(web3Provider){
       if (chainId === CONNECTABLE_CHAIN) {
      processBuy();
       }
       else{
        Swal.fire(`Switch to Binance Mainnet.`);
       }
    } else {
      //
    }
  }

  const processBuy = async () => {
    if(data.gart < 499) {
        Swal.fire('Minimum Buy 500 AI24 token.');
        return;
      }
    setEnable(true);
    
     console.log(data.bnb);
     let str_val = data.bnb.toString();
     console.log(str_val);
    let bnbValue = await ethers.utils.parseEther(str_val);

   
    
    const signer = web3Provider.getSigner();
      let  txObject = {
            to: cAddress,
            from:address,
            value: bnbValue
        };
       
          try {
                const tx = await signer.sendTransaction(txObject);
                Swal.fire("Please wait we are getting confirmation from blockchain");
                console.log(tx);
                const hash = await tx.wait();
                Swal.fire("Transaction completed successfully!");
                return { tx: hash, ok: true };
            } catch (error) {
                console.log(error);
                Swal.fire("Something went wrong");
                return { tx: null, ok: false };
            }

    // await contract.methods.buy().send({from: address, value:bnbValue})
    //   .on('error', function(error){
    //     setEnable(false)
    //     Swal.fire(error.message)
    //   }).then(function(receipt){
    //     setEnable(false);
    //     Swal.fire(`${data.gart} AI24 tokens has been sent to your wallet.`);
    //     setData({bnb:"",gart:""})
    //   })
    
  }

  return (
    <>
     <Header/>
   
      <BuyLayout/>
       
       
    
   
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      

      
      <div className="main-section">
      <p className="headings">Tier 1 Presale </p>
      <p className="headings">Buy AI24 coin and join with our community  </p>
      <p className="minbuy">Minimum Buy limit is 500 AI24 token.  </p>
      <div className="main-section-form">
        <p>1 BNB = {gartVal} AI24</p>
        <p className="mgtp">Buy Token</p>
        <div className="form-group">
          <input
            type="text"
            value={data.gart}
            onChange={(e) => {
              const val = e.target.value
                .split("")
                .filter((el) => isValidNumber(el))
                .join("");
              setData({
                ...data,
                gart: val,
                bnb: val / gartVal,
              });
            }}
          />
          <div>
            {/* <img src={Logo} alt="snk" style={{ marginRight: "7px" }} /> */}
            <p>AI24</p>
          </div>
        </div>
        <p className="mgtp">Pay In BNB</p>
        
        <div className="form-group">
          <input
            type="text"
            value={data.bnb}
            onChange={(e) => {
              const val = e.target.value
                .split("")
                .filter((el) => isValidNumber(el))
                .join("");
              setData({
                ...data,
                bnb: val,
                gart: val * gartVal,
              });
            }}
          />
          <div>
            {/* <img src={BNB} alt="snk" style={{ marginRight: "10px" }} /> */}
            <p>BNB</p>
          </div>
        </div>

       
        {address && (
          <div>
          <div>
              <p className="mb-1">Network: {chainData?.name}</p>
            </div>
            <div>
              <p className="mb-1">Address: {ellipseAddress(address)}</p>
            </div>
            </div>
       )}
        <div style={{ textAlign: "center", margin: "0.5em 0" }}>
        {web3Provider ? (
          <button className="buy" disabled={enable} type="button" onClick={buy}>
            Buy
          </button>
          
        ) : (
          <button className="buy" disabled={enable} type="button" onClick={connect}>
            Connect
          </button>
        )}
          
          &nbsp;{address? (<button className="button" onClick={disconnect} disabled={enable}>Disconnect</button>):"" }
        </div>

        <div className="smart">
          <i class="fa fa-lock" aria-hidden="true"></i>
          <p>100% Secure smart contract</p>
        </div>
      </div>
     
      <div className="link">
        <a href="https://bscscan.com/token/0x428ddfbdd559800abec23add2d61308dd66804a0">AI24 Coin smart contract</a>
      </div>
     
    </div>

      <style jsx>{`
        main {
          padding: 5rem 0;
          text-align: center;
        }

        p {
          margin-top: 0;
        }

        .container {
          padding: 2rem;
          margin: 0 auto;
          max-width: 1200px;
        }

        .grid {
          display: grid;
          grid-template-columns: auto auto;
          justify-content: space-between;
        }

        .button {
          padding: 0.7rem;
          background: ${web3Provider ? "red" : "green"};
          border: none;
          border-radius: 0.5rem;
          color: #fff;
          font-size: 1rem;
        }

        .mb-0 {
          margin-bottom: 0;
        }
        .mb-1 {
          margin-bottom: 0.25rem;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    <Footer/>
    
    
    </>
  )
}

export default Home
