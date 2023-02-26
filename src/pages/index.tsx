import { Inter } from 'next/font/google'
import { useGetApiListQuery } from './service'
import _ from 'lodash'
import Pagination from './component/pagination'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [paginate, setPaginate] = useState({
    start: 0,
    limit: 10
  })
  const { data, error, isLoading } = useGetApiListQuery({ start: paginate.start, limit: paginate.limit })
  console.log(data, isLoading)
  return (
    <div className='w-full h-screen'>
      <header className='text-center text-4xl mb-5'>Skill Test Next JS</header>
      <main className='max-w-[1280px] m-auto flex flex-col justify-between'>
        <div className='flex flex-wrap w-full gap-4 justify-center'>
          {
            !isLoading && _.map(data, (index: any, key: number) => (
              <div key={key} className=' w-60 p-5 min-h-[2rem] gap-4 shadow-lg flex flex-col justify-between'>
                <div>
                  <p>{index.idUser}</p>
                  <p>{index.title}</p>
                </div>
                <div>{index.completed && (
                  <p className='text-green-700'>Completed</p>
                )}
                </div>
              </div>
            ))
          }

        </div>
        <div className='flex justify-center w-full'>
          <Pagination
            paginate={paginate}
            setPaginate={setPaginate}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  )
}
