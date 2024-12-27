import React from 'react'
import HeaderSection from './HeaderSection'
import FooterSection from './FooterSection'

function Layout({ children }) {
    return (
        <>
            <div className="layout-container">
                <HeaderSection />
                <main className="layout-content">{children}</main>
                <FooterSection />
            </div>

        </>
    )
}

export default Layout