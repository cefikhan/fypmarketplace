import '../styles/globals.css'
import Navbar from "./components/Navbar.js"
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
  <Navbar/>
      <Component {...pageProps} />
    </div>
  
  )
}

export default MyApp
