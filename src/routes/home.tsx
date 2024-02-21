import { Button } from "@/components/button"

export function Home() {
  function onButtonClick() {
    console.log("Button clicked again.")
  }

  return <Button onClick={onButtonClick}>Home</Button>
}
