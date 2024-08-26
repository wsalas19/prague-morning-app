import type { Metadata } from 'next'
import { Source_Sans_3 } from 'next/font/google'
import '@/lib/styles/globals.scss'
import Header from "@/app/header";
import Footer from "@/app/footer";


const mainFont = Source_Sans_3({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prague morning jobs',
  description: 'Generated by create next app',
}

export default function JobLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <>
    <Header />
    
    {children}
    </>
  )
}
