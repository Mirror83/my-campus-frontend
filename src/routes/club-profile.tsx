import { AuthorAvatar } from "@/components/blog-post/AuthorAvatar"
import { ClubProfilePosts } from "@/components/club-profile/club-profile-posts"
import { Button } from "@/components/ui/button"
import { Blog } from "@/interfaces/blog"
import { Club } from "@/interfaces/clubs"
import axios from "@/lib/axios"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import {
  Link,
  LoaderFunction,
  LoaderFunctionArgs,
  Outlet,
  useLoaderData,
} from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const club: Club = (await axios.get(`/api/v1/club/${params.clubSlug}`)).data

  const blogs = (await axios.get(`/api/v1/blog/club/${club.slug}`)).data

  return { club, blogs }
}

export function ClubProfile() {
  const { club, blogs } = useLoaderData() as { club: Club; blogs: Blog[] }

  return (
    <div className="p-4">
      <div className="w-full p-4">
        <Link to="/">
          <Button variant={"link"} className="flex gap-2 items-center">
            <ArrowLeftIcon />
            <span className="text-sm">Back Home</span>
          </Button>
        </Link>
      </div>
      <div className="px-8">
        <div className="flex gap-16 items-center">
          <div className="flex gap-4 items-center">
            <AuthorAvatar
              src=""
              authorName={club.club_name}
              className="h-[100px] w-[100px]"
            />
            <div>
              <h2 className="text-3xl">{club.club_name}</h2>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-center">
              {Math.round(Math.random() * 1000)}
            </div>
            <div>Followers</div>
          </div>
          <div>
            <div className="text-lg font-bold text-center">
              {Math.round(Math.random() * 1000)}
            </div>
            <div>Following</div>
          </div>
        </div>
        <p className="my-4 max-w-screen-md">{club.description}</p>

        <div className="mt-8 bg-slate-50">
          <ClubProfilePosts blogs={blogs} />
        </div>
      </div>
    </div>
  )
}
