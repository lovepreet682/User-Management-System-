import React from 'react'
import HeaderSection from './HeaderSection'
import FooterSection from './FooterSection'

function Layout({ children }) {
    return (
        <>
            <HeaderSection />
            {children}
            <FooterSection />

        </>
    )
}

export default Layout