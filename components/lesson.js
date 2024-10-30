export default function Lesson({ detail }) {
  const { title, lessons } = detail

  return (
    <div>
      <h1>{title}</h1>
      {lessons.map((lesson, index) => (
        <div key={index}>
          <h2>{lesson.title}</h2>
          <p>{lesson.description}</p>
          <h4>{lesson.topics}</h4>
          {lesson.content.map((content, index) => (
            <div key={index}>
              {content.type === "text" ? (
                <p>{content.data}</p>
              ) : (
                <video controls width="600">
                  <source src={content.data} type="video/mp4" />
                </video>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
