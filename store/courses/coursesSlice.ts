// store/coursesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { Course, Module } from "./types"

interface CoursesState {
  courses: Course[]
  modules: Module[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: CoursesState = {
  courses: [],
  modules: [],
  status: "idle",
  error: null,
}

export const fetchCoursesOrModules = createAsyncThunk<
  Course[] | Module[],
  number | null,
  { rejectValue: string }
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
        return selectedCourse.modules
      }
      return courses
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
      state.status = "idle"
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesOrModules.pending, (state) => {
        state.status = "loading"
      })
      .addCase(
        fetchCoursesOrModules.fulfilled,
        (state, action: PayloadAction<Course[] | Module[]>) => {
          state.status = "succeeded"

          if (
            Array.isArray(action.payload) &&
            action.payload[0] &&
            "id" in action.payload[0]
          ) {
            state.courses = action.payload as Course[]
          } else {
            state.modules = action.payload as Module[]
          }
        }
      )
      .addCase(fetchCoursesOrModules.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload ?? "An error occurred"
      })
  },
})

export const { resetStatus } = coursesSlice.actions
export default coursesSlice.reducer
