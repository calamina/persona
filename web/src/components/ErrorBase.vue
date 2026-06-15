<template>
  <p data-form-error class="error-msg"></p>
</template>

<style scoped>
p[data-form-error].error-msg {
  color: var(--color-highlight);
  margin-top: 0.3rem;
  text-align: center;

  &:empty {
    display: none;
  }
}
</style>
