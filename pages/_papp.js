import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">World NFT Market</p>
        <div className="flex mt-4"></div>
        <Link href="/">
          <a className="mr-4 text-pink-500">Home</a>
        </Link>
        <Link href="/create-item">
          <a className="mr-6 text-pink-500">Sell NFT</a>
        </Link>
        <Link href="/my-assets">
          <a className="mr-6 text-pink-500">My NFT</a>
        </Link>
        <Link href="/creator-dashboard">
          <a className="mr-6 text-pink-500">Dashboard</a>
        </Link>

        <Link href="/launch-collection">
          <a className="mr-6 text-pink-500">Launch Collection</a>
        </Link>



        <Link href="/view-collection">
          <a className="mr-6 text-pink-500">View Collection</a>
        </Link>

        
        <Link href="/update-collection">
          <a className="mr-6 text-pink-500">Update Collection</a>
        </Link>

             <Link href="/assetson-collection">
          <a className="mr-6 text-pink-500">NFTs in Collection</a>
        </Link>









      </nav> 
      <Component {...pageProps} />
    </div>
  
  )
}

export default MyApp
