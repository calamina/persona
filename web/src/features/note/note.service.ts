import { api } from '../../utils/api-client'

export const getNote = async () => {
  const res = await api.note.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch note')
  }

  return await res.json()
}

export const saveNote = async (content: string) => {
  const res = await api.note.$put({
    json: { content },
  })

  if (!res.ok) {
    throw new Error('Failed to update note')
  }

  return await res.json()
}
