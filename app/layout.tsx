import { ReactNode } from "react"
import StoreProvider from "./StoreProvider"
import MainHeader from "@/components/main-header"
import "./globals.css"

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div id="page">
            <MainHeader />
            {children}
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
