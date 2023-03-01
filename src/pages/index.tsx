import { Inter } from 'next/font/google'
import Layout from './component/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <div className='mt-10 text-xl text-center'>
        Hello this is Home Page
      </div>
    </Layout>
  )
}