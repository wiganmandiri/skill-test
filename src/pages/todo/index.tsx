import _ from 'lodash'
import { getApi, useGetApiListQuery, usePostTodosMutation } from '../service'
import Pagination from '../component/pagination'
import { useEffect, useState } from 'react'
import { initializeStore, removeUndefined } from "../store"
import { useSelector } from "react-redux"
import Layout from '../component/layout'
import Modal from '../component/modal'

const users = [
  { label: 'Users 1', value: 1 },
  { label: 'Users 2', value: 2 }
]

export default function TodoPage(props: any) {
  const [isOpen, setIsOpen] = useState(false)
  const [paginate, setPaginate] = useState({
    start: 0,
    limit: 10,
    status: false
  })

  const [addTodo, response] = usePostTodosMutation()


  const { data: currentData, isLoading } = useGetApiListQuery({ start: paginate?.start, limit: paginate?.limit }, { skip: !paginate?.status })
  const data = !paginate?.status ? props?.dataList : currentData

  console.log("response", isLoading)

  let defaultForm = {
    title: '',
    userId: 1
  }
  let [formValue, setFormValue] = useState(defaultForm)

  useEffect(() => {
    if (!isOpen) setFormValue(defaultForm)
  }, [isOpen])

  const onChange = (e: any) => {
    setFormValue(prevstate => ({
      ...prevstate,
      [e.target.name]: e.target.name !== 'userId' ? e.target.value : Number(e.target.value)
    }))
  }

  const onSubmit = () => {
    addTodo(formValue)
      .unwrap()
      .then(() => {
        setIsOpen(false)
      })
      .then((error) => {
        console.log(error)
      })
  }

  return (
    <Layout>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} >
        <div className='bg-white p-5 rounded'>
          <header className='text-xl font-semibold text-center'>Add Todos</header>
          <main>
            <div className='my-10'>
              <form className='flex flex-col space-y-3 w-full'>
                <div className='flex'>
                  <label className='w-2/4'>Select Users</label>
                  <select className='w-full border p-1 bg-white'
                    name="userId"
                    // value={formValue?.idUsers}
                    onChange={(e) => onChange(e)}
                  >
                    <option value={1}>Users 1</option>
                    <option value={2}>Users 2</option>
                  </select>
                </div>
                <div className='flex'>
                  <label className='w-2/4'>Title</label>
                  <input className='border p-1 w-full '
                    name="title"
                    type="text"
                    value={formValue?.title}
                    onChange={(e) => onChange(e)} placeholder={"title"}
                  />
                </div>
              </form>
            </div>
            <div className='flex justify-end'>
              <button disabled={response?.isLoading} className={`px-4 py-1 rounded-sm text-white ${response?.isLoading ? 'bg-purple-500' : 'bg-purple-700'}`} onClick={() => onSubmit()}>Submit</button>
            </div>
          </main>
        </div>
      </Modal>
      <div className='flex flex-col w-max-[1000px] m-auto gap-4 justify-center'>
        <div className='flex justify-between w-full'>
          <button onClick={() => setIsOpen(true)} className='px-4 py-2 bg-slate-300 w-fit my-auto rounded-sm'>Add</button>
          <Pagination
            paginate={paginate}
            setPaginate={setPaginate}
            isLoading={false}
          />
        </div>
        <div className='flex flex-wrap justify-center gap-2'>
          {isLoading ?
            _.map([0, 1, 2, 3, 4, 5, 6, 7], (index: any, key: number) => (
              <div key={key} className=' w-60 h-40 p-5 min-h-[2rem] gap-4 shadow-lg flex flex-col justify-between'></div>
            ))
            :
            _.map(data, (index: any, key: number) => (
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
            ))}
        </div>
      </div>
    </Layout>
  )
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  // const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
  // const data = await res.json()

  const store = initializeStore(0)
  await store.dispatch(getApi.endpoints.getApiList.initiate(0))
  const { data: dataList } = getApi.endpoints.getApiList.select(0)(store.getState())
  // const initialData = dataList.results[]
  // await store.dispatch(getApi.endpoints.getApiList.initiate(initialData))
  // // queryRef.unsubscribe()

  return {
    props: {
      initialReduxState: removeUndefined(store.getState()),
      dataList
    },
  }
}

// export async function getStaticProps() {

//   const store = initializeStore(0)
//   await store.dispatch(getApi.endpoints.getApiList.initiate(0))
//   const { data: dataList } = getApi.endpoints.getApiList.select(0)(store.getState())

//   return {
//     props: {
//       initialReduxState: removeUndefined(store.getState()),
//       dataList
//     },
//     revalidate: 10,
//   }
// }