import GraduationCapIcon from "@/components/home/GraduationCapIcon"
import { Loader2 } from "lucide-react"
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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useSignIn } from "@/hooks"
import { toast } from "sonner"
import { useAppSelector } from "@/app/hook"
import { useEffect } from "react"

const formSchema = z.object({
  email: z.string().email().trim(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
})

export function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  const { signInUser, isLoading } = useSignIn()
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  function onSubmit(formValues: z.infer<typeof formSchema>) {
    console.log(formValues)
    signInUser(formValues)
  }

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/")
      toast.success("You have successfully signed in.")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className={"grid h-[100vh] grid-cols-[2fr_3fr]"}>
      <div className="bg-black"></div>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>
              <div className="flex gap-1 items-center text-2xl">
                <GraduationCapIcon />
                <h1>My Campus</h1>
              </div>
            </CardTitle>
            <CardDescription className="text-xl">Welcome back</CardDescription>
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
          </CardContent>
          <CardFooter>
            <p className="text-light text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/sign-up" className="underline text-gray-600">
                Sign up
              </Link>{" "}
              for free.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
