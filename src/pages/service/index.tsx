import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from '@types'

export interface Get {
    // userId: number
    // id: number
    // title: number
    // completed: boolean
    start: number
    limit: number
    data: any[]
}

// Define a service using a base URL and expected endpoints
export const getApi = createApi({
    reducerPath: 'getApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/todos' }),
    endpoints: (builder) => ({
        getApiList: builder.query<Get, any>({
            // query: (name) => `get/${name}`,
            query: (params:any) => `?_start=${params?.start}&_limit=${params?.limit}`,
        }),
    }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetApiListQuery } = getApi