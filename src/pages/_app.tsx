import React from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import type { AppProps } from "next/app";
import '../styles/app.css'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const [initialized, setInitialized] = React.useState<boolean>(false)
  React.useEffect(() => {
    setInitialized(true)
  }, [])
  return(
    <div className="layout_container">
      {
        initialized &&
        <SessionProvider>
          <Sidebar />
          <Component {...pageProps} />
        </SessionProvider>
      }
    </div>
  )
}
