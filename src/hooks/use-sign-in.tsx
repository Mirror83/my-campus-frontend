import { useAppDispatch, useAppSelector } from "@/app/hook"
import { signIn } from "@/app/services/features/authActions"
import { toast } from "sonner"

export default function useSignIn() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.auth.isLoading)
  const error = useAppSelector(state => state.auth.error)

  function signInUser(data: any) {
    dispatch(signIn(data))

    if (error) {
      toast.error(error)
    }
  }

  return { signInUser, isLoading }
}
