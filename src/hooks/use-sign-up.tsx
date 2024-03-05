import { useAppDispatch, useAppSelector } from "@/app/hook"
import { signUp } from "@/app/services/features/authActions"
import type { FormUser } from "@/routes/sign-up"
import { toast } from "sonner"

export default function useSignUp() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  function signUpUser(data: FormUser) {
    dispatch(signUp(data))
  }

  if (error) {
    toast.error(error)
  }

  return { signUpUser, isLoading }
}
