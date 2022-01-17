import '../styles/Globals.scss'
import { AuthFirebaseProvider } from '../contexts/AuthFirebaseContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthFirebaseProvider>
      <Component {...pageProps} />
    </AuthFirebaseProvider>
  )
}

export default MyApp
