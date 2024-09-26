"use client"
import './globals.css'
import 'aos/dist/aos.css';
import "animate.css";
import AOS from "aos"
import { useEffect } from 'react';
import { Toaster } from 'sonner';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(()=>{
    AOS.init()
  },[])
  return (
    <html className='w-full h-screen overflow-hidden' lang="en">
        <body className="w-full bg-white flex items-center justify-center h-full">{children}
          <Toaster richColors/>
        </body>
    </html>
  )
}
