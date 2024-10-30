import Link from "next/link"
import Image from "next/image"
import NavLink from "./nav-link"

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={50} height={35} />
          <Image src="/name.svg" alt="Logo" width={100} height={35} />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/home">Home</NavLink>
          </li>
          <li>
            <NavLink href="/courses">Courses</NavLink>
          </li>
          <li>
            <NavLink href="/blog">Blog</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}
