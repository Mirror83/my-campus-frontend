import { AuthorAvatar } from "../blog-post/AuthorAvatar"
import GraduationCapIcon from "./GraduationCapIcon"
import { Link } from "react-router-dom"

interface NavBarProps {
  className?: string
  // Include user type
}

// TODO: Make aware of the current user
// TODO: Add search bar
export function NavBar() {
  return (
    <div className="flex items-center w-full justify-between px-6 py-4 bg-slate-50">
      <div className="flex gap-2 items-center">
        <GraduationCapIcon />
        <span className="text-xl font-bold">My Campus</span>
      </div>
      <div className="flex items-center">
        <nav className="me-8">
          <ul className="flex gap-4 underline">
            <li>
              <Link to={`#`}>Sign up</Link>
            </li>
            <li>
              <Link to={`sign-in`}>Sign in</Link>
            </li>
            <li>
              <Link to={`#`}>About us</Link>
            </li>
          </ul>
        </nav>
        <AuthorAvatar src={""} authorName={"Bob Marley Junior"} />
      </div>
    </div>
  )
}
