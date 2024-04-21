import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractInitials(name: string): string {
  // Split name by spaces
  const nameArray = name.split(" ", 2)

  if (nameArray.length === 1) return name[0].toUpperCase()

  else return nameArray[0][0].concat(nameArray[1][0]).toUpperCase();

}
