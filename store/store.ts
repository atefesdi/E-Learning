import { configureStore } from "@reduxjs/toolkit"
import coursesReducer from "./courses/coursesSlice"

export type RootState = {
  courses: ReturnType<typeof coursesReducer>
}

const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export default store
