import { api } from '../../utils/api-client'
import type { Link } from './link.model'

export const getLinks = async () => {
  const res = await api.links.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch links')
  }

  return await res.json()
}

export const getLinkName = async (url: string) => {
  const res = await api.links.getLinkName.$get({
    query: { url },
  })

  if (!res.ok) {
    return 'name'
  }

  return await res.json()
}

export const addLink = async (link: Link) => {
  const res = await api.links.$post({
    json: { ...link },
  })

  if (!res.ok) {
    throw new Error('Failed to add link')
  }

  return await res.json()
}

export const deleteLink = async (id: number) => {
  const res = await api.links[':id'].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error('Failed to remove link')
  }

  return await res.json()
}
