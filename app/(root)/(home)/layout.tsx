import Navbar from '@/components/shared/Navbar'
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default Layout