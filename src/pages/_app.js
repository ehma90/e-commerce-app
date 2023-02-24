import '@/styles/globals.css'
import { StoreProvider } from '../utilities/Store'

export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
