import { useAppSelector } from "@/app/hook"
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
import { useSignUp } from "@/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {
  SignUpFormSchema,
  SignUpFormValidator,
} from "@/lib/validators/form-schema"
import { AuthFormLayout } from "@/components/forms/AuthFormLayout"

// TODO: Store the layout that this shares with the sign-in page
//       and use that as a root layout for both to reduce duplication
export function SignUp() {
  return (
    <AuthFormLayout isSignUp={true}>
      <SignUpForm />
    </AuthFormLayout>
  )
}

function SignUpForm() {
  const form = useForm<SignUpFormValidator>({
    resolver: zodResolver(SignUpFormSchema),
  })
  const { signUpUser } = useSignUp()

  const user = useAppSelector(state => state.auth.user)

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  function togglePasswordVisibility() {
    setShowPassword(prevState => !prevState)
  }

  function onSubmit(formValues: SignUpFormValidator) {
    console.log(formValues)
    signUpUser(formValues)
  }

  useEffect(() => {
    if (user) navigate("/sign-in")
  }, [user, navigate])

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
                  <Input
                    placeholder="kimani.mwendwa@students.jkuat.ac.ke"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="Kimani" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Mwendwa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="awesomeuser" {...field} />
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
                    type="password"
                    placeholder="nic#e*a45nd@se   c?UR )"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="re_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="nic#e*a45nd@se   c?UR )"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Sign up</Button>
        </div>
      </form>
    </Form>
  )
}
