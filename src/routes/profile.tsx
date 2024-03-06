import { useAppSelector } from "@/app/hook"
import type { user } from "@/app/services/authSlice"
import { AuthorAvatar } from "@/components/blog-post/AuthorAvatar"
import { MyPosts } from "@/components/profile/MyPostsTab"
import { Button } from "@/components/ui/button"
import type { Blog } from "@/interfaces/blog"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { stat } from "fs"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

enum ProfilePageTabs {
  MyPosts = "My Blog Posts",
  Actions = "Actions",
  ProfileInfo = "Profile Info",
}

export function Profile() {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth)
  const { user } = useAppSelector(state => state.auth)
  const [activeTab, setActiveTab] = useState(ProfilePageTabs.MyPosts)

  function changeTab(tab: ProfilePageTabs) {
    setActiveTab(tab)
  }

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
        {user ? (
          <div className="flex gap-16 items-center">
            <div className="flex gap-4 items-center">
              <AuthorAvatar
                src=""
                authorName={`${user?.first_name} ${user?.last_name}`}
                className="h-[100px] w-[100px]"
              />
              <div>
                <h2 className="text-3xl">{user?.username}</h2>
                <small className="light text-sm text-gray-500">
                  {`@${user?.username}`}
                </small>
              </div>
            </div>
            <div>
              <div className="text-lg font-bold text-center">
                {user?.followers}
              </div>
              <div>Followers</div>
            </div>
            <div>
              <div className="text-lg font-bold text-center">
                {user?.following}
              </div>
              <div>Following</div>
            </div>
          </div>
        ) : (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
        <div className="mt-8">
          <div className="flex gap-4 overflow-x-auto p-2 font-light">
            <TabActivator
              tab={ProfilePageTabs.MyPosts}
              currentTab={activeTab}
              onChangeTab={changeTab}
            />
            <TabActivator
              tab={ProfilePageTabs.ProfileInfo}
              currentTab={activeTab}
              onChangeTab={changeTab}
            />
            <TabActivator
              tab={ProfilePageTabs.Actions}
              currentTab={activeTab}
              onChangeTab={changeTab}
            />
          </div>
          <div className="my-4 bg-slate-50 min-h-[400px]">
            <ActiveTabContent currentTab={activeTab} blogs={[]} user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}

type TabActivatorProps = {
  tab: ProfilePageTabs
  currentTab: ProfilePageTabs
  onChangeTab: (tab: ProfilePageTabs) => void
}

function TabActivator({ tab, currentTab, onChangeTab }: TabActivatorProps) {
  return (
    <Button
      variant={"ghost"}
      className={cn(currentTab === tab && "font-bold border-b-4 border-black")}
      onClick={() => onChangeTab(tab)}
    >
      {tab.valueOf()}
    </Button>
  )
}

type CurrentTabProps = {
  currentTab: ProfilePageTabs
  blogs: Blog[]
  user: user | undefined | null
}

function ActiveTabContent({ currentTab, blogs, user }: CurrentTabProps) {
  if (currentTab === ProfilePageTabs.MyPosts) {
    return <MyPosts blogs={blogs} />
  }
  if (currentTab === ProfilePageTabs.Actions) {
    return <div>Actions</div>
  } else {
    return (
      <div className="flex items-center justify-center h-full">
        {user && (
          <>
            <p className="text-3xl italic">Coming soon</p>
          </>
        )}
      </div>
    )
  }
}
