import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../hooks/useAuth'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Minha Aposta Ganha</title>
      </Head>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
