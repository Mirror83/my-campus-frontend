import { Checkbox } from "@/components/ui/checkbox"

interface ShowPasswordProps {
  showPassword: boolean
  togglePasswordVisibility: (checked: boolean) => void
}
export function ShowPassword({
  showPassword,
  togglePasswordVisibility,
}: ShowPasswordProps) {
  return (
    <div className={"flex items-center gap-2 my-2"}>
      <Checkbox
        checked={showPassword}
        onCheckedChange={togglePasswordVisibility}
      />
      <p>Show password</p>
    </div>
  )
}
