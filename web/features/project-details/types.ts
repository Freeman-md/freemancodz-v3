export type ProjectDetailsAction = {
  label: string
  href: string
}

export type ProjectParameter = {
  label: string
  value: string
}

export type ProjectMetric = {
  label: string
  value: string
  description: string
}

export type ProjectNarrativeSection = {
  title: string
  paragraphs: string[]
}
