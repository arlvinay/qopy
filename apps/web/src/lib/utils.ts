import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateFileName(name: string, maxLength: number = 20) {
  if (name.length <= maxLength) return name

  const extensionIndex = name.lastIndexOf('.')
  if (extensionIndex === -1) {
    return name.slice(0, maxLength) + '...'
  }

  const extension = name.slice(extensionIndex)
  const nameWithoutExt = name.slice(0, extensionIndex)

  // If extension itself is too long, just truncate the whole thing
  if (extension.length >= maxLength - 3) {
    return name.slice(0, maxLength) + '...'
  }

  const charsToShow = maxLength - extension.length - 3 // 3 for '...'
  return nameWithoutExt.slice(0, charsToShow) + '...' + extension
}
