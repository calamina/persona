import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getTodos } from './todo.service'
import type { TodoDisplay } from './todo.model'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoDisplay[]>([])
  const loading = ref(false)

  const cache = ref<{ data: TodoDisplay[]; timestamp: number } | null>(null)
  const CACHE_TTL = 5 * 60 * 1000

  async function loadTodos(forceRefresh = false) {
    const now = Date.now()
    if (!forceRefresh && cache.value && now - cache.value.timestamp < CACHE_TTL) {
      todos.value = cache.value.data
      return
    }

    loading.value = true
    const { data } = await getTodos()

    if (data) {
      todos.value = data
      cache.value = { data, timestamp: now }
    }
    loading.value = false
  }

  function clearTodoCache() {
    cache.value = null
  }

  return {
    todos,
    loading,
    loadTodos,
    clearTodoCache,
  }
})
