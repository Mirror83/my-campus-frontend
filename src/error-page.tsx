import { Link, useRouteError } from "react-router-dom"

export function ErrorPage() {
  const error: any = useRouteError()
  console.error(error)

  return (
    <div
      id={"error-page"}
      className={"flex justify-center flex-wrap items-center min-h-screen"}
    >
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-5">
          Oops!
        </h1>
        <p>Something has gone wrong</p>
        <p className={"mb-5"}>
          <i>
            {error.status}. {error.statusText || error.message}
          </i>
        </p>
        <Link to={"/"}>Back Home</Link>
      </div>
    </div>
  )
}
