import { configureStore, createSlice } from '@reduxjs/toolkit';
import { getApi } from './service';
import { setupListeners } from '@reduxjs/toolkit/query'
import { useMemo } from "react";

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
let store: any
const initialState = {}

function initStore(preloadedState = initialState) {

  // const store = configureStore({
  return configureStore({
    reducer: {
      [getApi.reducerPath]: getApi.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(getApi.middleware),
  })
}

export const initializeStore = (preloadedState: any): any => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState
    });
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store;
};

export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}

export function removeUndefined(state: any): any {
  if (typeof state === "undefined") return null
  if (Array.isArray(state)) return state.map(removeUndefined)
  if (typeof state === "object" && state !== null) {
    return Object.entries(state).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: removeUndefined(value)
      };
    }, {});
  }

  return state;
}

// setupListeners(store.dispatch)
// export default store;