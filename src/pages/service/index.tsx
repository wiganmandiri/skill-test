import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from '@types'

export interface Get {
  start: number
  limit: number
  data: any[]
}

export interface Post {
  userId: number
  id: number
  title: string
  completed: boolean
}

// Define a service using a base URL and expected endpoints
export const getApi = createApi({
  reducerPath: 'getApi',
  tagTypes: ['Todos'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getApiList: builder.query<Get, any>({
      query: (params: any) => `/todos?_start=${params?.start ?? 0}&_limit=${params?.limit ?? 10}`,
      providesTags: ['Todos'],
    }),
    // postTodos: builder.query<Post, any>({
    postTodos: builder.mutation<Post, Partial<Post>>({
      query: (body: Post) => {
        console.log('arg: ', body)
        return {
          url: '/todos',
          method: 'POST',
          body
        }
      },
      invalidatesTags: ['Todos']
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetApiListQuery, usePostTodosMutation } = getApi