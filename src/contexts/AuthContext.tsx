import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import { api } from "../services/apiClient";

type SignInCredentials = {
  email: string;
  password: string;
}

type User = {
  email: string,
  permissions: string[],
  roles: string[],
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
  loginError: string
};

type AuthProviderProps = {
  children: ReactNode;
  error?: string;
}

export const AuthContext = createContext({} as AuthContextData)

let loginError = ''
let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'nextauth.token')
  destroyCookie(undefined, 'nextauth.refreshToken')
  authChannel.postMessage('signOut');
  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')
    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          // destroyCookie(undefined, 'nextauth.token')
          // destroyCookie(undefined, 'nextauth.refreshToken')
          Router.push('/');
          break;
        case 'signIn':
          Router.push('/dashboard');
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()
    if (token) {
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data
        setUser({ email, permissions, roles })
      })
        .catch(() => {
          signOut();
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })
      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setUser({
        email,
        permissions,
        roles,
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      Router.push('/dashboard')
      await new Promise(resolve => setTimeout(resolve, 2000));
      authChannel.postMessage('signIn')

    } catch (err) {
      loginError = "E-mail ou senha incorretos"
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, loginError }}>
      {children}
    </AuthContext.Provider>
  )
}