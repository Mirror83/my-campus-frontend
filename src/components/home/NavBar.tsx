import { AuthorAvatar } from "../blog-post/AuthorAvatar"
import GraduationCapIcon from "./GraduationCapIcon"
import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "@/app/hook"
import type { user } from "@/app/services/authSlice"
import { logout } from "@/app/services/authSlice"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavBarProps {
  className?: string
}

// TODO: Add search bar
export function NavBar({ className }: NavBarProps) {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, isLoading } = useAppSelector(
    state => state.auth,
  )

  const handleLogout = () => {
    dispatch(logout())
  }

  const GuestLinks = () => (
    <>
      <li>
        <Button variant={"link"} className="text-white">
          <Link to={`/sign-up`}>Sign up</Link>
        </Button>
      </li>
      <li>
        <Button variant={"link"} className="text-white">
          <Link to={`/sign-in`}>Sign in</Link>
        </Button>
      </li>
    </>
  )

  const AuthLinks = () => (
    <>
      <li>
        <Button className="text-white" variant={"link"} onClick={handleLogout}>
          Sign Out
        </Button>
      </li>
    </>
  )

  return (
    <div
      className={cn(
        className,
        "flex items-center w-full justify-between px-8 py-4 shadow-md bg-[#242748] text-white",
      )}
    >
      <div>
        <Link to="/" className="flex gap-2 items-center">
          <GraduationCapIcon color="white" />
          <span className="text-xl font-bold">My Campus</span>
        </Link>
      </div>
      <div className="flex items-center">
        <nav className="me-8">
          <ul className="flex gap-2">
            {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
            <li>
              <Button variant={"link"} className="text-white">
                <Link to={`#`}>About us</Link>
              </Button>
            </li>
          </ul>
        </nav>
        {user &&
          (isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserDropDown user={user} />
          ))}
      </div>
    </div>
  )
}

type Props = {
  user: user
}
export function UserDropDown({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <AuthorAvatar
          className="bg-white text-black"
          src={""}
          authorName={`${user.first_name} ${user.last_name}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{`Hi ${user.first_name}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={"/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to={"/write-blog"}>Write</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
