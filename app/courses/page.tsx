"use client"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchCoursesOrModules,
  resetStatus,
} from "@/store/courses/coursesSlice"
import NavLink from "@/components/nav-link"
import { RootState } from "@/store/store"
import { AppDispatch } from "@/store/store"

export default function CoursesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { courses, status, error } = useSelector(
    (state: RootState) => state.courses
  )

  useEffect(() => {
    if (status === "idle") {
      const courseId = null
      dispatch(fetchCoursesOrModules(courseId))
    }
  }, [status, dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetStatus())
    }
  }, [dispatch])

  if (status === "loading") return <p>Loading...</p>
  if (status === "failed") return <p>Error: {error}</p>

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <NavLink href={`courses/${course.id}`}>
              <h2>{course.title}</h2>
            </NavLink>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
