export type ArchiveFilterGroup = {
  label: string
  options: string[]
}

export type ArchiveProjectCard = {
  id: string
  year: string
  title: string
  description: string
  type: string
  domain: string
  level: string
  tags: string[]
  variant: "half" | "full"
}
