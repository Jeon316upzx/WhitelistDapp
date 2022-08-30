import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

interface LayoutI {
    children: React.ReactNode
}

const Layout = ({children}:LayoutI)=>{
    return (
      <div className='bg-pink-200'>
        <Navbar/>
         {children}
        <Footer/>
      </div>
    )
}
export default Layout;