<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import FieldAction from '../../components/FieldAction.vue'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { addTodo, deleteTodo, getTodos, updateTodo } from './todo.service.ts'
import { ref } from 'vue'
import LayoutList from '../../layouts/LayoutList.vue'
import LayoutItem from '../../layouts/LayoutItem.vue'

const queryClient = useQueryClient()
const newTodo = ref('')

const { isLoading: _todosLoading, data: todos } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
})

const { mutate: create, isPending: createLoading } = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    newTodo.value = ''
  },
})

const { mutate: remove, isPending: removeLoading } = useMutation({
  mutationFn: deleteTodo,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const { mutate: update, isPending: updateLoading } = useMutation({
  mutationFn: updateTodo,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})
</script>

<template>
  <LayoutWindow title="Todo" icon="todolist" fit>
    <FieldAction
      v-model="newTodo"
      :action="create"
      :loading="createLoading"
      icon="favoriteAdd"
      label="Add"
      placeholder="add todo ..."
      class="header"
    />
    <LayoutList v-if="todos?.length" fit>
      <LayoutItem type="div" inline v-for="todo in todos" :key="todo.id" tabindex="0" class="todo">
        <ButtonLoading
          @click.stop="update(todo.id)"
          class="updateButton"
          :loading="updateLoading"
          :icon="todo.done ? 'check' : 'checkNot'"
          :label="todo.title"
          :class="{ done: todo.done }"
        />
        <ButtonLoading
          @click.stop="remove(todo.id)"
          class="deleteButton"
          :loading="removeLoading"
          icon="favoriteDelete"
        />
      </LayoutItem>
    </LayoutList>
  </LayoutWindow>
</template>

<style scoped>
.header:only-child {
  border: none;
}

.todo {
  &:hover,
  &:focus-within {
    .deleteButton {
      display: flex;
    }
  }
}

.deleteButton {
  display: none;
  width: fit-content;
}

.updateButton,
.deleteButton {
  padding: 0;
  height: fit-content;
  border: none;
  background-color: transparent;

  &:focus-visible {
    border-color: var(--border-color);
  }
}

.updateButton {
  flex: 1;
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
