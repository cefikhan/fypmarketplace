import '../styles/globals.css'
import { wrapper } from '../store/store'
import Navbar from "./components/Navbar.js"
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div style={{position:"sticky"}}>
         <Navbar/>
      </div>
      <Component {...pageProps} />
    </div>
  
  )
}

export default wrapper.withRedux(MyApp)
