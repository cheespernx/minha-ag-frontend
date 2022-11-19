import React, { useState, createContext, useContext, useEffect } from 'react'
import { api } from '../services/api'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

import { IUser } from '../interfaces/user'

export interface FormInterface {
  email: string;
  password: string;
}

interface UseAuthInterface {
  token: void
  setToken: (userToken: string) => void
  user: IUser | undefined
  setUser: (user: IUser) => void
  logOut: () => void
  getUser: () => IUser
  signIn: (form: FormInterface, navigateTo?: string) => Promise<any>
}

export const AuthContext = createContext<UseAuthInterface>(
  {} as UseAuthInterface,
)

interface OwnProps {
  children?: React.ReactNode
}

export const AuthProvider: React.FC<OwnProps> = ({ children }): JSX.Element => {
  const [token, setToken]: any = useState('')
  const [user, setUser] = useState<IUser>()
  const router = useRouter()
  useEffect(() => {
    const { ['@ag:accessToken']: accessToken } = parseCookies()
    setToken(accessToken)
  }, [token])

  const getUser = () => {
    const { ['@ag:user']: user } = parseCookies()

    if (user) {
      return JSON.parse(user)
    }

    return undefined
  }

  const saveToken = async (userToken: string) => {
    await setCookie(null, '@ag:accessToken', userToken, {
      maxAge: 30 * 24 * 60 * 60, // 1 month
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      path: '/',
    })
    api.defaults.headers['Authorization'] = `Bearer ${userToken}`
    await setToken(userToken)
  }

  const saveUser = (user: IUser) => {
    destroyCookie(null, '@ag:user')
    setCookie(null, '@ag:user', JSON.stringify(user), {
      maxAge: 30 * 24 * 60 * 60,
      secure: process.env.NODE_ENV === 'production',
      sameSite: true,
      path: '/',
    })

    setUser(user)
  }

  const logOut = async () => {
    destroyCookie(null, '@ag:accessToken', { path: '/' })
    destroyCookie(null, '@ag:user', { path: '/' })

    router.replace('/logout')
  }

  const signIn = async (form: FormInterface, navigateTo?: string) => {
    try {
      const response = await api.post('auth/login', form)

      if (!response) return

      const {
        data: { accessToken, user },
      } = response

      await saveToken(accessToken)
      await saveUser(user)

      const { ['@ag:sessionId']: sessionId } = parseCookies()

      if (sessionId) destroyCookie(null, '@ag:sessionId', { path: '/' })

      await router.push(navigateTo || '/dashboard')

      return response
    } catch (e: any) {
      return e.response
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: saveToken,
        user,
        setUser: saveUser,
        getUser,
        logOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): UseAuthInterface => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado com o AuthProvider')
  }

  return context
}

export const withPageAuth = (inner: (arg0: any) => any) => {
  return async (context: any): Promise<any> => {
    const { ['@ag:accessToken']: accessToken } = parseCookies(context)

    const REDIRECT_URI =
      context.resolvedUrl != '/' ? '?redirect=' + context.resolvedUrl : ''

    if (!accessToken) {
      context.res.writeHead(307, {
        location: '/' + REDIRECT_URI,
      })
      context.res.end()
      return {
        props: {},
      }
    }
    return inner ? inner(context) : { props: {} }
  }
}
