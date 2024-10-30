// store/types.ts

export interface ContentItem {
  type: "text" | "video" | "audio" | "podcast"
  data: string
}

export interface Lesson {
  title: string
  description: string
  topics: string[]
  content: ContentItem[]
}

// Define the structure of each module
export interface Module {
  title: string
  lessons: Lesson[]
}

export interface Course {
  id: number
  title: string
  description: string
  modules: Module[]
}
