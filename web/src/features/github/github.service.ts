import z from 'zod'

const RepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  git_url: z.string(),
  ssh_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  html_url: z.string(),
})
export type Repository = z.infer<typeof RepositorySchema>

const PublicEventSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    repo: z.object({
      id: z.number(),
      name: z.string(),
      url: z.string(),
    }),
    created_at: z.string(),
  })
  .transform((event) => ({
    ...event,
    displayName: EVENT_TYPE_MAP[event.type] ?? event.type.replace(/Event$/, ''),
  }))
export type PublicEvent = z.infer<typeof PublicEventSchema>

export const EVENT_TYPE_MAP: Record<string, string> = {
  CommitCommentEvent: 'Commit Comment',
  CreateEvent: 'Branch/Tag Created',
  DeleteEvent: 'Branch/Tag Deleted',
  ForkEvent: 'Fork',
  GollumEvent: 'Wiki Updated',
  IssueCommentEvent: 'Issue Comment',
  IssuesEvent: 'Issue',
  MemberEvent: 'Collaborator Change',
  PublicEvent: 'Repository Made Public',
  PullRequestEvent: 'Pull Request',
  PullRequestReviewEvent: 'PR Review',
  PullRequestReviewCommentEvent: 'PR Review Comment',
  PushEvent: 'Push',
  ReleaseEvent: 'Release',
  SponsorshipEvent: 'Sponsorship',
  WatchEvent: 'Star',
}

export const getRepos = async (): Promise<Repository[]> => {
  const username = localStorage.getItem('github-username')
  if (!username) return []

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=100`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10',
          'User-Agent': 'Persona',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawJson = await response.json()
    return z.array(RepositorySchema).parse(rawJson)
  } catch {
    return []
  }
}

export const getPublicEvents = async (): Promise<PublicEvent[]> => {
  const username = localStorage.getItem('github-username')
  if (!username) return []

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=20`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2026-03-10',
          'User-Agent': 'Persona',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const rawJson = await response.json()
    return z.array(PublicEventSchema).parse(rawJson)
  } catch {
    return []
  }
}
