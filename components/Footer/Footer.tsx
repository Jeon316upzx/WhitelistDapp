import React from 'react';
import Link from 'next/link';

const Footer = ()=> {
   return (
    <div className='py-4 px-10 flex justify-between items-center bg-black text-white'>
       <span>Whitelist @2022.</span> 
       <span> Made by <Link href={'https://github.com/Jeon316upzx'}> ifeanyi </Link> </span>
    </div>
   )
}

export default Footer;