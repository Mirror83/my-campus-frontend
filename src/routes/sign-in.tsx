import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { useSignIn } from "@/hooks"
import { toast } from "sonner"
import { useAppSelector } from "@/app/hook"
import { useEffect, useState } from "react"
import {
  SignInFormSchema,
  SignInFormValidator,
} from "@/lib/validators/form-schema"
import { AuthFormLayout } from "@/components/forms/AuthFormLayout"
import { ShowPassword } from "@/components/forms/ShowPassword"

export function SignIn() {
  return (
    <AuthFormLayout isSignUp={false} imageUrl="/images/signin-image.png">
      <SignInForm />
    </AuthFormLayout>
  )
}

function SignInForm() {
  const form = useForm<SignInFormValidator>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  function togglePasswordVisibility() {
    setShowPassword(prevState => !prevState)
  }

  const navigate = useNavigate()

  const { signInUser, isLoading } = useSignIn()
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  function onSubmit(formValues: SignInFormValidator) {
    console.log(formValues)
    signInUser(formValues)
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
      toast.success("You have successfully signed in.")
    }
  }, [isAuthenticated, navigate])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[500px]">
        <div className="flex flex-col gap-2 mb-4 px-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mycampus" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="nic#e*a45nd@se   c?UR )"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ShowPassword
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />
        </div>
        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button>Sign in</Button>
        )}
      </form>
    </Form>
  )
}
