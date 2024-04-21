import { useAppDispatch, useAppSelector } from "@/app/hook"
import { signUp } from "@/app/services/features/authActions"
import type { SignUpFormValidator } from "@/lib/validators/form-schema"
import { toast } from "sonner"
import { useEffect } from "react"

export default function useSignUp() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  function signUpUser(data: SignUpFormValidator) {
    dispatch(signUp(data))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  return { signUpUser, isLoading }
}
