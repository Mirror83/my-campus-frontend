import { AuthorAvatar } from "../blog-post/AuthorAvatar"
import GraduationCapIcon from "./GraduationCapIcon"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "@/app/hook"
import { logout } from "@/app/services/authSlice"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

interface NavBarProps {
  className?: string
}

// TODO: Add search bar
export function NavBar({ className }: NavBarProps) {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user } = useAppSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  const GuestLinks = () => (
    <>
      <li>
        <Link to={`sign-up`}>Sign up</Link>
      </li>
      <li>
        <Link to={`sign-in`}>Sign in</Link>
      </li>
    </>
  )

  const AuthLinks = () => (
    <>
      <Button onClick={handleLogout}>Sign Out</Button>
    </>
  )

  return (
    <div
      className={cn(
        className,
        "flex items-center w-full justify-between px-6 py-4 bg-slate-50",
      )}
    >
      <div className="flex gap-2 items-center">
        <GraduationCapIcon />
        <span className="text-xl font-bold">My Campus</span>
      </div>
      <div className="flex items-center">
        <nav className="me-8">
          <ul className="flex gap-4 underline">
            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
            <Button>
              <Link to={`#`}>About us</Link>
            </Button>
          </ul>
        </nav>
        {user && (
          <AuthorAvatar
            src={""}
            authorName={`${user.first_name} ${user.last_name}`}
          />
        )}
      </div>
    </div>
  )
}
