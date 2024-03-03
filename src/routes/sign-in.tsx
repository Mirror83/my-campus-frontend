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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }),
  password: z.string().min(8, {
    message: "Username must be at least 8 characters long",
  }),
})

// Styles that can be placed on the black box div to insert an image.
// Too bad the image I chose does not blend with the colours currently present
// Credit: Photo by <a href="https://unsplash.com/@von_co?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ivana Cajina</a> on <a href="https://unsplash.com/photos/smiling-woman-wearing-gray-hoodie-dnL6ZIpht2s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
// const possibleBgImage = {
//   backgroundImage: "url(images/ivana-cajina-dnL6ZIpht2s-unsplash.jpg)",
//   backgroundRepeat: "no-repeat",
//   backgroundSize: "cover"
// }

export function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const navigate = useNavigate()

  function onSubmit(formValues: z.infer<typeof formSchema>) {
    console.log(formValues)
    // Sign-in logic will be carried out by React Router action for this page
    // Will have to use submit instead of navigate
    navigate("/")
  }

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
                            placeholder="nic#e*a45nd@se   c?UR )"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button>Sign in</Button>
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
