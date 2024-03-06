import { useAppSelector } from "@/app/hook"
import GraduationCapIcon from "@/components/home/GraduationCapIcon"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

// The naming convention used by the server is snake case
// I know, it brings a lot of confusion 😂.
const formSchema = z.object({
  email: z.string().email(),
  // Find a way to make the names into title case (or let the server do it)
  first_name: z.string().min(2, {
    message: "First name should be at least 2 characters long",
  }),
  last_name: z.string().min(2, {
    message: "Last name should be at least 2 characters long",
  }),
  username: z.string().min(2, {
    message: "A username must be at least 2 characters long",
  }),
  password: z.string().min(8, {
    message: "Your password must be at least 8 characters long",
  }),

  re_password: z.string().min(8, {
    message: "Your password must be at least 8 characters long",
  }),
})

export type FormUser = z.infer<typeof formSchema>

// TODO: Store the layout that this shares with the sign-in page
//       and use that as a root layout for both to reduce duplication
export function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  const { signUpUser, isLoading } = useSignUp()
  const user = useAppSelector(state => state.auth.user)
  const navigate = useNavigate()

  function onSubmit(formValues: z.infer<typeof formSchema>) {
    console.log(formValues)
    signUpUser(formValues)
  }

  useEffect(() => {
    if (user) navigate("/sign-in")
  }, [user, navigate])

  return (
    <div className={"grid h-[100vh] grid-cols-[2fr_3fr]"}>
      <div className="bg-black"></div>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-[500px] h-[100vh] overflow-y-auto my-4">
          <CardHeader>
            <CardTitle>
              <div className="flex gap-1 items-center text-2xl">
                <GraduationCapIcon />
                <h1>My Campus</h1>
              </div>
            </CardTitle>
            <CardDescription className="text-xl">
              Create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2 mb-4">
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
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
                </div>
                <Button>Sign up</Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-light text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/sign-in" className="underline text-gray-600">
                Sign in!
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
