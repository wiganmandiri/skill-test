import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

const Layout = ({ children }: any) => {
  const router = useRouter()
  return (
    <div className='w-full h-screen'>
      <header className='text-center text-4xl mb-5'>Skill Test Next JS</header>
      <ul className='flex justify-center my-10'>
        <li className='flex gap-4'>
          <Link className={`text-2xl hover:text-blue-700 ${router.pathname == "/" ? "text-blue-700 " : "text-slate-400"}`} href="/">Home</Link>
          <Link className={`text-2xl hover:text-blue-700 ${router.pathname == "/todo" ? "text-blue-700 " : "text-slate-400"}`} href="/todo">Todo</Link>
        </li>
      </ul>
      <main className='max-w-[1280px] m-auto flex flex-col justify-between'>
        {children}
      </main>
    </div>
  )
}

export default Layout