import { configureStore } from "@reduxjs/toolkit"
import coursesReducer from "./courses/coursesSlice"

// Define the root state type
export type RootState = {
  courses: ReturnType<typeof coursesReducer>
}

// Create the store with its types
const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
})

export type AppDispatch = typeof store.dispatch

// Export the store
export default store
