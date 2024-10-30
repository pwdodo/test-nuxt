<template>
  <div class="min-h-screen bg-gray-100">
    <header class="flex items-center justify-between p-4 bg-blue-600 text-white">
      <h1 class="text-2xl font-bold">Test Nuxt</h1>
      <nav class="space-x-4">
        <NuxtLink to="/" class="hover:underline">Home page</NuxtLink>
        <NuxtLink to="/admin" class="hover:underline">Admin page</NuxtLink>
        <NuxtLink v-if="isLoggedIn" @click="logout" style="cursor:pointer;" class="hover:underline">Logout</NuxtLink>
        <NuxtLink v-else to="/login" class="hover:underline">Login</NuxtLink>
      </nav>
    </header>
    <main class="p-6">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '~/composables/useAuth'
const { isLoggedIn, logout } = useAuth()
useHead({
  title: 'Test NUXT ',
  meta: [
    { name: 'description', content: 'Yeay.' },
  ],
})
</script>

<style scoped>
</style>
