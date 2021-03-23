import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";

import '../../styles/globals.css'


const App = ({ Component, pageProps }) => {
  const queryClient = new QueryClient()

  return (
     <> 
     <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools />
     </QueryClientProvider>
    </>

  )
}

export default App
