import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
// import store from './store'
import { useStore } from './store'

export default function App({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState)

  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
