import Image from "next/image"
import styles from "./page.module.css"
import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      <section className={styles.sectionOne}>
        <h1 className={styles.headerStyle}>
          The all-in-one learning solution to supercharge your business.
        </h1>
        <p>
          A.I. tools that empower your business to create and deliver
          hyper-personalised, professional grade courses in minutes.
        </p>
        <Image src="/Cover image.webp" width={500} height={300} alt="Picture" />
        <p>
          From slow, costly, one-size-fits all training to AI-powered
          personalised learning at scale.
        </p>
        <Link href="/courses" className={styles.button}>
          Brows Courses
        </Link>
      </section>
    </div>
  )
}
