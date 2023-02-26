import { configureStore, createSlice } from '@reduxjs/toolkit';
import { getApi } from './service';
import { setupListeners } from '@reduxjs/toolkit/query'

// const initialState: any = {
//   data: []
// }

// const api = createSlice({
//   name: "api",
//   initialState,
//   reducers: {
//     get: (state = initialState, action) => {

//       return state;
//     }
//   }
// });

// const store = configureStore({
//   reducer: api.reducer
// })
const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [getApi.reducerPath]: getApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getApi.middleware),
})

// export const wrapper = createWrapper(makeStore);
setupListeners(store.dispatch)
// export const { get } = api.actions
export default store;