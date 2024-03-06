import { useAppSelector } from "@/app/hook"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router"
import { toast } from "sonner"

export function RequireAuth() {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      // Should navigate to where they were before
      navigate(-1)
      toast.error("You need to have an account to access the requested page")
    }
  }, [isAuthenticated])

  return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>
}
