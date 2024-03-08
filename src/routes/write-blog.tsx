//index.tsx
import type { OutputData } from "@editorjs/editorjs"
import { useEffect, useState } from "react"
import { NavBar } from "@/components/home/NavBar"
import { blogPlaceholder } from "@/mock-content/mock-text"
import { Button } from "@/components/ui/button"
import EditorBlock from "@/components/editor/editor"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
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
import { Topic } from "@/interfaces/topics"
import axios from "@/lib/axios"
import { Badge } from "@/components/ui/badge"
import { Cross1Icon } from "@radix-ui/react-icons"
import { toast } from "sonner"
import { useAppSelector } from "@/app/hook"
import { Loader2Icon } from "lucide-react"
import { useNavigate } from "react-router"

export const WriteBlog = () => {
  const { user, isLoading } = useAppSelector(state => state.auth)
  // Stores the data used by EditorJS
  const [data, setData] = useState<OutputData>(blogPlaceholder)
  const [title, setTitle] = useState("")
  const [topics, setTopics] = useState<Topic[]>([])
  const [selectedTopics, setSelectedTopics] = useState<Set<Topic>>(new Set())
  const selectedTopicsBagdes: React.ReactNode[] = []
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  // const topicLimit = 4

  selectedTopics.forEach(topic =>
    selectedTopicsBagdes.push(
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
    getTopics()
  }, [])

  async function getTopics() {
    try {
      const topics = await axios.get("api/v1/topic/list")
      setTopics(topics.data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    trackTitle()
  }, [data])

  function trackTitle() {
    const firstHeaading = data.blocks.find(block => block.type === "header")
    if (firstHeaading === undefined) {
      setTitle("")
    } else {
      setTitle(firstHeaading.data.text)
    }
  }

  function selectTopic(topic: Topic) {
    setSelectedTopics(prev => new Set(prev.add(topic)))
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
    if (title === "") {
      toast("You need a to place a heading in your writing.")
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
      // Obtain user object
      author: user?.username,
      content: data,
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
      if (response.status == 201) {
        toast("Successfully created a blog post!", {
          action: {
            label: "View in profile",
            onClick: () => navigate("/profile"),
          },
        })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-100vh w-100vw items-center justify-end">
        Loading...
      </div>
    )
  }

  return (
    <Dialog>
      <div>
        {/**Replace this with custom navbar for the read page */}
        <NavBar />
        <div className="grid grid-cols-12">
          <div className="p-4 col-span-8">
            <EditorBlock
              data={data}
              onChange={setData}
              holder="editorjs-container"
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
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="name"
              disabled={true}
              value={title}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="featured-image" className="text-right">
              Featured Image
            </Label>
            <Input id="featured-image" type="file" className="col-span-3" />
          </div>
          <div>
            <h4 className="text-lx py-2 font-medium">Topics</h4>
            <div className="flex gap-2 py-2">{selectedTopicsBagdes}</div>
            <Command>
              <CommandInput placeholder="Search for a topic to associate with your work" />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {/**Poised to include suggestions here */}
                <CommandSeparator />
                <CommandGroup heading="Topics">
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
          <Button onClick={submit} disabled={isSubmitting}>
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
