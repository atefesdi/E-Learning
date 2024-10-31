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
