// store/coursesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { Course, Module } from "./types" // Ensure the path is correct

interface CoursesState {
  courses: Course[] // List of courses
  modules: Module[] // List of modules (for when a specific course is selected)
  status: "idle" | "loading" | "succeeded" | "failed" // Loading status
  error: string | null // Error message if any
}

const initialState: CoursesState = {
  courses: [],
  modules: [],
  status: "idle",
  error: null,
}

export const fetchCoursesOrModules = createAsyncThunk<
  Course[] | Module[], // Return type
  number | null, // Argument type
  { rejectValue: string } // ThunkAPI type
>(
  "courses/fetchCoursesOrModules",
  async (courseId = null, { rejectWithValue }) => {
    try {
      const response = await fetch("/data/courses.json")
      if (!response.ok) {
        throw new Error("Failed to fetch courses")
      }
      const courses: Course[] = await response.json()

      if (courseId) {
        const selectedCourse = courses.find((course) => course.id === courseId)

        if (!selectedCourse) {
          return rejectWithValue("Course not found")
        }
        return selectedCourse.modules // Return modules for the selected course
      }
      return courses // Return all courses if no courseId is provided
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "An unknown error occurred"
      )
    }
  }
)

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle" // Reset status to idle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesOrModules.pending, (state) => {
        state.status = "loading" // Set loading status
      })
      .addCase(
        fetchCoursesOrModules.fulfilled,
        (state, action: PayloadAction<Course[] | Module[]>) => {
          state.status = "succeeded"
          console.log("Action Payload:", action.payload)
          if (Array.isArray(action.payload) && action.payload[0]?.id) {
            state.courses = action.payload as Course[]
          } else {
            state.modules = action.payload as Module[]
          }
        }
      )
      .addCase(fetchCoursesOrModules.rejected, (state, action) => {
        state.status = "failed" // Set failed status
        state.error = action.payload ?? "An error occurred"
      })
  },
})

export const { resetStatus } = coursesSlice.actions
export default coursesSlice.reducer
