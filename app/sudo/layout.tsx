"use client"
import { useEffect } from 'react';
import HeaderBar from "./components/HeaderBar";
import NavBar from "./components/NavBar";

export default function SudoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className='w-full h-full overflow-hidden' lang="en">
        <div className="w-full  flex items-center justify-center h-full">
            <NavBar/>
            <main className='w-[87.5%] h-full'>
                <HeaderBar/>
                <section className="mt-2 h-[calc(100vh-60px)] bg-gray-100 w-full">
                {children}  
                </section>
            </main>
        </div>
    </section>
  )
}
