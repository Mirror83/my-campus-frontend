import { Link } from "react-router-dom"

export function Home() {
  return (
    <div className="m-10">
      <div className={"text-5xl mb-4"}>Home</div>
      <p>
        Read our{" "}
        <Link to="/read-blog" className="underline">
          sample blog
        </Link>
      </p>
    </div>
  )
}
