import { Outlet } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/app/hook"
import { getUser, verifyToken } from "@/app/services/features/authActions"
import { useEffect } from "react"

export function Root() {
  const dispatch = useAppDispatch()
  const { isAuthenticated, isVerified } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (localStorage.getItem("access") || isAuthenticated) {
      dispatch(verifyToken(localStorage.getItem("access") ?? ""))
    }
    if (isVerified) {
      dispatch(getUser(localStorage.getItem("access") ?? ""))
    }
  }, [dispatch, isAuthenticated, isVerified])

  return (
    <>
      <Outlet />
    </>
  )
}
