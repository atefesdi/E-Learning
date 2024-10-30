// store/types.ts

// Define the structure of each content item
export interface ContentItem {
  type: "text" | "video" | "audio" | "podcast" // Possible content types
  data: string // URL or text data
}

// Define the structure of each lesson
export interface Lesson {
  title: string // Lesson title
  description: string // Lesson description
  topics: string[] // List of topics covered in the lesson
  content: ContentItem[] // Content items for the lesson
}

// Define the structure of each module
export interface Module {
  title: string // Module title
  lessons: Lesson[] // Lessons included in the module
}

// Define the structure of each course
export interface Course {
  id: number // Unique course identifier
  title: string // Course title
  description: string // Course description
  modules: Module[] // Modules included in the course
}
