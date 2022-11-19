import React from 'react'
import { destroyCookie } from 'nookies'

const REDIRECT_URI = '/'

const Logout: React.FC = () => {
  return null
}

export default Logout

export async function getServerSideProps(context: any) {
  destroyCookie(context, '@ag:accessToken', { path: '/' })
  destroyCookie(context, '@ag:user', { path: '/' })

  return {
    redirect: {
      destination: REDIRECT_URI,
      permanent: true,
    },
  }
}
