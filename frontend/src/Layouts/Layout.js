import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Routers from '../routers/Routers'
import FloatingChatIcon from '../components/FloatingChatIcon/FloatingChatIcon'

function Layout() {
  return (
    <div>
        <Header/>
        <main>
            <Routers/>
        </main>
        <FloatingChatIcon />
        <Footer/>
    </div>
  )
}

export default Layout
