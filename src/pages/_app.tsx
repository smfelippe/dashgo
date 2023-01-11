import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'

import { QueryClientProvider } from 'react-query'
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext'
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
