<script setup lang="ts">
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import FieldAction from '../../components/FieldAction.vue'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { useTodoStore } from './todo.store.ts'
import { storeToRefs } from 'pinia'
import { addTodo, deleteTodo, updateTodo } from './todo.service.ts'
import { ref } from 'vue'

const store = useTodoStore()
const { todos } = storeToRefs(store)
const loadingCreate = ref(false)
const loadingDone = ref(false)
const loadingDelete = ref(false)
const newTodo = ref('')

await store.loadTodos()

const updateList = () => {
  store.clearTodoCache()
  store.loadTodos(true)
}

const create = async () => {
  if (!newTodo.value.length) return
  loadingCreate.value = true
  const { data } = await addTodo(newTodo.value)
  if (data) {
    updateList()
    newTodo.value = ''
  }
  loadingCreate.value = false
}

const remove = async (id: number) => {
  loadingDelete.value = true
  const { data } = await deleteTodo(id)
  if (data) updateList()
  loadingDelete.value = false
}

const toggleDone = async (id: number) => {
  loadingDone.value = true
  const { data } = await updateTodo(id)
  if (data) updateList()
  loadingDone.value = false
}
</script>

<template>
  <LayoutWindow title="Todo" :fit="true">
    <FieldAction
      v-model="newTodo"
      :action="create"
      :loading="loadingCreate"
      icon="favoriteAdd"
      label="Add"
      placeholder="add todo ..."
      class="header"
    />
    <div class="list" v-if="todos.length">
      <div class="todo" v-for="todo in todos" tabindex="0">
        <ButtonLoading
          class="test"
          @click="toggleDone(todo.id)"
          :loading="false"
          :icon="todo.done ? 'check' : 'checkNot'"
          :label="todo.title"
          :class="{ done: todo.done }"
        />
        <ButtonLoading
          class="deleteButton"
          @click="remove(todo.id)"
          :loading="false"
          icon="favoriteDelete"
        />
      </div>
    </div>
  </LayoutWindow>
</template>

<style scoped>
.header:only-child {
  border: none;
}

.list {
  display: flex;
  flex-flow: column;
  gap: 0.25rem;
  height: fit-content;
}

.todo {
  width: 100%;
  padding: var(--spacing-small);
  display: flex;

  &:hover,
  &:focus-visible {
    background-color: var(--element-focus);
    outline: none;
    .deleteButton {
      display: flex;
    }
  }
}

.deleteButton {
  display: none;
}

.test,
.deleteButton {
  border-color: transparent;
  background-color: transparent;

  &:focus-visible {
    border-color: var(--border-color);
  }
}

.test {
  display: flex;
  gap: 0.45rem;
  align-items: center;
  width: 100%;
  justify-content: start;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
}

.done {
  opacity: 0.4;
  text-decoration: line-through;
}
</style>
