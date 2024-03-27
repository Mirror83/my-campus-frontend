//index.tsx
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { NavBar } from "@/components/home/NavBar"
import { Button } from "@/components/ui/button"
import Editor from "@/components/editor/Editor"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { Topic } from "@/interfaces/topics"
import axios from "@/lib/axios"
import { Badge } from "@/components/ui/badge"
import { Cross1Icon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import { useAppSelector } from "@/app/hook"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router"
import LoadingScreen from "@/components/loading-screen/LoadingScreen"
import { mockTopics } from "@/mock-content/mock-topics"
import { OutputData } from "@editorjs/editorjs"

const topicLimit = 3

export const WriteBlog = () => {
  const { user, isLoading } = useAppSelector(state => state.auth)

  const [editorData, setEditorData] = useState<OutputData>({ blocks: [] })
  const [title, setTitle] = useState("")

  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopics, setSelectedTopics] = useState<Set<Topic>>(new Set())
  const selectedTopicsBadges: React.ReactNode[] = []

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const titleRef = useRef<HTMLTextAreaElement>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (titleRef.current?.textContent?.length === 0) titleRef.current?.focus()
  }, [])

  // useEffect(() => {
  //   if (!(user && isAuthenticated && isVerified)) {
  //     navigate("/sign-in", { replace: true })
  //     toast.error("Authorization Error", {
  //       description: "You need to sign in to create a blog post.",
  //     })
  //   }
  // }, [])

  selectedTopics.forEach(topic =>
    selectedTopicsBadges.push(
      <Badge
        variant={"outline"}
        key={topic.id}
        onClick={() => removeTopic(topic)}
        className="my-1"
      >
        <span className="font-normal">{topic.topic_name}</span>
        <Cross1Icon className="ms-1" />
      </Badge>,
    ),
  )

  useEffect(() => {
    async function getTopics() {
      try {
        // const topics = await axios.get("api/v1/topic/list")
        setTopics(mockTopics)
      } catch (err) {
        console.error(err)
      }
    }

    getTopics()
  }, [])

  function selectTopic(topic: Topic) {
    if (selectedTopics.size <= topicLimit - 1) {
      setSelectedTopics(prev => new Set(prev.add(topic)))
    } else {
      toast.warning("Too many topics selected", {
        description: `You can associate your creation with a maximum of ${topicLimit} topics`,
      })
    }
  }

  function removeTopic(topic: Topic) {
    setSelectedTopics(prev => {
      if (prev.has(topic)) {
        prev.delete(topic)
      }
      return new Set(prev)
    })
  }

  async function submit() {
    if (!title) {
      toast.warning("Title is required", {
        description: "Please provide a title for your blog post.",
      })
      setIsDialogOpen(false)
      return
    }

    if (editorData.blocks.length === 0) {
      toast.warning("Content is required", {
        description: "Please write something in the editor.",
      })
      setIsDialogOpen(false)
      return
    }

    const topicsList: { topic_name: string }[] = []

    selectedTopics.forEach(topic =>
      topicsList.push({
        topic_name: topic.topic_name,
      }),
    )

    const blogCreationData = {
      title,
      author_type: "user",
      author: user?.username,
      content: editorData,
      topics: topicsList,
    }

    try {
      setIsSubmitting(true)
      const response = await axios.post(
        "api/v1/blog/create",
        blogCreationData,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("access") ?? ""}`,
          },
        },
      )
      console.log(response)
      if (response.status === 201) {
        navigate("/profile")
        toast.success("Successfully created the blog post!")
      }
    } catch (err) {
      console.log(err)
      toast.error("Unable to create the blog post!", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div>
        {/**Replace this with custom navbar for the read page */}
        <NavBar />
        <div className="grid grid-cols-12">
          <div className="p-4 col-span-8">
            <textarea
              name="title"
              placeholder="Title"
              className="text-4xl font-bold p-4 mx-2 w-full h-[70px]"
              maxLength={100}
              ref={titleRef}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Editor
              title={title}
              setTitle={(title: string) => setTitle(title)}
              editorData={editorData}
              setEditorData={(data: OutputData) => setEditorData(data)}
            />
          </div>
          <div className="p-4">
            <div className="flex gap-4">
              <DialogTrigger>
                <Button>Save</Button>
              </DialogTrigger>
              <Button variant={"destructive"}>Discard</Button>
            </div>
          </div>
        </div>
      </div>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Save Blog</DialogTitle>
          <DialogDescription>
            Store and share your creation with others in the platform
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featured-image" className="text-right">
              Thumbnail Image
            </Label>
            <Input id="featured-image" type="file" className="col-span-3" />
          </div>
          <div>
            <h4 className="text-lx py-2 font-medium">Topics</h4>
            <div className="flex gap-2 py-2 flex-wrap">
              {selectedTopicsBadges}
            </div>
            <Command className="h-[150px] overflow-hidden">
              <CommandInput placeholder="Search for a topic to associate with your work" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {/**Poised to include suggestions here */}
                <CommandSeparator />
                <CommandGroup>
                  {topics.map(topic => (
                    <CommandItem
                      key={topic.id}
                      onSelect={() => selectTopic(topic)}
                      className={selectedTopics.has(topic) ? "font-bold" : ""}
                    >
                      {topic.topic_name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={submit}
            form="write-blog-form"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Loader2Icon className="w-4 h-4 me-2 animate-spin" />
            )}
            <span>Confirm</span>
          </Button>
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
