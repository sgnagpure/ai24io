import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Cover from '../components/Cover'
import Link from 'next/link'
import StructuredData from '../components/UserLayout/StructuredData'
import { useRouter } from 'next/router'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'

SwiperCore.use([Autoplay]);

export default function Home() {

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


 

  const router = useRouter();

  const meta = {
    title : "Ai24 - Blockchain-based platform | Buy Ai24 Crypto Coin",
    description :  "Explore and invest in Ai24 crypto coin. Get in touch to know upcoming presale crypto coin prices, also get the latest crypto coin market news.",
    type :"website",
   
  }
  //content = content.settings;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"></link>
        <title>{meta.title}</title>
          <meta name="description" content={meta.description}></meta>
          <link rel="shortcut icon" href="../../logo.png" />
          <meta property="og:url" content={"https://ai24.io/"+router.asPath}></meta>
          <meta property="og:type" content={meta.type}></meta>
          <meta property="og:site_name" content="AI24"></meta>
          <meta property="og:description" content={meta.description}></meta>
          <meta property="og:title" content={meta.title}></meta>

        <meta name="google-site-verification" content="uEOnO-hOq4AVNMAEpW4fAp50xRLi0Mmow0UmYVtQSEs" />
        
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="manifest" href="/icons/site.webmanifest" />
        <link rel="icon" href="/logo.png" />

       
      </Head>
      <Navbar />
      <Cover />
      <StructuredData data={structuredData}/>


      <section className={styles.tokenomicsSection} id="airdrop">
        <h2 className={styles.tokenomicsHeader}>Airdrop</h2>
        <div className={styles.airdrop}>
        {/* <img className={styles.airdropimg} src="/AI24-OFFICIAL-LAUNCHED.png" alt="airdrop" /> */}

        <Swiper
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
>
  <SwiperSlide>
    <a href="https://crew3.xyz/c/ai24coin" target="_blank"><img className={styles.airdropimg} src="/AI24-OFFICIAL-LAUNCHED.png" alt="image 1" /></a>
  </SwiperSlide>
  <SwiperSlide>
  <a href="https://crew3.xyz/c/ai24coin" target="_blank"><img className={styles.airdropimg} src="/OFFICIAL-LAUNCHED-2.png" alt="image 2" /></a>
  </SwiperSlide>
  {/* <SwiperSlide>
    <img className={styles.airdropimg} src="/AI24-OFFICIAL-LAUNCHED.png" alt="image 3" />
  </SwiperSlide> */}
</Swiper>

        </div>

      </section>

      {/* feature-section-------- */}
      <section className={styles.featureSection}>
        <div className={styles.featureBlock}>

          <div className={styles.featureCard}>
            <p className={styles.featureIcon}><i className="las la-cube"></i></p>
            <h4 className={styles.featureHead}>DECENTRALISED SYSTEM</h4>
            <p className={styles.featureText}>
              A technical failure can paralyze all affiliate networks on a centralized platfotrm,
              until the cause is detected and rectified the system.
            </p>
          </div>
          <div className={styles.featureCard}>
            <p className={styles.featureIcon}><i className="las la-shield-alt"></i></p>
            <h4 className={styles.featureHead}>BANKS PAYMENT SYSTEMS</h4>
            <p className={styles.featureText}>
              Up to 45% of a merchant&apos;s budget is spent on commissions charged by a number
              of brokers, including banks, payment systems.
            </p>
          </div>
          <div className={styles.featureCard}>
            <p className={styles.featureIcon}><i className="las la-project-diagram"></i></p>
            <h4 className={styles.featureHead}>CPA NETWORKS</h4>
            <p className={styles.featureText}>
              Affiliate networks have to pay for using existing platforms on a monthly basis or
              spend money on developing proprietary platforms
            </p>
          </div>

        </div>
      </section>
      {/* feature-section-------- */}

      {/* about-section------ */}
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutImageSection}>
          <img src="/about.gif" alt="image" />
        </div>
        <div className={styles.aboutTextSection}>
          <h3 className={styles.aboutHeader}>Meet Future AI24</h3>
          <p className={styles.aboutText}>
            We will strive to make AI24Chain as one of the prominent
            way Blockchain will be used in different areas of business
            and economy as well as social welfare and other major areas
            of technology
          </p>
          <p className={styles.aboutText}><i className="las la-arrow-right"></i>AI24Chain Blockchain</p>
          <p className={styles.aboutText}><i className="las la-arrow-right"></i>Multicurrency Wallet</p>
          <p className={styles.aboutText}><i className="las la-arrow-right"></i>Defi Exchange</p>
        </div>
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutTextSection}>
          <h3 className={styles.aboutHeader}>Vision and Mission</h3>
          <p className={styles.aboutText}>
          </p>
          <p className={styles.aboutText}><i className="las la-lock"></i>
            <h2>Vision</h2>
            Our Coin works to Integrate AI into blockchain for Machine learning methods and data analysis that automates analytical model building to build a secure, useful, & easy-to-use product based on private blockchain. It will include easy cryptocurrency payments integration and even a digital arbitration system.</p>
          <p className={styles.aboutText}><i className="las la-lock"></i>
            <h2>Mission</h2>
            Is to give best products and services to users by exploring all possible frontiers in new technology and innovations, and also being socially responsible to our planet and our societies.</p>
          <p className={styles.aboutText}><i className="las la-lock"></i>
            <h2>Solution</h2>
            Ai24 is striving to bring companies of all sizes into a unified ecosystem through its range of services. By leveraging cloud technologies, advanced automation and analytics, Ai24 facilitates the efficient integration of different production systems into one cohesive unit.
          </p>
        </div>
        <div className={styles.aboutImageSection}>
          <img src="/001.gif" alt="image" />
        </div>
      </section>
      {/* about-section------ */}
      {/* rail-section-- */}
      <section className={styles.railSection}>

        <div className={styles.railColumn}>
          <div className={styles.railCard}>
            <i className="las la-caret-left"></i>
            <div>
              <h3 className={styles.railHead}>HIGH SPEED AND LOW COSTS</h3>
              <p className={styles.railText}>
                Immediate funding without third-parties. Smart contracts autonomously
                perform funding - collect and release payments
              </p>
            </div>
          </div>
          <div className={styles.railCard}>
            <i className="las la-caret-left"></i>
            <div>
              <h3 className={styles.railHead}>FAIR DEALS ONLY</h3>
              <p className={styles.railText}>
                Open-source smart contract ensures fair and transparent deals between merchants and affiliates
              </p>
            </div>
          </div>
          <div className={styles.railCard}>
            <i className="las la-caret-left"></i>
            <div>
              <h3 className={styles.railHead}>PROTECTION FROM HACKING</h3>
              <p className={styles.railText}>
                On a decentralized platform, all user accounts are independent; if one account is hacked, this won&apos;t breach the security of.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.railColumn}>
          <div className={styles.railCard}>
            <i className="las la-caret-left"></i>
            <div>
              <h3 className={styles.railHead}>NO MORE MIDDLE MEN</h3>
              <p className={styles.railText}>
                Transactions are verified by distributed nodes, and anyone can join or leave the network as they please without disrupting the network&apos;s ability to form consensus on transactions.
              </p>
            </div>
          </div>
          <div className={styles.railCard}>
            <i className="las la-caret-left"></i>
            <div>
              <h3 className={styles.railHead}>GLOBAL P2P TRADE FINANCING</h3>
              <p className={styles.railText}>
                The peer-to-peer architecture of blockchain allows all cryptocurrencies to be transferred worldwide, without the need of any middle-man or intermediaries or central server
              </p>
            </div>
          </div>
          <div className={styles.railCard}>
            <i className="las la-caret-left"></i>
            <div>
              <h3 className={styles.railHead}>REAL-TIME DATABASE</h3>
              <p className={styles.railText}>
                Every Transaction and Updates are real time and directly pulled from Smart Contracts lying on Blockchain
              </p>
            </div>
          </div>
        </div>

      </section>
      {/* rail-section-- */}

      {/* tokenomics-section-- */}
      <section className={styles.tokenomicsSection} id="token">
        <h2 className={styles.tokenomicsHeader}>Tokenomics</h2>
        <div className={styles.tokenomicsDetailsHolder}>
          <div className={styles.tokenomicsColumn}>
            <h4 className={styles.tokenDetailHead}>Token Name</h4>
            <p className={styles.tokenDetailText}>AI24 Coin</p>
            <h4 className={styles.tokenDetailHead}>Total Supply</h4>
            <p className={styles.tokenDetailText}>10,000,000,000</p>
          </div>
          <div className={styles.tokenomicsColumn}>
            <h4 className={styles.tokenDetailHead}>Pre- Sale AI24 Supply Launch</h4>
            <p className={styles.tokenDetailText}>10,000,000</p>
            <h4 className={styles.tokenDetailHead}>Presale End</h4>
            <p className={styles.tokenDetailText}>15th March</p>
          </div>
          <div className={styles.tokenomicsColumn}>
            <h4 className={styles.tokenDetailHead}>Pre Sale - 1st Phase</h4>
            <p className={styles.tokenDetailText}>1 BNB = 20,000 AI24</p>
            <h4 className={styles.tokenDetailHead}>Pre Sale - 2nd Phase</h4>
            <p className={styles.tokenDetailText}>1 BNB = 15,000 AI24</p>
          </div>
        </div>

      </section>
      {/* tokenomics-section-- */}

      <section className={styles.chartSection}>
        <div>
          <h3>Tokenomics</h3>
          <img src="/tokenomics-chart.png" alt="chart" />

        </div>
        <div>
          <h3>Fund Allocation</h3>
          <img src="/allocation-chart.png" alt="chart" />
        </div>
      </section>

      {/* roadmap-section---------- */}
      <section className={styles.roadmapSection} id="roadmap">
        <h3>Roadmap</h3>

        <div className={styles.timeline}>
          <div className={[styles.container, styles.left].join(" ")}>
            <div className={styles.date}>Jan 2023</div>
            <i className="icon ri-heart-line"></i>
            <div className={styles.content}>
              <p>
                <ul>
                  <li>Token Launching
                  </li>
                  <li>Presale Launching
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className={[styles.container, styles.right].join(" ")}>
            <div className={styles.date}>Mar 2023</div>
            <i className="icon ri-heart-line"></i>
            <div className={styles.content}>
              <p>
                <ul>
                  <li>ICO Launch For AI24
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className={[styles.container, styles.left].join(" ")}>
            <div className={styles.date}>Apr 2023</div>
            <i className="icon ri-heart-line"></i>
            <div className={styles.content}>
              <p>
                <ul>
                  <li>Staking Platform Launch
                  </li>
                  <li>Staking Plan
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className={[styles.container, styles.right].join(" ")}>
            <div className={styles.date}>May 2023</div>
            <i className="icon ri-heart-line"></i>
            <div className={styles.content}>
              <p>
                <ul>
                  <li>AI Trading Bot Development
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className={[styles.container, styles.left].join(" ")}>
            <div className={styles.date}>June 2023</div>
            <i className="icon ri-heart-line"></i>
            <div className={styles.content}>
              <p>
                <ul>
                  <li>Crypto Payment Gateway
                  </li>
                </ul>
              </p>
            </div>
          </div>
          <div className={[styles.container, styles.right].join(" ")}>
            <div className={styles.date}>July-Dec 2023</div>
            <i className="icon ri-heart-line"></i>
            <div className={styles.content}>
              <p>
                <ul>
                  <li>Own Blockchain
                  </li>
                  <li>Multi Chain System
                  </li>
                  <li>Metaverse with AI system
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* roadmap-section-------- */}


      {/* why-section-- */}
      <section className={styles.whySection}>
        <div className={styles.whyTextSection}>
          <h2 className={styles.whyHeader}>Why choose us?</h2>
          <p className={styles.whyAnswer}>
            AI24 allows users to develop, deploy and manage applications powered by AI, machine learning and blockchain technologies quickly, easily, and cost-effectively.
          </p>
          <div className={styles.whyAnswerPoint}>
            <h3>Trading Bots</h3>
            <p>
              Crypto trading bots self issue orders based on your trading strategy in your crypto trading without your manual intervention.
            </p>
          </div>
          <div className={styles.whyAnswerPoint}>
            <h3>Own Coin</h3>
            <p>
              AI24 works to integrate AI into blockchain technology by providing smart contracts, which are automated agreements that can be executed autonomously.
            </p>
          </div>
          <div className={styles.whyAnswerPoint}>
            <h3>Staking Platform</h3>
            <p>
              Crypto staking is peculiar to proof-of-stake (PoS) networks. It works like a regular interest-bearing account.
            </p>
          </div>
        </div>
        <div className={styles.whyImageSection}>
          <img src="/03.gif" alt="AI24 icon" />
        </div>
      </section>
      {/* why-section-- */}
      {/* team-section------ */}
      <section className={styles.teamSection} id="team">
        <h3 className={styles.teamHeader}>Team</h3>
        <div className={styles.teamBlock}>
          <div className={styles.teamCard}>
            <img src="/1.png" alt="team-member" />
            <h4 className={styles.teamName}>Abhi M </h4>
            <p className={styles.teamDes}>CEO </p>
            <p>
              Entrepreneur with zeal and passion for blockchain and solutions it can bring for the brave new world
            </p>
          </div>
          <div className={styles.teamCard}>
            <img src="/2.png" alt="team-member" />
            <h4 className={styles.teamName}>N Tri </h4>
            <p className={styles.teamDes}>Blockchain Developer </p>
            <p>
              With immense knowledge in blockchain, Web 3 and Web 2  technologies .
            </p>
          </div>
          <div className={styles.teamCard}>
            <img src="/3.png" alt="team-member" />
            <h4 className={styles.teamName}>Aak T </h4>
            <p className={styles.teamDes}>Finance and Market</p>
            <p>
              Creative mind with enthusiastic new view and aproach towards the new blockchain maarket needs.
            </p>
          </div>
        </div>
      </section>
      {/* team-section------ */}
      {/* whitepaper-section------- */}
      <section className={styles.whitepaperSection} id="whitepaper">
        <div className={styles.whitepaperBlock}>
          <div className={styles.whitepaperTextSection}>
            <h2 className={styles.whitepaperHead}>Whitepaper</h2>
            <p className={styles.whitepaperText}>
              AI24 is a Blockchain-based AI or artificial intelligence that is built on top of a blockchain platform, is a form of decentralized AI that is not controlled by any single entity. This type of AI has the potential to revolutionize the way that we think about and use artificial intelligence, as it allows for the creation of intelligent systems that are transparent, secure, and unbiased.
            </p>
          </div>
          <div className={styles.whitepaperActionSection}>
            <Link href="https://ai24-coin-whitepaper.gitbook.io/ai24-coin-white-paper/"><a target="_blank" rel="noreferrer">Read Online</a></Link>

          </div>
        </div>
      </section>
      {/* whitepaper-section------- */}
      <section className={styles.teamSection} id="partners">
        <h3 className={styles.teamHeader}>Partners</h3>
        <div className="boxx"> <img className="boximg" src="/partners/1.png" alt="team-member" /></div>
        <div className="boxx"> <img className="boximg" src="/partners/2.png" alt="team-member" /></div>
        <div className="boxx"> <img className="boximg" src="/partners/3.png" alt="team-member" /></div>
        <div className="boxx"> <img className="boximg" src="/partners/4.png" alt="team-member" /></div>
        <div className="boxx"> <img className="boximg" src="/partners/5.png" alt="team-member" /></div>
        <div className="boxx"> <img className="boximg" src="/partners/6.png" alt="team-member" /></div>
      
    </section>
      {/* contact-section-- */ }
  <section className={styles.contactSection} id="contact">
    <div className={styles.contactSocialSide}>
      <h3 className={styles.contactHeader}>Contact Us</h3>
      <div className={styles.contactSocialBlock}>
        <Link href="mailto:info@ai24.io"><a target="_blank" rel="noreferrer"><i className="las la-envelope"></i>info@ai24.io</a></Link>
        <Link href="https://t.me/ai24coin"><a target="_blank" rel="noreferrer"><i className="lab la-telegram"></i>Telegram</a></Link>
        <Link href="https://twitter.com/ai24coin"><a target="_blank" rel="noreferrer"><i className="lab la-twitter-square"></i>Twitter</a></Link>
        <Link href="https://www.instagram.com/ai24coin/"><a target="_blank" rel="noreferrer"><i className="lab la-instagram"></i>Instagram</a></Link>
        <Link href="https://www.facebook.com/ai24coin/"><a target="_blank" rel="noreferrer"><i className="lab la-facebook"></i>Facebook</a></Link>
      </div>
    </div>
    <div className={styles.contactFormSide}>
      <div className={styles.contactForm}>
        <input type="text" id='name' required autoComplete='off' placeholder='Full Name' />
        <input type="email" id='email' required autoComplete='off' placeholder='Email' />
        <input type="text" id='telegram' required autoComplete='off' placeholder='Telegram' />
        <input type="text" id='message' required autoComplete='off' placeholder='Message' />
        <button className={styles.submitBtn} onClick={submitForm}>Send Message</button>
      </div>
    </div>
  </section>
  {/* contact-section-- */ }

  {/* footer--------- */ }
  <section className={styles.footerSection}>
    <div className={styles.brandFooter}>
      <p className={styles.brandText}>All Rights Reserved </p>
      <p className={styles.heart}><i className="las la-heart"></i></p>
      <p className={styles.brandText}>By</p>
      <p className={styles.brandText}><Link href="https://www.ai24.io"><a target="_blank" rel="noreferrer">AI24</a></Link></p>
    </div>
  </section>
  {/* footer--------- */ }


    </>
  )
}


function submitForm() {
  let name = document.getElementById("name").value;
  let telegram = document.getElementById("telegram").value;
  let email = document.getElementById("email").value;
  let message = document.getElementById("message").value;

  let data = {
    name,
    telegram,
    email,
    message
  }

  fetch('/api/email', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((res) => {
    alert("Application Submitted!");

    document.getElementById("name").value = "";
    document.getElementById("telegram").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";

    console.log('Response received')
    if (res.status === 200) {
      console.log('Response succeeded!')
    }
  })
}