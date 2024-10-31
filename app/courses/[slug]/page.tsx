"use client"
import React from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoursesOrModules } from "@/store/courses/coursesSlice"
import Lesson from "@/components/lesson"
import { AppDispatch } from "@/store/store"

interface Params {
  slug: string
}

interface ModulesPageProps {
  params: Promise<Params>
}

interface CourseState {
  modules: any[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

export default function ModulesPage({ params }: ModulesPageProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { modules, status, error } = useSelector(
    (state: { courses: CourseState }) => state.courses
  )

  const { slug } = React.use(params) as Params
  const courseId: number | null = slug ? Number(slug) : null

  useEffect(() => {
    if (status === "idle" && courseId !== null) {
      dispatch(fetchCoursesOrModules(courseId))
    }
  }, [status, dispatch])

  if (status === "loading") return <p>Loading...</p>
  if (status === "failed") return <p>Error: {error}</p>

  return (
    <div>
      <h1>Courses</h1>
      {modules.map((module, index) => (
        <div key={index}>
          <Lesson detail={module} />
        </div>
      ))}
    </div>
  )
}
