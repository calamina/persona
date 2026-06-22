import { api, networkError } from '../../utils/api-client'

export async function getTodos() {
  try {
    const res = await api.todos.$get()
    return await res.json()
  } catch {
    return networkError
  }
}

export async function addTodo(title: string) {
  try {
    const res = await api.todos.$post({
      json: { title },
    })
    return await res.json()
  } catch {
    return networkError
  }
}

export async function deleteTodo(id: number) {
  try {
    const res = await api.todos[':id'].$delete({
      param: { id: id.toString() },
    })
    return await res.json()
  } catch {
    return networkError
  }
}

export async function updateTodo(id: number) {
  try {
    const res = await api.todos[':id'].$put({
      param: { id: id.toString() },
    })
    return await res.json()
  } catch {
    return networkError
  }
}
