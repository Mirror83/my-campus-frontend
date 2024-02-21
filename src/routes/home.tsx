import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export function Home() {
  return (
    <>
      <div className={"text-5xl m-10"}>Home</div>
      <Drawer>
        <DrawerTrigger>
          <Button
            onClick={() => {
              console.log("Hi")
            }}
            className={"mx-10"}
          >
            Click me!
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Welcome</DrawerTitle>
            <DrawerDescription>
              This is the beginning of a wonderful journey. How excited are you?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Very excited</Button>
            <DrawerClose>
              <Button variant="outline">Excited</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
