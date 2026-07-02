import { api } from '../../utils/api-client'

export async function getTodos() {
  const res = await api.todos.$get()
  return await res.json()
}

export async function addTodo(title: string) {
  const res = await api.todos.$post({
    json: { title },
  })
  return await res.json()
}

export async function deleteTodo(id: number) {
  const res = await api.todos[':id'].$delete({
    param: { id: id.toString() },
  })
  return await res.json()
}

export async function updateTodo(id: number) {
  const res = await api.todos[':id'].$put({
    param: { id: id.toString() },
  })
  return await res.json()
}
