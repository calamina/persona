import { api } from '../../utils/api-client'

export async function getTodos() {
  const res = await api.todos.$get()

  if (!res.ok) {
    throw new Error('Failed to fetch todos')
  }

  return await res.json()
}

export async function addTodo(title: string) {
  const res = await api.todos.$post({
    json: { title },
  })

  if (!res.ok) {
    throw new Error('Failed to create todo')
  }

  return await res.json()
}

export async function deleteTodo(id: number) {
  const res = await api.todos[':id'].$delete({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error('Failed to delete todo')
  }

  return await res.json()
}

export async function updateTodo(id: number) {
  const res = await api.todos[':id'].$put({
    param: { id: id.toString() },
  })

  if (!res.ok) {
    throw new Error('Failed to update todo status')
  }

  return await res.json()
}
