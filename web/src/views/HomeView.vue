<!-- <router-link :to="{ path: '/auth/login', query: { type: 'login' } }">login</router-link> -->
<template>
  <p>
    <router-link to="/auth/login">login</router-link>
    or
    <router-link to="/auth/register">register</router-link>
    to access your
    <router-link to="/dashboard">dashboard</router-link>
    !
  </p>
</template>
